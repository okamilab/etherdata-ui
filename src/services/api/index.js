/**
 * An error that is thrown if an API call produced an error.
 */
export class ApiError extends Error {
  constructor(message, code) {
    super();
    this.message = message;
    this.code = code;
  }
}

/**
 * Handle the error response from the API server and throw an appropriate
 * exception.
 *
 * @param error The error to handle.
 */
export function handleError(error) {
  if (error.response) {
    const msg = error.response.data || 'Unknown Error';
    throw new ApiError(msg, error.statusCode);
  }

  throw error;
}
