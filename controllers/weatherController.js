const { getWeatherData } = require("../scripts/getWeatherData");
const { constants } = require("../constants");
const { validateParams } = require("../scripts/validations");

const getConditionsArray = (rule) => {
  const conditionsArray = rule.split(",").map((condition) => condition.trim());
  return conditionsArray;
};

const getWeather = async (req, res) => {
  let output;
  console.log(req.query);
  const { location, rule, operator } = req.query;
  validateParams(res, location, rule, operator);
  try {
    let groups = [];
    let currentGroup = {};
    const weatherData = await getWeatherData(location);
    const intervals = weatherData.intervals;
    const conditionsArray = getConditionsArray(rule);
    const lastInterval = 72;
    for (let i = 0; i < lastInterval; i++) {
      const interval = intervals[i];
      const conditionMet = evaluateConditions(
        interval.values,
        conditionsArray,
        operator.toUpperCase()
      );
      if (currentGroup && currentGroup.conditionMet === conditionMet) {
        console.log(
          conditionMet,
          interval.values.temperature,
          interval.startTime
        );
        currentGroup["endTime"] =
          i === intervals.length
            ? intervals[intervals.length].startTime
            : intervals[i + 1].startTime;
      } else {
        console.log(conditionMet, interval.startTime);
        currentGroup = {
          startTime: interval.startTime,
          endTime: "",
          conditionMet,
        };
        groups.push(currentGroup);
      }
    }

    res.set("Content-Type", "application/json");
    res.status(200).send(sendResponse(groups));
  } catch (error) {
    console.log(error);
  }
};

const sendResponse = (groups) => {
  output = {
    status: "success",
    data: {
      timeline: groups,
    },
  };
  return JSON.stringify(output, null, 3);
};

function evaluateConditions(values, conditions, operator = "AND") {
  if (operator === "OR") {
    for (let i = 0; i < conditions.length; i++) {
      // const temp = transformToLogic(values, conditions[i]);
      if (transformToLogic(values, conditions[i])) {
        return true;
      }
    }
    return false;
  } else if (operator === "AND") {
    for (let i = 0; i < conditions.length; i++) {
      // const temp = transformToLogic(values, conditions[i]);
      if (!transformToLogic(values, conditions[i])) {
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

module.exports = { getWeather };
