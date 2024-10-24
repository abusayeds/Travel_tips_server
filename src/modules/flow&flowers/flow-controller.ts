import httpStatus from "http-status";
import sendResponse from "../../app/middlwares/responseHandle";
import catchAsync from "../../app/utils/catechAsync-funtion";
import { flowService } from "./flow-servise";

const createFlow = catchAsync(async (req, res) => {
  const result = await flowService.createFlowDB(req.body, req.user.id );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Post flow successfully ! ",
    data: result,
  });
});
const unFlow = catchAsync(async (req, res) => {
  const result = await flowService.unFlowDB(req.body, req.user.id );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " unflow successfully ! ",
    data: result,
  });
});
export const flowcontroller = {
  createFlow,
  unFlow
};

