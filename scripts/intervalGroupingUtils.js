const { constants } = require("../constants");

exports.intervalsGrouping = (groups, intervals, rule, operator) => {
  let currentGroup = {};
  const conditionsArray = getConditionsArray(rule);
  for (let i = 0; i < constants.QUERY_HOURS; i++) {
    const interval = intervals[i];
    const conditionMet = evaluateConditions(interval.values, conditionsArray, operator);
    if (currentGroup && currentGroup.conditionMet === conditionMet) {
      console.log(conditionMet, interval.startTime);
      currentGroup["endTime"] =
        i === intervals.length
          ? intervals[intervals.length].startTime
          : intervals[i + 1].startTime;
    } else {
      console.log(conditionMet, interval.startTime);
      currentGroup = { startTime: interval.startTime, endTime: "",  conditionMet};
      groups.push(currentGroup);
    }
  }
};

const getConditionsArray = (rule) => {
  const conditionsArray = rule.split(",").map((condition) => condition.trim());
  return conditionsArray;
};

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
    // console.log(values);
    return true;
  } else {
    throw new Error("Invalid operator");
  }
}

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
