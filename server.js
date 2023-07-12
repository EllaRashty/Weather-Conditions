const express = require("express");
const { errorHandler } = require("./utils/errorhandler");
const dotenv = require("dotenv").config();

const app = express();

// Set the port to the value of the PORT environment variable or 5000 if it's not defined.
const port = process.env.PORT || 5000;

// Use the express.json middleware to parse incoming JSON requests.
app.use(express.json());

// Use the weatherRoutes module for requests to the /api endpoint.
app.use("/api", require("./routes/weatherRoutes"));

// Use the errorHandler middleware to handle errors.
app.use(errorHandler);

// Start the server and listen on the specified port.
app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
