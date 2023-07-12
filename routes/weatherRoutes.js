const express = require("express");
const router = express.Router();
const { validateParams } = require("../utils/validations");
const { getWeatherData } = require("../logic/getWeatherData");
const { intervalsGrouping } = require("../logic/intervalGrouping");
const { sendResponse } = require("../utils/responseHandler");

/**
 * This function handles a GET request to the /weather-conditions endpoint.
 * It fetches weather data for a given location and groups the intervals based on a rule and an operator.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getWeather = async (req, res) => {
  try {
    const { location, rule, operator } = req.query;
    validateParams(location, rule, operator);
    const intervals = await getWeatherData(location);
    const groups = intervalsGrouping(intervals, rule, operator);
    sendResponse(res, res.statusCode, groups);
  } catch (error) {
    if (error.code) {
      res.status(error.code);
    }
    sendResponse(res, res.statusCode, error);
  }
};

router.route("/weather-conditions").get(getWeather);
module.exports = router;
