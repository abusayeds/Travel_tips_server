import httpStatus from "http-status";
import sendResponse from "../../app/middlwares/responseHandle";
import catchAsync from "../../app/utils/catechAsync-funtion";
import { UserServices } from "./user-service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUerDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User successfully created ! ",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get User retrieved successfully ! ",
    data: result,
  });
});
const getSingleEmailUser = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getSingleEmailUserDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get User retrieved successfully ! ",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get alll User retrieved successfully ! ",
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.deleteUserDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " User deleted successfully ! ",
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.updateUserDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User update successfully! ",
    data: result,
  });
});

export const userController = {
  createUser,
  updateUser,
  getSingleUser,
  getAllUser,
  getSingleEmailUser,
  deleteUser,
};
