/**
 * Class representing an error with a code and a message.
 * @extends Error
 */
class ErrorOutput extends Error {
  /**
   * Creates an instance of ErrorOutput.
   * @param {number} code - The error code.
   * @param {string} message - The error message.
   */
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

/**
 * Formats the given error into an object.
 * @param {number} statusCode - The status code of the error.
 * @param {string} data - The error message.
 * @returns {object} - Returns the formatted error as an object.
 */
const errorHandler = (statusCode, data) => {
  return {
    status: "error",
    error: {
      code: statusCode,
      message: data,
    },
  };
};

module.exports = { errorHandler, ErrorOutput };
