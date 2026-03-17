/**
 * Application-wide constants
 * Centralized place for all magic strings and configuration values
 */

const APP_NAME = 'HackMatch';
const API_VERSION = 'v1';
const DEFAULT_PORT = 5000;

// HTTP Status Codes (commonly used)
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
};

module.exports = {
  APP_NAME,
  API_VERSION,
  DEFAULT_PORT,
  HTTP_STATUS,
};
