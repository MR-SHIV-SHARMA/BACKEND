import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const filter = userId ? { ...query, owner: userId, video: videoId } : query;

  const comment = await Comment.aggregatePaginate(
    Comment.aggregate([{ $match: filter }]),
    { page, limit, sort: { [sortBy]: sortType === "desc" ? -1 : 1 } }
  );

  if (!comment.docs.length) {
    throw new apiError(404, "No comment found for the given criteria.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, comment, "comment fetched successfully."));
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { content, video, owner } = req.body;
  if (!content || video || owner) {
    throw new apiError(400, "Invalid content type or video content type");
  }

  const comments = await Comment.create({
    content: content,
    video,
    owner,
  });

  return res
    .status(200)
    .json(new apiResponse(200, comments, "Comment created successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { content, video, owner } = req.params;
  if (!content || video || owner) {
    throw new apiError(400, "Invalid content type or video content type");
  }

  const comments = await Comment.findByIdAndUpdate({
    content: content,
    video,
    owner,
  });

  return res
    .status(200)
    .json(new apiResponse(200, comments, "Comment update successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { content } = req.params;
  if (!content) {
    throw new apiError(404, "No content");
  }

  const comments = await Comment.deleteOne({
    content,
  });

  return res
    .status(200)
    .json(new apiResponse(200, "comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
