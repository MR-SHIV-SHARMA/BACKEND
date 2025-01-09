npm i express mongoose dotenv cookie-parser cors mongoose-aggregate-paginate-v2 bcrypt jsonwebtoken cloudinary multer
npm i -D nodemon prettier



// Publish a video
// const publishAVideo = asyncHandler(async (req, res) => {
//   const { title, description, isPublished } = req.body;

//   if (!title || !description || isPublished === undefined) {
//     throw new apiError(
//       422,
//       "Title, description, and publication status are required."
//     );
//   }

//   const videoFilePath = req.files?.videoFile?.[0]?.path;
//   const thumbnailPath = req.files?.thumbnail?.[0]?.path;

//   if (!videoFilePath || !thumbnailPath) {
//     throw new apiError(400, "Video file and thumbnail are required.");
//   }

//   const videoFileUpload = await uploadFileToCloudinary(videoFilePath);
//   const thumbnailUpload = await uploadFileToCloudinary(thumbnailPath);

//   if (!videoFileUpload || !thumbnailUpload) {
//     throw new apiError(
//       400,
//       "Failed to upload files to the cloud. Please try again."
//     );
//   }

//   const newVideo = await Video.create({
//     videoFile: videoFileUpload.url,
//     thumbnail: thumbnailUpload.url,
//     title,
//     description,
//     isPublished,
//     owner: req.user._id, // Assuming user is authenticated
//     duration,
//   });

//   return res
//     .status(201)
//     .json(new apiResponse(201, newVideo, "Video created successfully."));
// });