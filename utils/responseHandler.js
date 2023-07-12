const { constants } = require("./constants");
const { errorHandler } = require("./errorHandler");

/**
 * Sends a response with the given status code and output.
 * @param {object} res - The response object.
 * @param {number} statusCode - The status code to send.
 * @param {object} displayOutput - The output to send.
 */
exports.sendResponse = (res, statusCode, displayOutput) => {
  res.set("Content-Type", "application/json");
  res.status(statusCode).send(formatResponse(statusCode, displayOutput));
};

/**
 * Formats the given output into a JSON string.
 * @param {number} status - The status code of the response.
 * @param {object} displayOutput - The output to format.
 * @returns {string} - Returns the formatted output as a JSON string.
 */
const formatResponse = (status, displayOutput) => {
  let output;
  if (status !== constants.SUCCESS) {
    output = errorHandler(status, displayOutput.message);
  } else {
    output = {
      status: "success",
      data: {
        timeline: displayOutput,
      },
    };
  }
  return JSON.stringify(output, null, 3);
};
