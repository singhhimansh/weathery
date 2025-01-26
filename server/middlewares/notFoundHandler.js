import { ApiError } from "../coreutils/error.js";

// Middleware to handle all unknown 404 routes
export default function notFoundHandler(req, res, next) {
  const error = new ApiError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
}
