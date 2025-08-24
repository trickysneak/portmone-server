export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
  static badRequest(details?: unknown) { return new ApiError(400, 'Bad Request', details); }
  static unauthorized() { return new ApiError(401, 'Unauthorized'); }
  static notFound(msg = 'Not Found') { return new ApiError(404, msg); }
}
