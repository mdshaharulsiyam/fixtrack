import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import auth_model from "../apis/Auth/auth_model";
import config, { HttpStatus } from "../DefaultConfig/config";

interface DecodedToken extends JwtPayload {
  id?: string;
}

const readToken = (req: Request): string | undefined => {
  const tokenWithBearer: string | undefined =
    req.headers.authorization || req.cookies?.[config.TOKEN_NAME];
  if (!tokenWithBearer) return undefined;
  return tokenWithBearer.startsWith("Bearer ")
    ? tokenWithBearer.split(" ")[1]
    : tokenWithBearer;
};

const unauthorized = (res: Response, message: string) => {
  res.status(HttpStatus.UNAUTHORIZED).send({ success: false, message });
};

const verifyToken = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = readToken(req);
      if (!token) return unauthorized(res, "Please login first");

      let decodedToken: DecodedToken;
      try {
        decodedToken = jwt.verify(
          token,
          config.ACCESS_TOKEN_SECRET || "",
        ) as DecodedToken;
      } catch {
        return unauthorized(res, "Session expired, please login again");
      }

      const user = await auth_model.findById(decodedToken.id);
      if (!user) return unauthorized(res, "User not found");

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default verifyToken;
