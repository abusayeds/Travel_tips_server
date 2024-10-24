/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-useless-escape */
import bcryptjs from "bcryptjs";
import { Schema, Types, model } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user-constant";
import { TUser, TUserModel } from "./user-interface";
import config from "../../app/config";

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      default: USER_ROLE.USER,
      required: true,
    },

    email: {
      type: String,
      required: true,
      //validate email
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    follower: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },

    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    passwordChangedAt: {
      type: Date,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    coverPhoto: {
      type: String,
      default: null,
    },
    resetCode: {
      type: String,
      default: "1234",
    },
    resetCodeExpires: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select("+password");
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TUser, TUserModel>("User", userSchema);
