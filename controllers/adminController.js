const feedbackSchema = require("../models/Feedback");
const adminSchema = require("../models/admin");
const customerSchema = require("../models/Customer");
const workoutSchema = require("../models/workouts");
const mealSchema = require("../models/Meals");
const env = require('dotenv')
env.config()

const secretKey = process.env.secretKey;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const check = await adminSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await new adminSchema({
        username,
        email,
        password: hashedPassword,
      }).save();
      res.json({ success: true, message: "Registered successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminSchema.findOne({ email });
    if (!admin) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        const token = jwt.sign(admin.id, secretKey);
        res.json({ success: true, message: "Login successfully", token });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Admin not found");
      res.json({ success: false, message: "Admin not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        admin,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerSchema.find();
    res.json({ success: true, customers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateCustomerStatus = async (req, res) => {
  try {
    var customer = await customerSchema.findById(req.params.id);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      const { status } = req.body;
      const updatedCustomer = {};
      if (status) {
        updatedCustomer.status = status;
      }
      customer = await customerSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedCustomer },
        { new: true }
      );
      var message = "";
      var color = "";
      if (status == "Active") {
        message = "Customer unblocked successfully";
        color = "success";
      } else {
        message = "Customer blocked successfully";
        color = "error";
      }
      res.json({ success: true, message, customer, color });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProfilePicture = async (req, res) => {
  try {
    var admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Admin not found");
      res.json({ success: false, message: "Admin not found" });
    } else {
      const profile = req?.file?.filename;
      const updatedAdmin = {};
      if (profile) {
        updatedAdmin.profile = profile;
      }
      admin = await adminSchema.findByIdAndUpdate(
        req.admin,
        { $set: updatedAdmin },
        { new: true }
      );
      res.json({
        success: true,
        admin,
        message: "Profile picture updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProfile = async (req, res) => {
  try {
    var admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Admin not found");
      res.json({ success: false, message: "Admin not found" });
    } else {
      const { username, password, email } = req.body;
      const updatedAdmin = {};

      if (username) {
        updatedAdmin.username = username;
      }
      if (email) {
        updatedAdmin.email = email;
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedAdmin.password = hashedPassword;
      }
      admin = await adminSchema.findByIdAndUpdate(
        req.admin,
        { $set: updatedAdmin },
        { new: true }
      );
      res.json({
        success: true,
        admin,
        message: "Profile updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackSchema.find();
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const insertNewWorkOut = async (req, res) => {
  try {
    const { title,
      difficulty,
      trainingType,
      equipment,
      burnEstimate,
      gender,
      description1,
      description2,
      warmUps,
      muscleFocus,
      mainMuscle,
      yLink } = req.body;
    const check = await workoutSchema.findOne({ title, gender, mainMuscle });
    if (check) {
      res.json({ success: false, message: "Workout already exists!" });
    } else {
      const newWorkout = new workoutSchema({
        title,
        difficulty,
        trainingType,
        equipment,
        burnEstimate,
        gender,
        description1,
        description2,
        warmUps,
        muscleFocus,
        mainMuscle,
        // thumbnail,
        yLink,
      }).save();
      res.json({
        success: true,
        message: "Workout posted successfully",
        newWorkout,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllWorkOuts = async (req, res) => {
  try {
    const workOuts = await workoutSchema.find();
    res.json({ success: true, workOuts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getSingleWorkOut = async (req, res) => {
  try {
    const workOut = await workoutSchema.findById(req.params.id);
    if (!workOut) {
      res.json({ success: false, message: "Workout not found!" });
    } else {
      res.json({ success: true, workOut });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const deleteWorkOut = async (req, res) => {
  try {
    const workOut = await workoutSchema.findById(req.params.id);
    if (!workOut) {
      res.json({ success: false, message: "Workout not found!" });
    } else {
      await workoutSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Workout deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateWorkOut = async (req, res) => {
  try {
    var workOut = await workoutSchema.findById(req.params.id);
    if (!workOut) {
      res.json({ success: false, message: "Workout not found!" });
    } else {
      const {
        title,
        difficulty,
        trainingType,
        equipment,
        burnEstimate,
        gender,
        description1,
        description2,
        warmUps,
        muscleFocus,
        mainMuscle,
        yLink,
      } = req.body;
      const updatedWorkOut = {};
      if (title) updatedWorkOut.title = title;
      if (difficulty) updatedWorkOut.difficulty = difficulty;
      if (trainingType) updatedWorkOut.trainingType = trainingType;
      if (equipment) updatedWorkOut.equipment = equipment;
      if (burnEstimate) updatedWorkOut.burnEstimate = burnEstimate;
      if (gender) updatedWorkOut.gender = gender;
      if (description1) updatedWorkOut.description1 = description1;
      if (description2) updatedWorkOut.description2 = description2;
      if (warmUps) updatedWorkOut.warmUps = warmUps;
      if (muscleFocus) updatedWorkOut.muscleFocus = muscleFocus;
      if (mainMuscle) updatedWorkOut.mainMuscle = mainMuscle;
      if (yLink) updatedWorkOut.yLink = yLink;
      workOut = await workoutSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedWorkOut },
        { new: true }
      );
      res.json({ success: true, message: "Workout updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const insertNewMeal = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      mealType,
      dietaryType,
      prepTime,
      cookTime,
      servings,
      calories,
      carbohydrate,
      protein,
      fat,
      description,
      ingredients,
      instructions,
    } = req.body;
    const picture = req?.file?.filename;
    const check = await mealSchema.findOne({ title, subTitle, mealType });
    if (check) {
      res.json({ success: false, message: "Meal already exists!" });
    } else {
      const newMeal = new mealSchema({
        title,
        picture,
        subTitle,
        mealType,
        dietaryType,
        prepTime,
        cookTime,
        servings,
        calories,
        carbohydrate,
        protein,
        fat,
        description,
        ingredients: JSON.parse(ingredients),
        instructions,
      }).save();
      res.json({
        success: true,
        message: "Meal posted successfully",
        newMeal,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getAllMeals = async (req, res) => {
  try {
    const meals = await mealSchema.find();
    res.json({ success: true, meals });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getSingleMeal = async (req, res) => {
  try {
    const meal = await mealSchema.findById(req.params.id);
    if (!meal) {
      res.json({ success: false, message: "Meal not found!" });
    } else {
      res.json({ success: true, meal });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const updateMeal = async (req, res) => {
  try {
    var meal = await mealSchema.findById(req.params.id);
    if (!meal) {
      res.json({ success: false, message: "Meal not found!" });
    } else {
      const {
        title,
        subTitle,
        mealType,
        dietaryType,
        prepTime,
        cookTime,
        servings,
        calories,
        carbohydrate,
        protein,
        fat,
        description,
        ingredients,
        instructions,
      } = req.body;
      const picture = req?.file?.filename;
      const updatedMeal = {};
      if (title) updatedMeal.title = title;
      if (subTitle) updatedMeal.subTitle = subTitle;
      if (mealType) updatedMeal.mealType = mealType;
      if (dietaryType) updatedMeal.dietaryType = dietaryType;
      if (prepTime) updatedMeal.prepTime = prepTime;
      if (cookTime) updatedMeal.cookTime = cookTime;
      if (description) updatedMeal.description = description;
      if (servings) updatedMeal.servings = servings;
      if (calories) updatedMeal.calories = calories;
      if (carbohydrate) updatedMeal.carbohydrate = carbohydrate;
      if (protein) updatedMeal.protein = protein;
      if (fat) updatedMeal.fat = fat;
      if (instructions) updatedMeal.instructions = instructions;
      if (ingredients) updatedMeal.ingredients = JSON.parse(ingredients);
      if (picture) updatedMeal.picture = picture;
      meal = await mealSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedMeal },
        { new: true }
      );
      res.json({ success: true, message: "Meal updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const meal = await mealSchema.findById(req.params.id);
    if (!meal) {
      res.json({ success: false, message: "Meal not found!" });
    } else {
      await mealSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Meal deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getCounts = async (req, res) => {
  try {
    const mealCount = await mealSchema.find();
    const workOutCount = await workoutSchema.find();
    const clientCount = await customerSchema.find();
    const filtered = clientCount.filter((item) => item?.status != "Blocked");
    res.json({
      success: true,
      mealCount: mealCount.length,
      workOutCount: workOutCount.length,
      clientCount: filtered.length,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
module.exports = {
  Register,
  Login,
  getProfile,
  getAllCustomers,
  getFeedbacks,
  updateCustomerStatus,
  updateProfilePicture,
  updateProfile,
  insertNewWorkOut,
  getAllWorkOuts,
  getSingleWorkOut,
  deleteWorkOut,
  updateWorkOut,
  insertNewMeal,
  getAllMeals,
  getSingleMeal,
  updateMeal,
  deleteMeal,
  getCounts,
};
