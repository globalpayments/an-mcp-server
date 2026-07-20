import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Defines the structure for ActiveNet tools, including their definition and handler function.
 */
export interface AnetTool {
  /**
   * Definition of the tool exposed to MCP clients.
   */
  definition: Tool;
  /**
   * Name of the endpoint in OpenAPI (ex /api/v1/activities) or a function to generate it.
   */
  endPoint: string | ((definition: Tool, args: Record<string, any>) => string);
  /**
   * Function to build query parameters for the tool's endpoint.
   * @param queryParams - The URLSearchParams object to which the function will append necessary query parameters.
   * @param definition - The tool definition, which can be used to understand the expected input schema.
   * @param args - The input arguments for the tool, structured as a key-value object.
   */
  queryParamBuilder?: (queryParams: URLSearchParams, definition: Tool, args: Record<string, any>) => void;

  /**
   * For end-points supporting pagination, the page size to use when doing request to backend.
   * If not set or set to 0, the end-point is expected not to support pagination.
   */
  pageSize?: number;

  /**
   * Name of the OpenAPI end-point used by this Tool.
   * The value is not currently used by the sdk directly, but can be useful to AI assistants to be able to read to the documentation of the end-point and understand the expected parameters and response.
   * The documentation can be found at https://help.aw.active.com/ActiveNet/standard/en_US/api_specification.htm
   */
  endPointName: string;

  /**
   * List of all available output fields that the tool can return.
   * If provided, an outputField parameter will be added to the tool's input schema, allowing clients to specify which fields they want to receive in the response. If not provided, all fields returned by the end-point will be included in the response.
   */
  availableOutputFields?: string[];
  
  /**
   * List of default output fields that the tool will return if no specific fields are requested by the client.
   */
  defaultOutputFields?: string[];
}

