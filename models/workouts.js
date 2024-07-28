const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    difficulty: {
      type: String,
      require: true,
    },
    trainingType: {
      type: String,
      require: true,
    },
    equipment: {
      type: String,
      require: true,
    },
    burnEstimate: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    description1: {
      type: String,
      require: true,
    },
    description2: {
      type: String,
      require: true,
    },
    warmUps: {
      type: String,
      require: true,
    },
    muscleFocus: {
      type: String,
      require: true,
    },
    mainMuscle: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    yLink: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("workOut", workoutSchema);
