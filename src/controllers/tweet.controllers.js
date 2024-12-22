import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;

  if (!content) {
    throw new apiError(400, "No content");
  }

  const newTweet = await Tweet.create({
    content,
    owner: req.user._id, // Assuming user is authenticated
  });

  return res.status(200).json(new apiResponse(200, newTweet, "tweet created"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const userTweets = await Tweet.findById(req.Tweet._id);
  if (!userTweets) {
    throw new apiError(404, "tweets not found");
  }

  return response
    .status(200)
    .json(new apiResponse(200, userTweets, "get the tweet successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { content } = req.params;

  if (!content) {
    throw new apiError(404, "No content available");
  }

  const Content = await Tweet.findByIdAndUpdate({
    content: content,
  });

  return res
    .status(200)
    .json(new apiResponse(200, Content, "tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { content } = req.params;

  if (!content) {
    throw new apiError(404, "No content available");
  }

  await Tweet.deleteOne({ content });

  return res
    .status(200)
    .json(new apiResponse(200, "tweet delete successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
