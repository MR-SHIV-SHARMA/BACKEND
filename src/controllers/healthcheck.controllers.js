import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
  //TODO: build a healthcheck response that simply returns the OK status as json with a message
  const response = await res.json({ status: "ok" });
  if (!response.ok) {
    throw new apiError(404, "Invalid response status: " + response.status);
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        response,
        "healthcheck response json returned successfully"
      )
    );
});

export { healthcheck };
