import { Tool } from "@modelcontextprotocol/sdk/types.js";

export function appendString(queryParams: URLSearchParams, key: string, value: any, definition: Tool): void {
  if (typeof value === 'string' && value.trim()) {
    queryParams.append(key, value.trim());
  } else if (isRequiredField(key, definition)) {
    throw new Error(`Parameter ${key} is required and must be a non-empty string.`);
  }
};
export function appendPositiveInteger(queryParams: URLSearchParams, key: string, value: any, definition: Tool): void {
  if (typeof value === 'number' && Number.isInteger(value)) {
    if (value >= 0) {
      queryParams.append(key, String(value));
    } else {
      throw new Error(`Parameter ${key} must be a positive integer.`);
    }
  } else if (isRequiredField(key, definition)) {
    throw new Error(`Parameter ${key} is required and must be a positive integer.`);
  }
};
export function getStrictlyPositiveIntegerParameter(key: string, value: any, definition: Tool): number | undefined {
  if (typeof value === 'number' && Number.isInteger(value)) {
    if (value > 0) {
      return value;
    } else {
      throw new Error(`Parameter ${key} must be a strictly positive integer.`);
    }
  } else if (isRequiredField(key, definition)) {
    throw new Error(`Parameter ${key} is required and must be a strictly positive integer.`);
  }
  return undefined;
}
export function appendStrictlyPositiveInteger(queryParams: URLSearchParams, key: string, value: any, definition: Tool): void {
  const param = getStrictlyPositiveIntegerParameter(key, value, definition);
  if (param !== undefined) {
    queryParams.append(key, String(param));
  }
};

export function appendStrictlyPositiveIntegerArray(queryParams: URLSearchParams, key: string, value: any, definition: Tool, maxSize?: number): void {
  if (Array.isArray(value)) {
    // Validate that all items in the array are strictly positive integers
    if (value.length > 0 && (maxSize === undefined || value.length <= maxSize) && value.every((item: any) => typeof item === 'number' && Number.isInteger(item) && item > 0)) {
      queryParams.append(key, value.join(','));
    } else {
      throw new Error(`Parameter ${key} must be a non-empty array ${maxSize !== undefined ? `of length up to ${maxSize} ` : ''}containing strictly positive integers.`);
    }
  } else if (isRequiredField(key, definition)) {
    throw new Error(`Parameter ${key} is required and must be a non-empty array ${maxSize !== undefined ? `of length up to ${maxSize} ` : ''}containing strictly positive integers.`);
  }
}

export function appendBoolean(queryParams: URLSearchParams, key: string, value: any, definition: Tool): void {
  if (typeof value === 'boolean' && value) {
    queryParams.append(key, 'Y');
  } else if (isRequiredField(key, definition)) {
    throw new Error(`Parameter ${key} is required and must be a boolean.`);
  }
}

/**
 * Checks if a field is required based on the tool's input schema.
 * @param key The key of the field to check.
 * @param definition The tool definition containing the input schema.
 * @returns True if the field is required, false otherwise.
 */
function isRequiredField(key: string, definition: Tool): boolean {
  return definition.inputSchema?.required?.includes(key) || false;
}

/**
 * Appends a days of week parameter to the query parameters.
 * @param queryParams The URLSearchParams object to append to.
 * @param key The key of the parameter.
 * @param value The value of the parameter from the client, expected to be an array of integers representing days of the week (1-7).
 * @param definition The tool definition containing the input schema.
 */
export function appendDaysOfWeek(queryParams: URLSearchParams, key: string, value: any, definition: Tool): void {
  if (Array.isArray(value)) {
    // Validate that all items in the array are valid days of week integers (1-7)
    if (value.length > 0 && value.length <= 7 && value.every((item: any) => typeof item === 'number' && Number.isInteger(item) && item >= 1 && item <= 7)) {
      const selectedDqys: number[] = value;
      let res = '';
      for (let i = 1; i <= 7; i++) {
        res += selectedDqys.includes(i) ? '1' : '0';
      }
      queryParams.append(key, res);
    } else {
      throw new Error(`Parameter ${key} must be a non-empty array of length up to 7 containing valid days of week integers (1-7).`);
    }
  } else if (isRequiredField(key, definition)) {
    throw new Error(`Parameter ${key} is required and must be a non-empty array of length up to 7 containing valid days of week integers (1-7).`);
  }
}

export function intToBase64String(value: number): string {
  return Buffer.from(String(value), "utf8").toString("base64");
}

export function base64ToInt(base64: string): number {
  return parseInt(Buffer.from(base64, "base64").toString("utf8"), 10);
}

// JSON filtering utilities
type JsonFilter = (fullKey: string, value: any) => boolean;

/**
 * Clones a JS value but only includes values accepted by the filter.
 * - Objects are traversed and rebuilt including only accepted keys.
 * - Arrays are traversed recursively (array notation is not included in keys).
 * - Primitives and null are returned as-is.
 */
function filterJsonValue(input: any, filter: JsonFilter, currentKey = ''): any {
  if (Array.isArray(input)) {
    return filterJsonArray(input, filter, currentKey);
  }

  if (typeof input === 'object') {
    const result: { [k: string]: any } = {};
    for (const [key, value] of Object.entries(input)) {
      const fullKey = currentKey ? `${currentKey}.${key}` : key;
      if (filter(fullKey, value)) {
        result[key] = filterJsonValue(value, filter, fullKey);
      }
    }
    return result;
  }

  // Primitive (string/number/boolean) or null - return as-is
  return input;
}

/**
 * Creates a clone of an array but only includes values accepted by the
 * filter, recursively. Array indices are NOT added to the key path.
 */
export function filterJsonArray(input: any[], filter: JsonFilter, currentKey = ''): any[] {
  return input.map((value) => filterJsonValue(value, filter, currentKey));
}
