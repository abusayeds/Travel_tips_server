import catchAsync from "../utils/catechAsync-funtion";
import { NextFunction, Request, Response } from "express";
import appError from "./appError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TuserRole } from "../../modules/User/user-interface";


const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new appError(httpStatus.UNAUTHORIZED, "You are not authorized  ");
    }
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new appError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized "
          );
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new appError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized "
          );
        }
        req.user = decoded as JwtPayload;
      }
    );
    next();
  });
};
export default auth;
