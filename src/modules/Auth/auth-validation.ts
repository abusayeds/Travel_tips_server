import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "Id is required",
    }),
  }),
});
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "Id is required",
    }),
    newPassword: z.string({
      required_error: "New Password is required",
    }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    newPassword: z.string({
      required_error: "New Password is required",
    }),
    oldPassword: z.string({
      required_error: "Old Password is required",
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  changePasswordValidationSchema,
};
