const { constants } = require("./constants");
const { ErrorOutput } = require("./errorHandler");

/**
 * Checks if the given location is valid.
 * @param {string} location - The location to validate.
 * @returns {boolean} - Returns true if the location is valid, false otherwise.
 */
function isValidLocation(location) {
  const regex = /^[-+]?\d+(\.\d+)?,[-+]?\d+(\.\d+)?$/;
  return regex.test(location);
}

/**
 * Checks if the given rule is valid.
 * @param {string} rule - The rule to validate.
 * @returns {boolean} - Returns true if the rule is valid, false otherwise.
 */
function isValidRule(rule) {
  const regex =
    /^(windSpeed|temperature|humidity|rainIntensity)\s*[<>]\s*\d+(\.\d+)?(,\s*(windSpeed|temperature|humidity|rainIntensity)\s*[<>]\s*\d+(\.\d+)?)*$/;
  return regex.test(rule);
}

/**
 * Checks if the given operator is valid.
 * @param {string} operator - The operator to validate.
 * @returns {boolean} - Returns true if the operator is valid, false otherwise.
 */
function isValidOperator(operator) {
  return (
    typeof operator === "undefined" || operator === "OR" || operator === "AND"
  );
}

/**
 * Validates the given parameters and throws an error if any of them are invalid.
 * @param {string} location - The location to validate.
 * @param {string} rule - The rule to validate.
 * @param {string} [operator="AND"] - The operator to validate.
 */
const validateParams = (location, rule, operator = "AND") => {
  if (!location || !rule) {
    throw new ErrorOutput(
      constants.BED_REQUEST,
      "Location and rule are mandatory."
    );
  }
  if (!isValidLocation(location)) {
    throw new ErrorOutput(constants.BED_REQUEST, "Invalid location format.");
  }
  if (!isValidRule(rule)) {
    throw new ErrorOutput(constants.BED_REQUEST, "Invalid rule format.");
  }
  if (!isValidOperator(operator.toUpperCase())) {
    throw new ErrorOutput(
      constants.BED_REQUEST,
      "Invalid operator provided, please use 'AND' or 'OR'"
    );
  }
};

module.exports = { validateParams };
