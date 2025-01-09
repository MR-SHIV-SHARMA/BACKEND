import mongoose from "mongoose";
import { Video } from "../Models/video.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";

// Get all videos with query, pagination, and sorting
const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = {},
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  const filter = userId ? { ...query, owner: userId } : query;

  const videos = await Video.aggregatePaginate(
    Video.aggregate([{ $match: filter }]),
    { page, limit, sort: { [sortBy]: sortType === "desc" ? -1 : 1 } }
  );

  if (!videos.docs.length) {
    throw new apiError(404, "No videos found for the given criteria.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, videos, "Videos fetched successfully."));
});

// Publish a video
const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description, isPublished } = req.body;

  if (!title || !description || isPublished === undefined) {
    throw new apiError(
      422,
      "Title, description, and publication status are required."
    );
  }

  const videoFilePath = req.files?.videoFile?.[0]?.path;
  const thumbnailPath = req.files?.thumbnail?.[0]?.path;

  if (!videoFilePath || !thumbnailPath) {
    throw new apiError(400, "Video file and thumbnail are required.");
  }

  const videoFileUpload = await uploadFileToCloudinary(videoFilePath);
  const thumbnailUpload = await uploadFileToCloudinary(thumbnailPath);

  if (!videoFileUpload || !thumbnailUpload) {
    throw new apiError(
      400,
      "Failed to upload files to the cloud. Please try again."
    );
  }

  const newVideo = await Video.create({
    videoFile: videoFileUpload.url,
    duration: videoFileUpload.duration, // duration nikalne ke liy add kiya hai
    thumbnail: thumbnailUpload.url,
    title,
    description,
    isPublished,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new apiResponse(201, newVideo, "Video created successfully."));
});

// Get video by ID
const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid video ID.");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, video, "Video fetched successfully."));
});

// Update video details
const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!mongoose.isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid video ID.");
  }

  const updatedFields = {};
  if (title) updatedFields.title = title;
  if (description) updatedFields.description = description;

  if (req.file) {
    const thumbnailUpload = await uploadFileToCloudinary(req.file.path);
    if (thumbnailUpload) updatedFields.thumbnail = thumbnailUpload.url;
  }

  const updatedVideo = await Video.findByIdAndUpdate(videoId, updatedFields, {
    new: true,
  });
  if (!updatedVideo) {
    throw new apiError(404, "Video not found.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, updatedVideo, "Video updated successfully."));
});

// Delete video
const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid video ID.");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found.");
  }

  await video.deleteOne();

  return res
    .status(200)
    .json(new apiResponse(200, null, "Video deleted successfully."));
});

// Toggle publish status
const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid video ID.");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new apiError(404, "Video not found.");
  }

  video.isPublished = !video.isPublished;
  await video.save();

  return res
    .status(200)
    .json(new apiResponse(200, video, "Publish status toggled successfully."));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
