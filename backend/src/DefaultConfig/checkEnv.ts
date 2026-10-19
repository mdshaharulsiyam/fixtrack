import { logger } from "../utils/logger";

const REQUIRED = ["DATABASE_URL", "ACCESS_TOKEN_SECRET"];
const RECOMMENDED = ["ALLOWED_ORIGIN"];

const isMissing = (name: string) => !(process.env[name] || "").trim();

export const checkEnv = () => {
  const missingRequired = REQUIRED.filter(isMissing);
  const missingRecommended = RECOMMENDED.filter(isMissing);

  if (missingRecommended.length > 0) {
    logger.warn(
      `[env] not set: ${missingRecommended.join(", ")} - related features may not work (see .env.example)`,
    );
  }
  if (missingRequired.length > 0) {
    throw new Error(
      `[env] missing required settings: ${missingRequired.join(", ")} (see .env.example)`,
    );
  }
};
