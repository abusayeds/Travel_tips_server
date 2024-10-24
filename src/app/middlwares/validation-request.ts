import { AnyZodObject } from "zod";
import catchAsync from "../utils/catechAsync-funtion";
import { NextFunction, Request, Response } from "express";

const requestValidation = (schema : AnyZodObject) => {
    return catchAsync(async(req : Request, res : Response, next : NextFunction) => {
        await schema.parseAsync(req)
      
        next()
    })
}
export default requestValidation