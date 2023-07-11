const { constants } = require("../constants");

function isValidLocation(location) {
  // Implement your location validation logic here
  // Example validation: Check if location has two floating-point numbers separated by a comma
  const regex = /^[-+]?\d+(\.\d+)?,[-+]?\d+(\.\d+)?$/;
  return regex.test(location);
}

function isValidRule(rule) {
  // Implement your rule validation logic here
  // Example validation: Check if rule has a valid format
  const regex =
    /^(windSpeed|temperature|humidity|rainIntensity)\s*[<>]\s*\d+(\.\d+)?(,\s*(windSpeed|temperature|humidity|rainIntensity)\s*[<>]\s*\d+(\.\d+)?)*$/;
  return regex.test(rule);
}

function isValidOperator(operator) {
  // Implement your operator validation logic here
  // Example validation: Check if operator is undefined or "or" or "and"
  return (
    typeof operator === "undefined" || operator === "OR" || operator === "AND"
  );
}

const validateParams = (res, location, rule, operator) => {
  if (!location || !rule) {
    res
      .status(constants.VALIDATION_ERROR)
      .json({ error: "Location and rule are mandatory." });
    return;
  }
  if (!isValidLocation(location)) {
    res
      .status(constants.VALIDATION_ERROR)
      .json({ error: "Invalid location format." });
    return;
  }
  if (!isValidRule(rule)) {
    res
      .status(constants.VALIDATION_ERROR)
      .json({ error: "Invalid rule format." });
    return;
  }
  if (!isValidOperator(operator.toUpperCase())) {
    res.status(constants.VALIDATION_ERROR).json({ error: "Invalid operator." });
    return;
  }
};

module.exports = { validateParams };
