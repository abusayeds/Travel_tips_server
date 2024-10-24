import { z } from "zod";

const crateFlowValidation = z.object({
  follower: z.string().optional(),
});

export const flowValidation = {
  crateFlowValidation,
};
