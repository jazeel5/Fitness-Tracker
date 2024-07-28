const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    age: {
      type: String,
      require: true,
    },
    profile: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    weight: [],
    height: [],
  },
  { timestamps: true }
);
module.exports = mongoose.model("customer", customerSchema);
