const mongoose = require("mongoose");

const { Schema } = mongoose;

const savedWorkOutSchema = new Schema(
  {
    workOut_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workOut",
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("savedWorkOut", savedWorkOutSchema);
