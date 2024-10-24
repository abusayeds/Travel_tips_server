import { model, Schema, Types } from "mongoose";
import { TPost } from "./Post-interface";
import { ITEM_STATUS } from "./Post-constant";
const commentSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User" },
  userComment: { type: String, required: true },
});
const postSchema = new Schema<TPost>(
  {
    comments: { type: [commentSchema], default: [] },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required : true
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    upvote: {
      type: Number,
      required: true,
      default: 0,
    },
    downvote: {
      type: Number,
      required: true,
      default: 0,
    },
    totalVote: {
      type: Number,
      required: true,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,

      default: ITEM_STATUS.AVAILABLE,
      required: true,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);
export const postModel = model<TPost>("Post", postSchema);
