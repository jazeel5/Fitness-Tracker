const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
