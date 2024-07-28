const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    subTitle: {
      type: String,
      require: true,
    },
    mealType: {
      type: String,
      require: true,
    },
    dietaryType: {
      type: String,
      require: true,
    },
    prepTime: {
      type: String,
      require: true,
    },
    cookTime: {
      type: String,
      require: true,
    },
    servings: {
      type: String,
      require: true,
    },
    calories: {
      type: String,
      require: true,
    },
    carbohydrate: {
      type: String,
      require: true,
    },
    protein: {
      type: String,
      require: true,
    },
    fat: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
      require: true,
    },

    ingredients: [],
    instructions: [],
  },
  { timestamps: true }
);
module.exports = mongoose.model("meal", mealSchema);
