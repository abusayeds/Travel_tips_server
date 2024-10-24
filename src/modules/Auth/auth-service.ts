import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../app/config";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import appError from "../../app/middlwares/appError";
import { UserModel } from "../User/user-model";
import { TLoginUser } from "./auth-interface";
import { createToken } from "./auth-utils";
import { sendEmail } from "../../app/utils/sendEmail";

const createAuthDB = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByEmail(payload?.email);

  //   checking the exixts user
  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "This user is not found  ! ");
  }

  // check the password
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new appError(httpStatus.FORBIDDEN, "This pasword do not match ");
  }

  const jwtPayload = {
    id: user._id,
    name: user.name,
    userEmail: user.email,
    role: user.role,
    user: user,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
    user,
  };
};
const forgetPasswordDB = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "This user is not found  ! ");
  }
  const resetCode = crypto.randomInt(1000, 9999).toString();

  const jwtPayload = {
    id: user._id,
    name: user.name,
    userEmail: user.email,
    role: user.role,
    user: user,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );

  //   const resetLink = `${config.reset_password_ui_link}/forgetPassword`;

  await UserModel.findByIdAndUpdate(id, {
    resetCode: resetCode,
    resetCodeExpires: Date.now() + 10 * 60 * 1000,
  });
  const emailContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2>Password Reset Request</h2>
    <p>If you requested to reset your password, click the button below:</p>
   
    <p style="background-color: #4CAF50; color: white; padding: 10px 20px; 
              text-align: center; text-decoration: none; display: inline-block;
              ; border-radius: 5px;">Your reset code is: <strong>${resetCode}</strong></p>
    <p>If you didn't request this, please ignore this email.</p>
  </div>
`;

  sendEmail(user.email, emailContent);
  return accessToken;
};

const resetPassWordDB = async (
  payload: { id: string; newPassword: string; resetCode: string },
  token: string
) => {
  const user = await UserModel.findById(payload.id);

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "This user is not found  ! ");
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  if (decoded.id !== payload.id) {
    throw new appError(httpStatus.FORBIDDEN, "You are forbidden ! ");
  }
  if (
    user.resetCode !== payload.resetCode ||
    user.resetCodeExpires.getTime() < Date.now()
  ) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      "Invalid or expired reset code!"
    );
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await UserModel.findOneAndUpdate(
    { _id: decoded.id, role: decoded.role },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
      resetCode: null,
      resetCodeExpires: null,
    }
  );
};

const changePasswordDB = async (payload: {
  email: string;
  newPassword: string;
  oldPassword: string;
}) => {
  const user = await UserModel.findOne({ email: payload.email })
    .populate("follower", "name email status profilePhoto mobileNumber ")
    .populate("following", "name email status profilePhoto mobileNumber");
  //   checking the exixts user

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "This user is not found  ! ");
  }

  // check the password
  if (
    !(await UserModel.isPasswordMatched(payload?.oldPassword, user?.password))
  ) {
    throw new appError(httpStatus.FORBIDDEN, "This pasword do not match ");
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await UserModel.findOneAndUpdate(
    { email: payload.email },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );
  return null;
};

export const authServise = {
  createAuthDB,
  forgetPasswordDB,
  resetPassWordDB,
  changePasswordDB,
};
