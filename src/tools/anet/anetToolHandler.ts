import { TextContent } from "@modelcontextprotocol/sdk/types.js";
import * as crypto from 'crypto';
import axios, { AxiosResponse } from 'axios';

import { getAnetToolDefs } from "./anetToolList";
import { AnetTool } from "./anetTool";
import { getSettings } from "../../config/settings";
import { createErrorResponse, logError, ErrorCode, createSuccessResponse } from "../../utils/errors";
import { base64ToInt, filterJsonArray, intToBase64String } from "./utils/anetToolUtils";


export async function handleAnetTool(toolName: string, args: Record<string, any>): Promise<TextContent[]> {
  // Find the tool to use.
  const tool = getAnetToolDefs().find(t => t.definition.name === toolName);
  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }
  return handleTool(tool, args);
}

async function handleTool(tool: AnetTool, args: Record<string, any>): Promise<TextContent[]> {
  const settings = getSettings();
  const host = settings.activenet_host;
  const org = settings.activenet_org?.replace(/^\/+|\/+$/g, '') || '';
  const apiKey = settings.activenet_api_key;
  const sharedSecret = settings.activenet_shared_secret;
  const endPointRaw = typeof tool.endPoint === 'string' ? tool.endPoint : tool.endPoint(tool.definition, args);
  const endpoint = endPointRaw.replace(/^\/+/, '');

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const sigString = apiKey + sharedSecret + timestamp;
  console.log(`generate sig: apiKey: ${apiKey}, sharedSecret: ${sharedSecret}, timestamp: ${timestamp}`);

  const sig = crypto.createHash('sha256').update(sigString).digest('hex');

  const queryParams = new URLSearchParams({
    api_key: apiKey,
    sig,
  });
  try {
    tool.queryParamBuilder?.(queryParams, tool.definition, args);
  } catch (error: any) {
    return [createErrorResponse(ErrorCode.VALIDATION_ERROR, (error as Error).message || 'Invalid input parameters for tool ' + tool.definition.name)];
  }

  const protocol = settings.activenet_secure_protocol ? 'https' : 'http';
  const url = `${protocol}://${host}/${org}/${endpoint}?${queryParams.toString()}`;
  console.log(`URL: ${url}`);

  const headers: { [key: string]: string } = {
    'Accept': 'application/json',
  }
  if (tool.pageSize) {
    // Need to add the pagination header as string as headers must be string key-value pairs.
    headers.page_info = `{"total_records_per_page":${tool.pageSize},"page_number":${getPage(args.cursor)}}`;
  }

  try {
    const response = await axios.get(url, {
      timeout: settings.http_timeout * 1000,
      headers,
    });

    return [createSuccessResponse(createPayload(response, tool, args), true)];

  } catch (error: any) {
    logError(error as Error, tool.definition.name);

    if (axios.isAxiosError(error)) {
      return [createErrorResponse(
        ErrorCode.API_ERROR,
        `ActiveNet API error: ${error.response?.data?.message || error.message}`,
        {
          status: error.response?.status,
          url: url.replace(apiKey, 'REDACTED')
        }
      )];
    }

    return [createErrorResponse(
      ErrorCode.INTERNAL_ERROR,
      `Unexpected error while calling tool ${tool.definition.name}: ${(error as Error).message}`
    )];
  }
}

/**
 * Retrieve the current page number from the pagination cursor if there is one.
 * @param cursor Cursor to parse.
 * @returns PAge number starting from 1. If cursor is not provided or invalid, returns 1.
 */
function getPage(cursor: string): number {
  if (cursor) {
    try {
      return base64ToInt(cursor);
    } catch (error) {
      console.error(`Failed to decode pagination cursor: ${cursor}`, error);
    }
  }
  return 1;
}

/**
 * Create the payload to return to MCP clients.
 * @param response Response from OpenAPI.
 * @param tool Tool definition.
 * @param args Arguments provided by the client when calling the tool.
 * @returns Payload to return to MCP clients, including the items and pagination information if applicable.
 */
function createPayload(response: AxiosResponse, tool: AnetTool, args: Record<string, any>): any {
  // Find the output fields to use for filtering.
  let selectedFields: string[] | undefined = undefined; // Selected fields
  let fieldsToIncludeInResponse: string[] | undefined = undefined; // Selected fields + their parent fields
  if (tool.availableOutputFields) {
    const availableOutputFields = tool.availableOutputFields;
    selectedFields = (Array.isArray(args.output_fields) ? args.output_fields : tool.defaultOutputFields) || availableOutputFields;
    // Make sure all selected fields are valid.
    if (selectedFields?.some(f => !availableOutputFields.includes(f))) {
      throw new Error(`Invalid output_fields parameter. Available fields are: ${availableOutputFields.join(',')}`);
    }
    // Make sure to get all levels of the output objects.
    const finalFields = new Set<string>();
    selectedFields?.forEach(curString => {
      finalFields.add(curString);
      // Make sure parent fields are also included to avoid stopping at intermediate levels.
      while (curString.includes('.')) {
        curString = curString.substring(0, curString.lastIndexOf('.'));
        finalFields.add(curString);
      }
    });
    fieldsToIncludeInResponse = [...finalFields];
  }

  // Make sure to put the items at the end for better readability
  let items: any[] = response.data?.body || [];
  // Only keep the requested fields and remove null/undefined values.
  items = filterJsonArray(items, (key, value) => filterOpenApiResponse(key, value, fieldsToIncludeInResponse));

  const nbItems = Array.isArray(items) ? items.length : 0;
  const res: { [s: string]: any } = {};
  if (selectedFields) {
    // Include the fields in the response so that the caller can know the full list for next time.
    res.selectedFields = selectedFields.join(',');
    res.otherAvailableFields = tool.availableOutputFields?.filter((f) => !selectedFields.includes(f)).join(','); // no duplicates with selected
  }
  if (tool.pageSize && response.data.headers?.page_info) {
    const pageInfo = response.data.headers.page_info;
    res.totalItemCount = pageInfo.total_records;
    res.currentPageSize = nbItems;
    if (pageInfo.page_number < pageInfo.total_page) {
      res.nextCursor = intToBase64String((pageInfo.page_number || 0) + 1);
      res.paginationHint = `Call the tool again with cursor="${intToBase64String((pageInfo.page_number || 0) + 1)}" to get the next page`;
      res.hasMorePage = true;
    } else {
      res.hasMorePage = false;
    }
  } else {
    res.nbItems = nbItems;
  }
  res.items = items; // Put the items at last so the MCP client can parse the metadata first.

  return res;

}

/**
 * Filters the OpenAPI response based on the selected fields.
 * @param fullKey The full key path of the current value.
 * @param value The current value to check.
 * @param selectedFields The list of selected fields to include.
 * @returns True if the value should be included, false otherwise.
 */
function filterOpenApiResponse(fullKey: string, value: any, selectedFields: string[] | undefined): boolean {
  return value !== null && value !== undefined && (!selectedFields || selectedFields.includes(fullKey));
}
