import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  if (!mongoose.isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid video ID.");
  }

  const like = await Like.findById(videoId);
  if (!like) {
    throw new apiError(404, "Video not found.");
  }

  like.isPublished = !like.isPublished;
  await like.save();

  return res
    .status(200)
    .json(new apiResponse(200, like, "Like status toggled successfully."));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  if (!mongoose.isValidObjectId(commentId)) {
    throw new apiError(400, "Invalid comment ID.");
  }

  const like = await Like.findById(commentId);
  if (!like) {
    throw new apiError(404, "comment not found.");
  }

  like.isPublished = !like.isPublished;
  await like.save();

  return res
    .status(200)
    .json(new apiResponse(200, like, "Like status toggled successfully."));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  if (!mongoose.isValidObjectId(tweetId)) {
    throw new apiError(400, "Invalid tweetId ID.");
  }

  const like = await Like.findById(tweetId);
  if (!like) {
    throw new apiError(404, "tweetId not found.");
  }

  like.isPublished = !like.isPublished;
  await like.save();

  return res
    .status(200)
    .json(new apiResponse(200, like, "Like status toggled successfully."));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos

  const { likeby } = req.params;

  if (!likeby) {
    throw new apiError(404, "like Not Found");
  }

  const like = await Like.findById(likeby);

  return res.status(200).json(200, like, "like fetched successfully");
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
