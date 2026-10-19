import { Request, Response } from "express";
import { HttpStatus } from "../../DefaultConfig/config";
import { sendResponse } from "../../utils/sendResponse";
import { suggestion_service } from "./suggestion_service";

async function suggest(req: Request, res: Response) {
  const result = await suggestion_service.suggest(req.body.complaint);

  sendResponse(res, HttpStatus.SUCCESS, result);
}

export const suggestion_controller = Object.freeze({
  suggest,
});
