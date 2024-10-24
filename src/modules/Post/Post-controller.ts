import httpStatus from "http-status";
import sendResponse from "../../app/middlwares/responseHandle";
import catchAsync from "../../app/utils/catechAsync-funtion";
import { postService } from "./Post-service";

const createPost = catchAsync(async (req, res) => {
  const result = await postService.createPostDB(req.body, req.user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Post created successfully ! ",
    data: result,
  });
});
const upvotePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.upvotePostDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " vote done  ! ",
    data: result,
  });
});
const downVotePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.downVotePostDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " down vote done  ! ",
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.getSinglePostDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Find single post successfully  ! ",
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await postService.getAllPostDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get All Post successfully ! ",
    data: result,
  });
});
const myPost = catchAsync(async (req, res) => {
  const result = await postService.myPostDB(req.user.id, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get My Post successfully ! ",
    data: result,
  });
});
const updataPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.updataPostDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "  Post updata successfully ! ",
    data: result,
  });
});
const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.deletePostDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Delete successfully ! ",
    data: result,
  });
});
const addComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await postService.addCommentDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Comment successfully ! ",
    data: result,
  });
});
const editComment = catchAsync(async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userComment = req.body.userComment;
  const result = await postService.editCommentDB(postId, commentId, userComment);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Edit Comment successfully ! ",
    data: result,
  });
});
const deleteComment = catchAsync(async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
  const result = await postService.deleteCommentDB(postId, commentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Deleted Comment successfully ! ",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPost,
  myPost,
  upvotePost,
  downVotePost,
  getSinglePost,
  updataPost,
  deletePost,
  addComment,
  editComment, 
  deleteComment,
};
