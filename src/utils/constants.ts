/**
 * Shared constants for the ActiveNet MCP server.
 */

// Defaults
export const DEFAULT_ACTIVENET_HOST = "anstg.active.com";
export const DEFAULT_ACTIVENET_ORG = "lstgqa01";
export const DEFAULT_IDENTIFIER_PREFIX = "mcp";
export const DEFAULT_MIN_IDENTIFIER_LENGTH = 12;
export const DEFAULT_MAX_IDENTIFIER_LENGTH = 20;
export const DEFAULT_HTTP_TIMEOUT = 30.0;
export const DEFAULT_LOG_LEVEL = "INFO";
export const NONCE_PREFIX = "mcp_";

// Validation regex patterns
export const REGEX_CURRENCY_CODE = /^[A-Z]{3}$/;
export const REGEX_COUNTRY_CODE = /^[A-Z]{2}$/;
export const REGEX_DATE_YYYY_MM_DD = /^\d{4}-\d{2}-\d{2}$/;

// Validation limits
export const MIN_AMOUNT = 1;
export const MIN_PAGE_NUMBER = 1;
export const MIN_PAGE_SIZE = 1;
export const MAX_PAGE_SIZE = 1000;
export const MIN_CARD_LENGTH = 13;
export const MAX_CARD_LENGTH = 19;

// Security
export const MASK_CHARACTER = "*";
export const SENSITIVE_KEYS = ["authorization", "secret", "token", "password"];
export const CONTEXT_TOOL_ARGUMENTS = "tool_arguments";
export const ERROR_MSG_CARD_DETECTED = "Card number detected in data. Card numbers are not allowed.";
export const ERROR_MSG_CARD_TRANSMISSION_FORBIDDEN = "Transmitting raw card numbers is not allowed for PCI DSS compliance.";
export const ERROR_MSG_SECURITY_VIOLATION_REQUEST = "Security violation: Card numbers are not allowed";
