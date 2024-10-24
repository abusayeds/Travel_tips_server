/* eslint-disable @typescript-eslint/no-explicit-any */

import queryBuilder from "../../app/builder/queryBuilder";
import { UserModel } from "../User/user-model";

import { postSearchbleField } from "./Post-constant";
import { TPost } from "./Post-interface";
import { postModel } from "./Post-model";

const createPostDB = async (payload: TPost, id: string) => {
  const user = await UserModel.findById({ _id: id });
  const result = await postModel.create({
    ...payload,
    userName: user?.name,
    user: id,
  });
  return result;
};
const upvotePostDB = async (id: string) => {
  const post = await postModel.findById(id);
  const update: {
    $inc: {
      upvote: number;
      downvote?: number;
      totalVote: number;
    };
  } = {
    $inc: {
      upvote: 1,
      totalVote: 1,
    },
  };
  //   add to funtionality
  if ((post!.downvote ?? 0) > 0) {
    update.$inc.downvote = -1;
    update.$inc.totalVote = 1;
  }
  const result = await postModel.findByIdAndUpdate(id, update, { new: true });
  return result;
};

const downVotePostDB = async (id: string) => {
  const post = await postModel.findById(id);

  if ((post!.upvote ?? 0) > 0) {
    const update: {
      $inc: {
        downvote: number;
        upvote?: number;
        totalVote: number;
      };
    } = {
      $inc: {
        downvote: 1,
        totalVote: -1,
      },
    };

    if (post!.upvote! > 0) {
      update.$inc.upvote = -1;
      update.$inc.totalVote = -1;
    }

    const result = await postModel.findByIdAndUpdate(id, update, { new: true });
    return result;
  }
};
const getAllPostDB = async (query: Record<string, unknown>) => {
  const postQuery = new queryBuilder(
    postModel.find().populate("user").populate({
      path: "comments.userId",
      select: "name profilePhoto email",
    }),
    query
  )
    .fillter()
    .search(postSearchbleField)
    .sort()
    .pagenate()
    .fields();

  const result = await postQuery.modelQuery;
  return result;
};

const myPostDB = async (id: string, query: Record<string, unknown>) => {
  const postQuery = new queryBuilder(
    postModel.find({ user: id }).populate("user"),
    query
  )
    .search(postSearchbleField)
    .fillter()
    .sort()
    .pagenate()
    .fields();
  const result = await postQuery.modelQuery;
  return result;
};
const getSinglePostDB = async (id: string) => {
  const result = await postModel.findById(id).populate("user");
  return result;
};

const updataPostDB = async (id: string, payload: any) => {
  const result = await postModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deletePostDB = async (id: string) => {
  const result = await postModel.findByIdAndDelete(id);
  return result;
};
const addCommentDB = async (id: string, payload: any) => {
  const { userId, userComment } = payload;

  try {
    const result = await postModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { comments: { userId, userComment } },
      },
      { new: true }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
const editCommentDB = async (
  postId: string,
  commentId: string,
  userComment: string
) => {
  try {
    const result = await postModel.findOneAndUpdate(
      { _id: postId, "comments._id": commentId },
      {
        $set: { "comments.$.userComment": userComment },
      },
      { new: true }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
const deleteCommentDB = async (postId: string, commentId: string) => {
  try {
    const result = await postModel.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: commentId } }, // Remove the specific comment
      },
      { new: true }
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
// // const deleteCommentDB = async (id: string, commentId:any) => {
// //     try {
// //       const result = await postModel.findById(id);
// //       result?.comments?.pull(commentId)
// //       await result?.save()
// //       return result;
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const EditCommen= async (id: string, payload: any) => {
// //     const { userId, userComment } = payload;

// //     try {
// //       const result = await postModel.findByIdAndUpdate(
// //         id,
// //         {
// //           $addToSet: { comments: { userId, userComment } },
// //         },
// //         { new: true }
// //       );
// //       return result;
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };
// const editCommentDB = async (
//   postId: string,
//   payload: { userId: string; userComment: string }
// ) => {
//   const { userId, userComment } = payload;

//   try {
//     const post = await postModel.findOneAndUpdate(
//       { _id: postId, "comments.userId": userId },
//       {
//         $set: { "comments.$.userComment": userComment },
//       },
//       { new: true }
//     );

//     if (!post) {
//       throw new Error("Post or Comment not found");
//     }

//     return post;
//   } catch (error) {
//     throw new appError (httpStatus.BAD_REQUEST, `${error}`);

//   }
// };
// const deleteCommentDB = async (postId: string, commentId: string) => {
//     try {
//       const post = await postModel.findById(postId);

//       if (!post) {
//         throw new Error("Post not found");
//       }

//       if (!post.comments || post.comments.length === 0) {
//         throw new Error("Comments not found on this post");
//       }
//       const commentObjectId = new Types.ObjectId(commentId);
//       post.comments = post.comments.filter((comment: any) => {
//         const isMatch = comment._id.equals(commentObjectId);
//         if (isMatch) {
//           console.log(`Comment with ID ${commentId} found and will be deleted.`);
//         }
//         return !isMatch;
//       });

//       await post.save();
//       return post;
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//       throw error;
//     }
//   };

export const postService = {
  createPostDB,
  getAllPostDB,
  myPostDB,
  upvotePostDB,
  downVotePostDB,
  getSinglePostDB,
  updataPostDB,
  deletePostDB,
  addCommentDB,
  editCommentDB,
  deleteCommentDB,
};
