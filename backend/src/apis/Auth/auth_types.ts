import { Document } from "mongoose";

export interface IAuth extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}
