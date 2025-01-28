const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cors = require("cors");

// the express application, which will handle all incoming HTTP requests
const app = express();

app.use(cors()); // Enable CORS

// uses json
app.use(express.json());

app.use("/api", routes);

// the port the server will listen on
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

// the database connection
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

//connect to the database
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
