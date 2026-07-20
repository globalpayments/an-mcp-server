/**
 * Tests for constants
 */

import { describe, it, expect } from '@jest/globals';
import {
  DEFAULT_ACTIVENET_HOST,
  DEFAULT_ACTIVENET_ORG,
  REGEX_CURRENCY_CODE,
  REGEX_COUNTRY_CODE,
  REGEX_DATE_YYYY_MM_DD,
  MIN_AMOUNT,
  MAX_PAGE_SIZE,
  MIN_CARD_LENGTH,
  MAX_CARD_LENGTH,
} from '../src/utils/constants.js';

describe('Constants', () => {
  it('should have ActiveNet default host and org', () => {
    expect(DEFAULT_ACTIVENET_HOST).toBe('anstg.active.com');
    expect(DEFAULT_ACTIVENET_ORG).toBe('lstgqa01');
  });

  it('should have working regex patterns', () => {
    expect(REGEX_CURRENCY_CODE.test('USD')).toBe(true);
    expect(REGEX_CURRENCY_CODE.test('EUR')).toBe(true);
    expect(REGEX_CURRENCY_CODE.test('US')).toBe(false);
    
    expect(REGEX_COUNTRY_CODE.test('US')).toBe(true);
    expect(REGEX_COUNTRY_CODE.test('GB')).toBe(true);
    expect(REGEX_COUNTRY_CODE.test('USA')).toBe(false);
    
    expect(REGEX_DATE_YYYY_MM_DD.test('2023-01-15')).toBe(true);
    expect(REGEX_DATE_YYYY_MM_DD.test('01-15-2023')).toBe(false);
  });

  it('should have valid minimum amount', () => {
    expect(MIN_AMOUNT).toBe(1);
    expect(typeof MIN_AMOUNT).toBe('number');
  });

  it('should have valid maximum page size', () => {
    expect(MAX_PAGE_SIZE).toBe(1000);
    expect(typeof MAX_PAGE_SIZE).toBe('number');
  });

  it('should have valid card length limits', () => {
    expect(MIN_CARD_LENGTH).toBe(13);
    expect(MAX_CARD_LENGTH).toBe(19);
  });
});
