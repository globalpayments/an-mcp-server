import { describe, it, expect } from '@jest/globals';
import { getAnetToolDefs } from '../src/tools/anet/anetToolList.js';

describe('getAnetToolDefs output fields', () => {
  it('defaultOutputFields are included in availableOutputFields for every AnetTool', () => {
    const tools = getAnetToolDefs();
    tools.forEach((tool) => {
      const defaults = tool.defaultOutputFields;
      const available = tool.availableOutputFields;
      if (defaults && defaults.length > 0) {
        expect(available).toBeDefined();
        defaults.forEach((field) => {
          expect(available).toContain(field);
        });
      }
    });
  });
});
