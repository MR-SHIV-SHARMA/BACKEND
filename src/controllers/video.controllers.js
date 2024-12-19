import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../Models/user.models.js";
import { Video } from "../Models/video.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
  const videos = await Video.getAllVideos(
    query,
    limit,
    sortBy,
    sortType,
    userId,
    page
  );

  if (!videos?.length) {
    throw new apiError(404, "no videos found for this page");
  }

  return res
    .status(200)
    .json(new apiResponse(200, videos, "videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video

  if (
    [title, description, isPublished].some((fildes) => fildes?.trim() === "")
  ) {
    throw new apiError(422, "Please fill in all the required fields");
  }

  const videoLocalPath = req.files?.videoFile[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!videoLocalPath) {
    throw new apiError(400, "Please select a valid image file for your avatar");
  }
  if (!thumbnailLocalPath) {
    throw new apiError(400, "Please select a valid image file for your avatar");
  }

  const videofile = await uploadFileToCloudinary(videoLocalPath);
  const thumbnail = await uploadFileToCloudinary(thumbnailLocalPath);

  if (!videofile) {
    throw new apiError(400, "Failed to upload video file. Please try again");
  }
  if (!thumbnail) {
    throw new apiError(
      400,
      "Failed to upload thumbnail file. Please try again"
    );
  }

  const video = await Video.create({
    videoFile: videofile.url,
    thumbnail: thumbnail.url,
    title,
    description,
  });

  const createdVideo = await Video.findById(video._id);

  if (!createdVideo) {
    throw new apiError(500, "Failed to create a video. Please try again later");
  }

  return res
    .status(201)
    .json(
      new apiResponse(201, createdVideo, "Video created successfully", true)
    );
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id

  const video = await Video.findById(videoId);

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        video,
        "get video from server and return json object with id: " + videoId
      )
    );
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail

  if (!videoId) {
    throw new apiError(400, "video id is required ");
  }
  const video = await Video.findByIdAndUpdate(
    req.video?._id,
    {
      $set: {
        thumbnail,
        title,
        description,
        videoFile: video,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new apiResponse(200, video, "video Details update successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video

  if (!videoId) {
    throw new apiError(400, "Invalid video id provided && missing video id");
  }

  const video = await Video.findById(videoId);

  if (video) {
    await video.delet();
  }

  return res
    .status(200)
    .json(new apiResponse(200, "video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new apiError(404, "video not found");
  }

  const video = await Video.findById(videoId);
  if (video.isPublished === true) {
    (await video.isPublished) === false;
  } else {
    (await video.isPublished) === true;
  }

  return res
    .status(200)
    .json(new apiResponse(200, video, "published successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
