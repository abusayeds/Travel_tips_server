import { ZodError, ZodIssue } from "zod";
import { TErrorSoureces, TGenericErrorResponse } from "../interface/error";


const hendleZodError = (err: ZodError) :TGenericErrorResponse => {
  const errorSoures: TErrorSoureces = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "zod validation error !",
    errorSoures,
  };
};
export default hendleZodError;
