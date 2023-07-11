const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");

router.route("/weather-conditions").get(getWeather);

module.exports = router;
