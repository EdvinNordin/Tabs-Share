const mongoose = require("mongoose");

//create a schema for the data
const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  artist: {
    required: true,
    type: String,
  },
  tab: {
    required: true,
    type: String,
  },
});

//export the schema
module.exports = mongoose.model("Data", dataSchema);
