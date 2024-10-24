import { z } from "zod";
import { USER_ROLE, USER_STATUS } from "./user-constant";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    role: z.nativeEnum(USER_ROLE).default(USER_ROLE.USER),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email",
      }),
    password: z.string({
      required_error: "Password is required",
    }),
    followersCount: z.number().min(0).default(0),
    followingCount: z.number().min(0).default(0),
    address: z.string().optional(),

    follower: z.array(z.string()).optional().default([]),

    following: z.array(z.string()).optional().default([]),
    status: z.nativeEnum(USER_STATUS).default(USER_STATUS.ACTIVE),
    mobileNumber: z.string().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email({
        message: "Invalid email",
      })
      .optional(),

    followersCount: z.number().min(0).default(0).optional(),
    followingCount: z.number().min(0).default(0).optional(),
    address: z.string().optional().optional(),
    FmobileNumber: z.string().optional(),
    coverPhoto: z.string().optional(),
    profilePhoto: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
