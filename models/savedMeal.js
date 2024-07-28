const mongoose = require("mongoose");

const { Schema } = mongoose;

const savedMealSchema = new Schema(
  {
    meal_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "meal",
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("savedMeal", savedMealSchema);
