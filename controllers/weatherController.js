const { getWeatherData } = require("../scripts/getWeatherData");
const { validateParams } = require("../scripts/validations");
const { intervalsGrouping } = require("../scripts/intervalGroupingUtils");

const getWeather = async (req, res) => {
  const { location, rule, operator } = req.query;
  validateParams(res, location, rule, operator);
  try {
    let groups = [];
    const intervals = await getWeatherData(location);
    intervalsGrouping(groups, intervals, rule, operator);
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

module.exports = { getWeather };
