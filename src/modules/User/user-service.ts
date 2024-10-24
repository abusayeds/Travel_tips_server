import httpStatus from "http-status";
import appError from "../../app/middlwares/appError";
import { TUser } from "./user-interface";
import { UserModel } from "./user-model";

const getSingleUserDB = async (userId: string) => {
  const result = await UserModel.findById(userId)
    .populate("follower", "name email status profilePhoto mobileNumber ")
    .populate("following", "name email status profilePhoto mobileNumber");

  return result;
};
const deleteUserDB = async (userId: string) => {
  const result = await UserModel.findByIdAndDelete(userId);

  return result;
};
const getSingleEmailUserDB = async (email: string) => {
  const result = await UserModel.findOne({ email: email })
    .populate("follower", "name email status profilePhoto mobileNumber ")
    .populate("following", "name email status profilePhoto mobileNumber");
  if (!result) {
    throw new appError(httpStatus.BAD_REQUEST, " this user not found !");
  }
  return result;
};
const getAllUserDB = async () => {
  const result = await UserModel.find()
    .populate("follower", "name email status profilePhoto mobileNumber ")
    .populate("following", "name email status profilePhoto mobileNumber");

  return result;
};
const createUerDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};
const updateUserDB = async (userId: string, payload: TUser) => {
  const result = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUerDB,
  getSingleUserDB,
  updateUserDB,
  getAllUserDB,
  getSingleEmailUserDB,
  deleteUserDB,
};
