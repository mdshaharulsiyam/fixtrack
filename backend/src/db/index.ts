import mongoose from "mongoose";
import config from "../DefaultConfig/config";
import { logger } from "../utils/logger";

let connecting: Promise<void> | null = null;

export const connectToDB = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!connecting) {
    connecting = (async () => {
      if (!config.DATABASE_URL) {
        throw new Error("DATABASE_URL is not set");
      }
      await mongoose.connect(config.DATABASE_URL, {
        dbName: config.DB_NAME,
      });
      logger.info("connected to database");
    })().catch((error) => {
      connecting = null;
      throw error;
    });
  }
  return connecting;
};
