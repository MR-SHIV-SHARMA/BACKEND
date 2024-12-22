import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../Models/playlist.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { response } from "express";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //TODO: create playlist

  if (!name || !description) {
    throw new apiError(404, "Invalid name or description provided for request");
  }

  const playlist = await Playlist.create({
    name,
    description,
    videos,
    owner,
  });

  return res
    .status(200)
    .json(new apiResponse(200, playlist, "playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  if (!userId) {
    throw new apiError(404, "User not found");
  }

  const playlist = await Playlist.findById(userId);

  return res
    .status(200)
    .json(new apiResponse(200, playlist, "got the playlist"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  if (!playlistId) {
    throw new apiError(404, "No playlist");
  }

  const playlist = await Playlist.findById(playlistId);

  return res
    .status(200)
    .json(new apiResponse(200, playlist, "playlist get success"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!playlistId || !videoId) {
    throw new apiError(404, "Invalid playlist");
  }

  const addVideoToPlaylistSuccess = await Playlist.findById(
    playlistId.insert(videoId)
  );

  return response
    .status(200)
    .json(
      new apiResponse(
        200,
        addVideoToPlaylistSuccess,
        "video added successfully"
      )
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist

  if (!playlistId || !videoId) {
    throw new apiError(404, "Invalid playlist");
  }

  const removeVideoToPlaylistSuccess = await Playlist.findById(
    playlistId.delete(videoId)
  );

  return response
    .status(200)
    .json(
      new apiResponse(
        200,
        removeVideoToPlaylistSuccess,
        "video remove successfully"
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist

  if (!playlistId) {
    throw new apiError(404, "Invalid playlist");
  }

  const deletePlaylist = await Playlist.deleteOne(playlistId);

  return response
    .status(200)
    .json(new apiResponse(200, deletePlaylist, "playlist remove successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (!playlistId || !name || !description) {
    throw new apiError(
      404,
      "Invalid playlist ID or description provided for this request"
    );
  }

  const updatePlaylist = await Playlist.findByIdAndUpdate({
    name: name,
    description: description,
    videos,
    owner,
  });

  return response
    .status(200)
    .json(new apiResponse(200, updatePlaylist, "playlist update successfully"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
