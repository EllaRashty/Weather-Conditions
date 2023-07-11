const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;
app.use(express.json( ));
app.use("/api", require("./routes/weatherRoutes"));
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
