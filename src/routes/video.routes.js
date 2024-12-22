import { Router } from "express";
import {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
} from "../controllers/video.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import verifyJWT from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.route("/").get(getAllVideos);

router.route("/:videoId").get(getVideoById);

router.route("/:videoId").delete(deleteVideo);

router.route("/:videoId").patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;
