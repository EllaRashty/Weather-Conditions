const { constants } = require("../utils/constants");

/**
 * This function groups intervals based on a rule and an operator.
 * @param {Array} intervals - An array of intervals to be grouped.
 * @param {string} rule - A string representing the rule to group the intervals by.
 * @param {string} operator - A string representing the operator to use when evaluating the conditions.
 * @returns {Array} An array of grouped intervals.
 */
exports.intervalsGrouping = (intervals, rule, operator) => {
  let groups = [];
  let currentGroup = {};
  const conditionsArray = getConditionsArray(rule);
  for (let i = 0; i < constants.QUERY_HOURS; i++) {
    const interval = intervals[i];
    const conditionMet = evaluateConditions(
      interval.values,
      conditionsArray,
      operator
    );
    if (currentGroup && currentGroup.conditionMet === conditionMet) {
      currentGroup["endTime"] =
        i === intervals.length
          ? intervals[intervals.length].startTime
          : intervals[i + 1].startTime;
    } else {
      currentGroup = {
        startTime: interval.startTime,
        endTime: "",
        conditionMet,
      };
      groups.push(currentGroup);
    }
  }
  return groups;
};

/**
 * This function converts a rule string into an array of conditions.
 * @param {string} rule - A string representing the rule to group the intervals by.
 * @returns {Array} An array of conditions.
 */
const getConditionsArray = (rule) => {
  const conditionsArray = rule.split(",").map((condition) => condition.trim());
  return conditionsArray;
};

/**
 * This function evaluates if a set of conditions are met based on an operator.
 * @param {Object} values - An object containing the values to evaluate the conditions against.
 * @param {Array} conditions - An array of conditions to evaluate.
 * @param {string} [operator="AND"] - A string representing the operator to use when evaluating the conditions.
 * @returns {boolean} A boolean indicating if the conditions are met or not.
 */
function evaluateConditions(values, conditions, operator = "AND") {
  if (operator.toUpperCase() === "OR") {
    for (let i = 0; i < conditions.length; i++) {
      const conditionMet = transformToLogic(values, conditions[i]);
      if (conditionMet) {
        return true;
      }
    }
    return false;
  } else if (operator.toUpperCase() === "AND") {
    for (let i = 0; i < conditions.length; i++) {
      const conditionMet = transformToLogic(values, conditions[i]);
      if (!conditionMet) {
        return false;
      }
    }
    return true;
  } else {
    throw new Error("Invalid operator");
  }
}

/**
 * This function transforms a condition into a logical expression and evaluates it against a set of values.
 * @param {Object} values - An object containing the values to evaluate the condition against.
 * @param {string} condition - A string representing the condition to evaluate.
 * @returns {boolean} A boolean indicating if the condition is met or not.
 */
function transformToLogic(values, condition) {
  const regex = /([a-zA-Z]+)([<>]=?)(\d+(\.\d+)?)/;
  const [, property, operator, value] = condition.match(regex);
  switch (`${property}`) {
    case "temperature":
      temperature = values.temperature;
      return operator === "<" ? temperature < value : temperature > value;
    case "humidity":
      humidity = values.humidity;
      return operator === "<" ? humidity < value : humidity > value;
    case "windSpeed":
      windSpeed = values.windSpeed;
      return operator === "<" ? windSpeed < value : windSpeed > value;
    case "rainIntensity":
      rainIntensity = values.rainIntensity;
      return operator === "<" ? windSpeed < value : windSpeed > value;
  }
}
