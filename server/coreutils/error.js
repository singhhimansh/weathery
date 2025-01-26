// class to create a error instance
class ApiError extends Error {
  constructor(errmsg, statusCode) {
    super(errmsg);
    this.statusCode = statusCode;
    if (statusCode === 401) {
      this.status = "Unauthorized";
    } else {
      this.status = statusCode.toString().startsWith("4") ? "Invalid" : "Error";
    }
  }
}

export { ApiError };
