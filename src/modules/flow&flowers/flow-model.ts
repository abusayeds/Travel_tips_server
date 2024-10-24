import { model, Schema } from "mongoose";
import { TFlow } from "./flow-interface";

const flowSchema = new Schema<TFlow>(
  {
    follower: { type: String},

  },
  {
    timestamps: true,
    virtuals: true,
  }
);
export const flowModel = model<TFlow>("Flow", flowSchema);
