import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Schema.types.ObjectId,
      ref: "Video",
    },
    comment: {
      type: mongoose.Schema.types.objectId,
      ref: "Comment",
    },
    tweet: {
      type: mongoose.Schema.types.objectId,
      ref: "Tweet",
    },
    likeby: {
      type: mongoose.Schema.types.objectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
