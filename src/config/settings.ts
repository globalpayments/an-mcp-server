/**
 * Configuration management for the MCP Server.
 */

import { z } from 'zod';
import {
  DEFAULT_HTTP_TIMEOUT,
  DEFAULT_LOG_LEVEL,
  DEFAULT_ACTIVENET_HOST,
  DEFAULT_ACTIVENET_ORG,
} from '../utils/constants.js';

const SettingsSchema = z.object({
  product: z.string().default('anet'),
  
  activenet_host: z.string().default(DEFAULT_ACTIVENET_HOST),
  activenet_org: z.string().default(DEFAULT_ACTIVENET_ORG),
  activenet_api_key: z.string().default("1"),
  activenet_shared_secret: z.string().default(""),
  activenet_secure_protocol: z.boolean().default(true),

  http_timeout: z.number().default(DEFAULT_HTTP_TIMEOUT),
  
  log_level: z.string().default(DEFAULT_LOG_LEVEL),
  debug_api_calls: z.boolean().default(false),
}).transform((data) => {
  data.product = data.product.trim().toLowerCase() || 'anet';
  return data;
});

export type Settings = z.infer<typeof SettingsSchema>;

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) {
    return defaultValue;
  }

  return value.trim().toLowerCase() === 'true';
}

function resolveProduct(): string {
  const product = process.env.PRODUCT?.trim().toLowerCase();
  if (product) {
    return product;
  }

  // Backward compatibility: map old ACTIVE switch to PRODUCT.
  if (parseBoolean(process.env.ACTIVE ?? process.env.active, false)) {
    return 'anet';
  }
  return 'anet';
}

function createSettings(): Settings {
  const rawSettings = {
    product: resolveProduct(),
    activenet_host: process.env.ACTIVENET_HOST || DEFAULT_ACTIVENET_HOST,
    activenet_org: process.env.ACTIVENET_ORG || DEFAULT_ACTIVENET_ORG,
    activenet_api_key: process.env.ACTIVENET_API_KEY || '1',
    activenet_shared_secret: process.env.ACTIVENET_SHARED_SECRET || '',
    activenet_secure_protocol: parseBoolean(process.env.ACTIVENET_SECURE_PROTOCOL, true),
    http_timeout: parseFloat(process.env.HTTP_TIMEOUT || String(DEFAULT_HTTP_TIMEOUT)),
    log_level: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
    debug_api_calls: parseBoolean(process.env.DEBUG_API_CALLS, false),
  };
  
  return SettingsSchema.parse(rawSettings);
}

let _settings: Settings | null = null;

export function getSettings(): Settings {
  if (_settings === null) {
    _settings = createSettings();
  }
  return _settings;
}

export function resetSettings(): void {
  _settings = null;
}