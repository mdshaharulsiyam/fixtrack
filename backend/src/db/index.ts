import mongoose from "mongoose";
import config from "../DefaultConfig/config";
import { logger } from "../utils/logger";

export const connectToDB = async () => {
  if (!config.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  await mongoose.connect(config.DATABASE_URL, {
    dbName: config.DB_NAME,
  });
  logger.info("connected to database");
};
