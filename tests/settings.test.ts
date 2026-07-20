/**
 * Tests for settings configuration
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { getSettings, resetSettings } from '../src/config/settings.js';
import {
  DEFAULT_ACTIVENET_HOST,
  DEFAULT_ACTIVENET_ORG,
  DEFAULT_HTTP_TIMEOUT,
  DEFAULT_LOG_LEVEL,
} from '../src/utils/constants.js';

describe('Settings', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment before each test
    process.env = { ...originalEnv };
    resetSettings();
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
    resetSettings();
  });

  it('should default PRODUCT to anet when PRODUCT/ACTIVE are not set', () => {
    delete process.env.PRODUCT;
    delete process.env.ACTIVE;
    delete process.env.active;

    const settings = getSettings();
    expect(settings.product).toBe('anet');
  });

  it('should use PRODUCT when explicitly set', () => {
    process.env.PRODUCT = 'aw';

    const settings = getSettings();
    expect(settings.product).toBe('aw');
  });

  it('should map ACTIVE=true to PRODUCT=anet when PRODUCT is not set', () => {
    delete process.env.PRODUCT;
    process.env.ACTIVE = 'true';

    const settings = getSettings();
    expect(settings.product).toBe('anet');
  });

  it('should map active=true to PRODUCT=anet when PRODUCT is not set', () => {
    delete process.env.PRODUCT;
    delete process.env.ACTIVE;
    process.env.active = 'true';

    const settings = getSettings();
    expect(settings.product).toBe('anet');
  });

  it('should load ActiveNet defaults', () => {
    const settings = getSettings();
    expect(settings.activenet_host).toBe(DEFAULT_ACTIVENET_HOST);
    expect(settings.activenet_org).toBe(DEFAULT_ACTIVENET_ORG);
    expect(settings.activenet_api_key).toBe('1');
    expect(settings.activenet_shared_secret).toBe('');
  });

  it('should load ActiveNet values from environment', () => {
    process.env.ACTIVENET_HOST = 'api.example.com';
    process.env.ACTIVENET_ORG = 'demoorg';
    process.env.ACTIVENET_API_KEY = 'demo-key';
    process.env.ACTIVENET_SHARED_SECRET = 'demo-secret';

    const settings = getSettings();
    expect(settings.activenet_host).toBe('api.example.com');
    expect(settings.activenet_org).toBe('demoorg');
    expect(settings.activenet_api_key).toBe('demo-key');
    expect(settings.activenet_shared_secret).toBe('demo-secret');
  });

  it('should default ActiveNet secure protocol to true', () => {
    delete process.env.ACTIVENET_SECURE_PROTOCOL;

    const settings = getSettings();
    expect(settings.activenet_secure_protocol).toBe(true);
  });

  it('should parse ActiveNet secure protocol from env', () => {
    process.env.ACTIVENET_SECURE_PROTOCOL = 'false';

    const settings = getSettings();
    expect(settings.activenet_secure_protocol).toBe(false);
  });

  it('should use default HTTP timeout', () => {
    const settings = getSettings();
    expect(settings.http_timeout).toBe(DEFAULT_HTTP_TIMEOUT);
  });

  it('should use default log level', () => {
    const settings = getSettings();
    expect(settings.log_level).toBe(DEFAULT_LOG_LEVEL);
  });

  it('should cache settings after first load', () => {
    const settings1 = getSettings();
    const settings2 = getSettings();
    
    expect(settings1).toBe(settings2); // Same object reference
  });

  it('should reset settings cache', () => {
    const settings1 = getSettings();
    resetSettings();
    process.env.ACTIVENET_HOST = 'api.changed.example.com';
    const settings2 = getSettings();
    
    expect(settings1.activenet_host).toBe(DEFAULT_ACTIVENET_HOST);
    expect(settings2.activenet_host).toBe('api.changed.example.com');
  });

  it('should handle debug_api_calls flag', () => {
    process.env.DEBUG_API_CALLS = 'true';
    
    const settings = getSettings();
    expect(settings.debug_api_calls).toBe(true);
  });

  it('should default debug_api_calls to false', () => {
    const settings = getSettings();
    expect(settings.debug_api_calls).toBe(false);
  });

  it('should use PRODUCT=anet when explicitly set', () => {
    process.env.PRODUCT = 'anet';

    const settings = getSettings();
    expect(settings.product).toBe('anet');
  });
});
