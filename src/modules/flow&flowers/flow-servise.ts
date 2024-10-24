import { Types } from "mongoose";
import { UserModel } from "../User/user-model";
import { TFlow } from "./flow-interface";

const createFlowDB = async (payload: TFlow, id: string) => {
  await UserModel.findByIdAndUpdate(payload.follower, {
    $addToSet: { follower: new Types.ObjectId(id) },
  });

  await UserModel.findByIdAndUpdate(id, {
    $addToSet: { following: new Types.ObjectId(payload.follower) },
  });
};
const unFlowDB = async (payload: TFlow, id: string) => {
  await UserModel.findByIdAndUpdate(payload.follower, {
    $pull: { ["follower"]: new Types.ObjectId(id) },
  });

  await UserModel.findByIdAndUpdate(id, {
    $pull: { ["following"]: new Types.ObjectId(payload.follower) },
  });
};
export const flowService = {
  createFlowDB,
  unFlowDB,
};
