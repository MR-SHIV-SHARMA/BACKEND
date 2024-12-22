import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription

  if (!mongoose.isValidObjectId(channelId)) {
    throw new apiError(400, "Invalid video ID.");
  }

  const subscription = await Subscription.findById(channelId);
  if (!subscription) {
    throw new apiError(404, "channel not found.");
  }

  subscription.subscriber = !subscription.subscriber;
  await subscription.save();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        subscription,
        "subscription status toggled successfully."
      )
    );
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if (!channelId) {
    throw new apiError(400, "Invalid channel ID");
  }

  const channel = await User.findById(channelId(subscribersCount));

  return res.status(200).json(new apiResponse(200, channel, "success"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (!subscriberId) {
    throw new apiError(400, "Invalid subscriberId");
  }
  const channel = await User.findById(subscriberId(channelsSubscribedToCount));

  return res.status(200).json(new apiResponse(200, channel, "success"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
