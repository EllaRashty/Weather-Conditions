const { constants } = require("../utils/constants");
const { ErrorOutput } = require("../utils/errorHandler");

const options = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

/**
 * This function fetches weather data for a given location.
 * @param {string} location - A string representing the location to fetch weather data for.
 * @returns {Array} An array of weather data intervals.
 * @throws Will throw an error if the API returns an error or if no data is found.
 */
exports.getWeatherData = async (location) => {
  const response = await fetch(
    `https://api.tomorrow.io/v4/timelines?location=${location}&fields=${constants.FIELDS}&timesteps=1h&units=metric&apikey=${constants.API_KEY}`,
    options
  );
  const res = await response.json();
  if (res.code) {
    // res.code = String(res.code).substring(0, 3); 
    res.code = constants.SERVER_ERROR;
    throw new ErrorOutput(res.code, res.message);
  }
  if (!res?.data?.timelines) {
    throw new ErrorOutput(constants.NOT_FOUND, "No Data Found.");
  }
  return res.data?.timelines[0]?.intervals;
};
