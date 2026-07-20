/**
 * MCP server for ActiveNet integration.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

import { getSettings } from '../config/settings.js';
import { getAnetTools } from '../tools/anet/anetToolList.js';
import { handleAnetTool } from '../tools/anet/anetToolHandler.js';

const ANET_TOOLS: Tool[] = getAnetTools();
const AW_TOOLS: Tool[] = [];
const POS_TOOLS: Tool[] = [];

export function getRegisteredTools(product: string): Tool[] {
  switch (product.trim().toLowerCase()) {
    case 'anet':
      return ANET_TOOLS;
    case 'aw':
      return AW_TOOLS;
    case 'pos':
      return POS_TOOLS;
    default:
      return ANET_TOOLS;
  }
}

/**
 * MCP server implementation for ActiveNet integration.
 */
export class ActiveNetServer {
  private server: Server;
  private product: string;
  private enabledToolNames: Set<string>;

  constructor() {
    this.server = new Server(
      {
        name: 'activenet',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.product = getSettings().product;
    this.enabledToolNames = new Set(getRegisteredTools(this.product).map((tool) => tool.name));
    
    this.setupHandlers();
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, () => {
      return {
        tools: getRegisteredTools(this.product),
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (!this.enabledToolNames.has(request.params.name)) {
        throw new Error(`Tool is not enabled for PRODUCT=${this.product}: ${request.params.name}`);
      }

      // Go for ANET tools
      const result = await handleAnetTool(request.params.name, request.params.arguments || {});
      return {
        content: result,
      };
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('ActiveNet MCP server running on stdio');
  }

  cleanup(): void {
    // No runtime resources to release right now.
  }
}