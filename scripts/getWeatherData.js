const { constants } = require("../constants");

const options = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

exports.getWeatherData = async (location) => {
  const temp = await fetch(
    `https://api.tomorrow.io/v4/timelines?location=${location}&fields=${constants.FIELDS}&timesteps=1h&units=metric&apikey=${constants.API_KEY}`,
    options
  ).catch((error) => console.log(error));
  const newTemp = await temp.json();
  return newTemp.data.timelines[0];
};

// module.exports = { getWeatherData };
