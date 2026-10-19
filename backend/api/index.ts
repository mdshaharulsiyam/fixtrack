import type { IncomingMessage, ServerResponse } from "http";
import { app } from "../src/app";
import { connectToDB } from "../src/db";
import { checkEnv } from "../src/DefaultConfig/checkEnv";

let ready: Promise<void> | null = null;

const init = () => {
  if (!ready) {
    ready = (async () => {
      checkEnv();
      await connectToDB();
    })().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
};

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await init();
  } catch (error) {
    console.error((error as Error).message);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, message: "server is not configured correctly" }));
    return;
  }
  return app(req as any, res as any);
}
