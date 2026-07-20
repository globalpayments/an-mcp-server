/**
 * Tests for PRODUCT-based tool registration behavior.
 */

import { describe, it, expect } from '@jest/globals';
import { getRegisteredTools } from '../src/core/server.js';
import { getAnetTools } from '../src/tools/anet/anetToolList.js';

describe('getRegisteredTools', () => {
  it('should register ActiveNet-only tool list when PRODUCT=anet', () => {
    const tools = getRegisteredTools('anet');
    const toolNames = tools.map((tool) => tool.name);

    expect(toolNames).toEqual(getAnetTools().map(tool => tool.name));
  });

  it('should reserve a dedicated tool list for PRODUCT=aw', () => {
    const tools = getRegisteredTools('aw');
    expect(tools).toEqual([]);
  });

  it('should reserve a dedicated tool list for PRODUCT=pos', () => {
    const tools = getRegisteredTools('pos');
    expect(tools).toEqual([]);
  });

  it('should fall back to ActiveNet tool list for unknown PRODUCT', () => {
    const tools = getRegisteredTools('unknown');
    const toolNames = tools.map((tool) => tool.name);
    expect(toolNames).toEqual(getAnetTools().map(tool => tool.name));
  });
});
