import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { ACTIVITY_TOOLS } from "./activities/activityTools";
import { AnetTool } from "./anetTool";
import { CUSTOMER_TOOLS } from "./customers/customerTools";
import { FACILITY_TOOLS } from "./facilities/facilityTools";
import { FINANCIAL_TOOLS } from "./financial/financialTools";
import { FLEXREG_TOOLS } from "./flexreg/flexregTools";
import { GENERAL_TOOLS } from "./general/generalTools";
import { MEMBERSHIP_TOOLS } from "./membership/membershipTools";

/**
 * The full list of known tools for ActiveNet.
 */
const ANET_TOOLS_DEFS: AnetTool[] = [
  ...GENERAL_TOOLS, ...ACTIVITY_TOOLS, ...CUSTOMER_TOOLS, ...FACILITY_TOOLS, ...FINANCIAL_TOOLS, ...FLEXREG_TOOLS, ...MEMBERSHIP_TOOLS
];

/**
 * @returns Full list of tools with name prefixed with mcp_activenet_
 */
export function getAnetToolDefs(): AnetTool[] {
  return ANET_TOOLS_DEFS.map(t => {
    const definition: Tool = t.definition;
    // Add a prefix to all tool names to avoid conflicts with other products' tools.
    let newDefinition = {
      ...definition,
      name: `mcp_active-mcp-se_${definition.name}`
    };
    // Add cursor parameter to all tools that support pagination.
    if (t.pageSize) {
      newDefinition = addProperty(newDefinition, {
        cursor: {
          type: 'string',
          description: 'Optional cursor used to retrieve pages after the first one. If ommited first page is returned.'
        }
      });
    }
    if (t.availableOutputFields) {
      // Add the output_fields parameter to the tool.
      newDefinition = addProperty(newDefinition, {
        output_fields: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Optional list of fields to include in the response. If ommited a default list is used. The list of available fields is included in the tool response.'
        }
      });
    }
    // By default don't allow more properties than the listed ones.
    newDefinition.inputSchema = {
      additionalProperties: false,
      ...newDefinition.inputSchema
    }
    return { ...t, definition: newDefinition };
  });
}

/**
 * @returns The list of available tools for ActiveNet.
 */
export function getAnetTools(): Tool[] {
  return getAnetToolDefs().map(t => t.definition);
}

/**
 * Adds a property to a tool's input schema.
 * @param tool The tool to which the property will be added.
 * @param property The property to add to the tool's input schema.
 * @returns The updated tool with the new property added to its input schema.
 */
function addProperty(tool: Tool, property: { [s: string]: object }): Tool {
  return {
    ...tool,
    inputSchema: {
      ...tool.inputSchema,
      properties: {
        ...property,
        ...tool.inputSchema.properties
      }
    }
  };
}
