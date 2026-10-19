import { Request, Response } from "express";
import config, { HttpStatus } from "../../DefaultConfig/config";
import { sendResponse } from "../../utils/sendResponse";
import { auth_service } from "./auth_service";
import { IAuth } from "./auth_types";

async function create(req: Request, res: Response) {
  const result = await auth_service.sign_up(req.body);

  sendResponse(res, HttpStatus.CREATED, result, [
    config.TOKEN_NAME,
    result.token,
    config.TOKEN_EXPIRES_SECONDS * 1000,
  ]);
}

async function sign_in(req: Request, res: Response) {
  const result = await auth_service.sign_in(req.body);

  sendResponse(res, HttpStatus.SUCCESS, result, [
    config.TOKEN_NAME,
    result.token,
    config.TOKEN_EXPIRES_SECONDS * 1000,
  ]);
}

async function sign_out(req: Request, res: Response) {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie(config.TOKEN_NAME, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  });
  sendResponse(res, HttpStatus.SUCCESS, {
    success: true,
    message: "user sign out successfully",
  });
}

async function get_profile(req: Request, res: Response) {
  const result = await auth_service.get_profile(req.user as IAuth);

  sendResponse(res, HttpStatus.SUCCESS, result);
}

export const auth_controller = Object.freeze({
  create,
  sign_in,
  sign_out,
  get_profile,
});
