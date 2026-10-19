import { CallbackError, Schema, model } from "mongoose";
import hashText from "../../utils/hashText";
import { IAuth } from "./auth_types";

const auth_schema = new Schema<IAuth>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

auth_schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await hashText(this.password);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

auth_schema.set("toJSON", {
  transform: (_doc, ret) => {
    const { password, ...profile } = ret;
    return profile;
  },
});

const auth_model = model<IAuth>("auth", auth_schema);

export default auth_model;
