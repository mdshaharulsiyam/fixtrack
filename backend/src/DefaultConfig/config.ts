import dotenv from "dotenv";
dotenv.config();

const DEV_ORIGINS = "http://localhost:3000,http://localhost:5173";

const config = Object.freeze({
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  ALLOWED_ORIGIN: (
    process.env.ALLOWED_ORIGIN ||
    (process.env.NODE_ENV === "production" ? "" : DEV_ORIGINS)
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  DATABASE_URL: process.env.DATABASE_URL,
  DB_NAME: process.env.DB_NAME,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  TOKEN_NAME: process.env.TOKEN_NAME || "token",
  TOKEN_EXPIRES_SECONDS:
    (Number(process.env.TOKEN_EXPIRES_DAYS) || 7) * 24 * 60 * 60,
  ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL || "claude-opus-5-5",

  JOB_CODE_PREFIX: "FX",
  JOB_STATUS: [
    "Received",
    "Diagnosing",
    "Repairing",
    "Ready",
    "Delivered",
  ] as const,
  JOB_CATEGORY: [
    "screen",
    "battery",
    "water damage",
    "software",
    "charging port",
  ] as const,
  PHONE_PATTERN: /^\+?\d{7,15}$/,
  JOB_CODE_PATTERN: /^FX-\d{4}$/,
});

export const HttpStatus = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
});

export default config;
