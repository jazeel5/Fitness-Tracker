const mongoose = require("mongoose");
// const mongoUri = "mongodb://localhost:27017/virtualTrainer";
// const mongoUri = "mongodb://127.0.0.1:27017/virtualTrainer";
const env = require("dotenv");
env.config()

const mongoUri = process.env.mongoUri;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectMongoDb;
