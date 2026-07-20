import { describe, it, expect } from '@jest/globals';
import {
    appendString,
    appendPositiveInteger,
    getStrictlyPositiveIntegerParameter,
    appendStrictlyPositiveInteger,
    appendStrictlyPositiveIntegerArray,
    appendBoolean,
    appendDaysOfWeek,
    intToBase64String,
    base64ToInt,
    filterJsonArray,
} from '../src/tools/anet/utils/anetToolUtils.js';

describe('anetToolUtils', () => {
    const reqDef = { inputSchema: { required: ['requiredKey', 'boolKey'] } } as any;
    const optDef = {} as any;

    it('appendString appends trimmed strings and enforces required', () => {
        const params = new URLSearchParams();
        appendString(params, 'name', 2, optDef);
        expect(params.get('name')).toBeNull();

        appendString(params, 'name', '  Alice  ', optDef);
        expect(params.get('name')).toBe('Alice');

        const paramsReq = new URLSearchParams();
        expect(() => appendString(paramsReq, 'requiredKey', '   ', reqDef)).toThrow();
    });

    it('appendPositiveInteger appends integers and rejects negatives', () => {
        const params = new URLSearchParams();
        appendPositiveInteger(params, 'count', 'foo', optDef);
        expect(params.get('count')).toBeNull();

        appendPositiveInteger(params, 'count', 5, optDef);
        expect(params.get('count')).toBe('5');

        const paramsNeg = new URLSearchParams();
        expect(() => appendPositiveInteger(paramsNeg, 'count', -1, optDef)).toThrow();
    });

    it('getStrictlyPositiveIntegerParameter validates and respects requiredness', () => {
        expect(getStrictlyPositiveIntegerParameter('k', 3, optDef)).toBe(3);
        expect(() => getStrictlyPositiveIntegerParameter('k', 0, optDef)).toThrow();
        expect(() => getStrictlyPositiveIntegerParameter('requiredKey', undefined, reqDef)).toThrow();
        expect(getStrictlyPositiveIntegerParameter('k', undefined, optDef)).toBeUndefined();
    });

    it('appendStrictlyPositiveInteger appends when valid', () => {
        const params = new URLSearchParams();
        appendStrictlyPositiveInteger(params, 'id', null, optDef);
        expect(params.get('id')).toBeNull();

        appendStrictlyPositiveInteger(params, 'id', 7, optDef);
        expect(params.get('id')).toBe('7');

        expect(() => appendStrictlyPositiveInteger(params, 'requiredKey', null, reqDef)).toThrow();
    });

    it('appendStrictlyPositiveIntegerArray accepts arrays of strictly positive ints', () => {
        const params = new URLSearchParams();
        appendStrictlyPositiveIntegerArray(params, 'ids', [1, 2, 3], optDef);
        expect(params.get('ids')).toBe('1,2,3');

        const paramsBad = new URLSearchParams();
        expect(() => appendStrictlyPositiveIntegerArray(paramsBad, 'ids', [0, 2], optDef)).toThrow();
    });

    it('appendBoolean appends Y for true and enforces required boolean', () => {
        const params = new URLSearchParams();
        appendBoolean(params, 'flag', false, optDef);
        expect(params.get('flag')).toBeNull();

        appendBoolean(params, 'flag', true, optDef);
        expect(params.get('flag')).toBe('Y');

        const paramsReq = new URLSearchParams();
        expect(() => appendBoolean(paramsReq, 'boolKey', false, reqDef)).toThrow();
    });

    it('appendDaysOfWeek converts array to 7-char bit string', () => {
        const params = new URLSearchParams();
        appendDaysOfWeek(params, 'dow', [1, 3, 5], optDef);
        expect(params.get('dow')).toBe('1010100');

        const paramsBad = new URLSearchParams();
        expect(() => appendDaysOfWeek(paramsBad, 'dow', [0], optDef)).toThrow();
    });

    it('intToBase64String and base64ToInt roundtrip', () => {
        const n = 12345;
        const b = intToBase64String(n);
        const back = base64ToInt(b);
        expect(back).toBe(n);
    });

    it('filterJsonArray filters objects inside arrays according to key path', () => {
        const input = [
            { keep: 1, drop: 2 },
            { keep: { nested: 3, drop: 4 }, other: 'x' },
        ];

        const filtered = filterJsonArray(input as any[], (fullKey, _value) => fullKey.includes('keep') && !fullKey.includes('drop'));

        // First object should only have `keep`
        expect(filtered).toEqual([
            { keep: 1 },
            { keep: { nested: 3 } },
        ]);
    });
});
