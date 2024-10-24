import { z } from "zod";

const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
     description: z.string().min(1, "description is required"),
    upvote: z.number().int().nonnegative().default(0),
    downvote: z.number().int().nonnegative().default(0),
    totalVote: z.number().int().nonnegative().default(0),
    images: z.array(z.string()).optional().default([]),
   
    comments: z.array(z.string()).optional().default([]),
  }),
});


export const postValidation = {
  createPostValidationSchema,
};
