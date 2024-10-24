/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user-constant";

export type TUser = {
  _id?: string;
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  password: string;
  address?: string;
  follower?: Types.ObjectId[];
  following?: Types.ObjectId[];
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  resetCode: string;
  resetCodeExpires: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
export interface TUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
export type TuserRole = keyof typeof USER_ROLE;
