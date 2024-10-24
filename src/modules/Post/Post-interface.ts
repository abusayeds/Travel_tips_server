import { ObjectId, Types } from "mongoose";
import { ITEM_STATUS } from "./Post-constant";
export interface TComment {
  userId: Types.ObjectId;
  userComment: string;
}
export type TPost = {
  user: ObjectId;
  userName: string
  category: string;
  title: string;
  description: string;
  upvote?: number;
  downvote?: number;
  totalVote?: number;
  images?: string[];
  comments?: TComment[];
  status: keyof typeof ITEM_STATUS;
  createdAt?: Date;
  updatedAt?: Date;
};
