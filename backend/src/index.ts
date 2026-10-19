import { app } from "./app";
import { connectToDB } from "./db";
import config from "./DefaultConfig/config";
import { checkEnv } from "./DefaultConfig/checkEnv";
import { logger } from "./utils/logger";

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, error);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${String(reason)}`);
});

async function main() {
  try {
    checkEnv();
    await connectToDB();
  } catch (error) {
    logger.error((error as Error).message);
    process.exit(1);
  }

  const server = app.listen(Number(config.PORT), () => {
    logger.info(`server is running on port ${config.PORT}`);
  });

  process.on("SIGTERM", () => {
    logger.info(`Process ${process.pid} received SIGTERM. Shutting down gracefully.`);
    server.close(() => process.exit(0));
  });
}

main();
