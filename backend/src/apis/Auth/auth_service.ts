import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config, { HttpStatus } from "../../DefaultConfig/config";
import { CustomError } from "../../utils/globalErrorHandler";
import auth_model from "./auth_model";
import { IAuth, ISignIn, ISignUp } from "./auth_types";

const issueLoginToken = (user: IAuth) =>
  jwt.sign({ id: String(user._id) }, config.ACCESS_TOKEN_SECRET || "", {
    expiresIn: config.TOKEN_EXPIRES_SECONDS,
  });

const toProfile = (user: IAuth) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

async function sign_up(data: ISignUp) {
  if (data.password !== data.confirm_password) {
    throw new Error("confirm password doesn't match");
  }

  const exists = await auth_model.exists({ email: data.email });
  if (exists) {
    throw new CustomError("an account already exists for this email", HttpStatus.CONFLICT);
  }

  const user = await auth_model.create({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  return {
    success: true,
    message: "account created successfully",
    data: toProfile(user),
    token: issueLoginToken(user),
  };
}

async function sign_in(data: ISignIn) {
  const user = await auth_model.findOne({ email: data.email });
  const is_match_pass = user
    ? await bcrypt.compare(data.password, user.password)
    : false;

  if (!user || !is_match_pass) {
    throw new CustomError("invalid credentials", HttpStatus.UNAUTHORIZED);
  }

  return {
    success: true,
    message: "login successfully",
    data: toProfile(user),
    token: issueLoginToken(user),
  };
}

async function get_profile(auth: IAuth) {
  return {
    success: true,
    message: "profile fetched successfully",
    data: toProfile(auth),
  };
}

export const auth_service = Object.freeze({
  sign_up,
  sign_in,
  get_profile,
});
