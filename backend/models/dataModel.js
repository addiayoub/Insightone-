const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  seance: Date,
  masi: Number,
  volume: Number,
  variation: Number,
});

const Data = mongoose.model("data", dataSchema);
module.exports = Data;
