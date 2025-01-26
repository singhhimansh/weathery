import { ApiError } from "../coreutils/error.js";


// Error handler middleware to catch all errors
export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}

