import { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const sendResponse = (
  res: Response,
  status: number,
  data?: unknown,
  token?: [string, string, number?],
) => {
  if (token && token[0] && token[1]) {
    res.cookie(token[0], token[1], {
      maxAge: token[2] || 60 * 60 * 24 * 1000,
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });
  }
  res.status(status).send(data);
};
