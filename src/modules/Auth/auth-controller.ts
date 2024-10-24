import httpStatus from "http-status";
import config from "../../app/config";
import sendResponse from "../../app/middlwares/responseHandle";
import catchAsync from "../../app/utils/catechAsync-funtion";
import { authServise } from "./auth-service";

const createAuth = catchAsync(async (req, res) => {
  const result = await authServise.createAuthDB(req.body);
  const { accessToken } = result;

  res.cookie("accessToken", accessToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully",
    token: accessToken,
    data: result.user,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await authServise.forgetPasswordDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Resert link is genarated  successfully ! ",
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await authServise.resetPassWordDB(req.body, token as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " password reset successfully ! ",

    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await authServise.changePasswordDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Password changed successfully ! ",

    data: result,
  });
});

export const authController = {
  createAuth,
  forgetPassword,
  resetPassword,
  changePassword,
};
