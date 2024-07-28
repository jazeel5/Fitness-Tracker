const feedbackSchema = require("../models/Feedback");
const customerSchema = require("../models/Customer");
const workoutSchema = require("../models/workouts");
const mealSchema = require("../models/Meals");
const savedMealSchema = require("../models/savedMeal");
const savedWorkOutSchema = require("../models/savedWorkouts");
const env = require('dotenv')
env.config()

const secretKey = process.env.secretKey;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendFeedback = async (req, res) => {
  try {
    const { name, email, phone, feedback } = req.body;

    const newFeedback = await new feedbackSchema({
      name,
      email,
      phone,
      message: feedback,
    }).save();
    res.json({
      success: true,
      message: "Thank you for your valuable feedback",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};

const Register = async (req, res) => {
  try {
    const { name, phone, email, password, age, gender } = req.body;
    const profile = req?.file?.filename;
    const check = await customerSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newCustomer = await new customerSchema({
        name,
        phone,
        email,
        password: hashedPassword,
        age,
        gender,
        profile,
      }).save();
      res.json({ success: true, message: "Registered successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await customerSchema.findOne({ email });
    if (!customer) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        if (customer?.status == "Blocked") {
          res.json({
            success: false,
            message: "Your account has been blocked",
          });
        } else {
          const token = jwt.sign(customer.id, secretKey);
          res.json({ success: true, message: "Login successfully", token });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};
const getProfile = async (req, res) => {
  try {
    const customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        customer,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};
const updateProfile = async (req, res) => {
  try {
    var customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      const { name, phone, address, age } = req.body;
      const profile = req?.file?.filename;
      const updatedCustomer = { name, phone, address };
      if (name) {
        updatedCustomer.name = name;
      }
      if (phone) {
        updatedCustomer.phone = phone;
      }
      if (address) {
        updatedCustomer.address = address;
      }
      if (age) {
        updatedCustomer.age = age;
      }
      if (profile) {
        updatedCustomer.profile = profile;
      }
      customer = await customerSchema.findByIdAndUpdate(
        req.customer,
        updatedCustomer
      );
      res.json({
        success: true,
        message: "Profile updated successfully",
        customer,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};

const uploadCustomerHeightRecord = async (req, res) => {
  try {
    var customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      const { height, month } = req.body;
      if (height < 1) {
        res.json({
          success: false,
          message: "Height should be greater than 0",
        });
      } else {
        const checkPrevious = customer.height.find(
          (record) => record.month === month
        );
        if (checkPrevious) {
          console.log("Height already recorded for this month");
          return res.json({
            success: false,
            message: "Height already recorded for this month",
          });
        } else {
          const updatedCustomer = {};
          if (height) {
            updatedCustomer.height = [...customer.height, { height, month }];
          }
          customer = await customerSchema.findByIdAndUpdate(
            req.customer,
            { $set: updatedCustomer },
            { new: true }
          );
          res.json({
            success: true,
            message: "Data submitted successfully",
            customer,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};

const getCustomerHeightRecord = async (req, res) => {
  try {
    var customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      res.json({
        success: true,
        message: "Data fetched successfully",
        heightRecords: customer.height,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};
const deleteCustomerHeightRecord = async (req, res) => {
  try {
    const customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      return res.json({ success: false, message: "Customer not found" });
    }

    const { month } = req.body;
    if (!month) {
      return res.json({ success: false, message: "Month not provided" });
    }

    const heightRecords = customer.height;
    if (heightRecords.length === 0) {
      return res.json({
        success: false,
        message: "No records found to delete",
      });
    }

    const updatedHeightRecords = heightRecords.filter(
      (record) => record.month !== month
    );
    if (updatedHeightRecords.length === heightRecords.length) {
      return res.json({
        success: false,
        message: "No record found for the specified month",
      });
    }

    customer.height = updatedHeightRecords;
    await customer.save();

    res.json({
      success: true,
      message: "Height record deleted successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};
const uploadCustomerWeightRecord = async (req, res) => {
  try {
    var customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      const { weight, date } = req.body;
      if (weight < 1) {
        return res.json({
          success: false,
          message: "Weight must be greater than 1",
        });
      } else {
        const checkPrevious = customer.weight.find(
          (record) => record.date === date
        );
        if (checkPrevious) {
          console.log("Weight already recorded for this date");
          return res.json({
            success: false,
            message: "Weight already recorded for this date",
          });
        } else {
          const updatedCustomer = {};
          if (weight) {
            updatedCustomer.weight = [...customer.weight, { weight, date }];
          }
          customer = await customerSchema.findByIdAndUpdate(
            req.customer,
            { $set: updatedCustomer },
            { new: true }
          );
          res.json({
            success: true,
            message: "Data submitted successfully",
            customer,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};

const getCustomerWeightRecord = async (req, res) => {
  try {
    var customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      res.json({
        success: true,
        message: "Data fetched successfully",
        weightRecords: customer.weight,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};
const deleteCustomerWeightRecord = async (req, res) => {
  try {
    const customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      return res.json({ success: false, message: "Customer not found" });
    }

    const { date } = req.body;
    if (!date) {
      return res.json({ success: false, message: "Date not provided" });
    }

    const weightRecords = customer.weight;
    if (weightRecords.length === 0) {
      return res.json({
        success: false,
        message: "No records found to delete",
      });
    }

    const updatedWeightRecords = weightRecords.filter(
      (record) => record.date !== date
    );
    if (updatedWeightRecords.length === weightRecords.length) {
      return res.json({
        success: false,
        message: "No record found for the specified date",
      });
    }

    customer.weight = updatedWeightRecords;
    await customer.save();

    res.json({
      success: true,
      message: "Weight record deleted successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error" });
  }
};

const viewAllWorkOuts = async (req, res) => {
  try {
    const workOuts = await workoutSchema.find();
    res.json({ success: true, workOuts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewSingleWorkOut = async (req, res) => {
  try {
    const workOut = await workoutSchema.findById(req.params.id);
    if (!workOut) {
      res.json({ success: false, message: "Workout not found!" });
    } else {
      const checkSaved = await savedWorkOutSchema.find({
        workOut_id: workOut.id,
        customer_id: req.customer,
      });
      if (checkSaved.length > 0) {
        res.json({
          success: true,
          workOut,
          saved: true,
          savedWorkOut: checkSaved,
        });
      } else {
        res.json({ success: true, workOut, saved: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const viewAllMeals = async (req, res) => {
  try {
    const meals = await mealSchema.find();
    res.json({ success: true, meals });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewSingleMeal = async (req, res) => {
  try {
    const meal = await mealSchema.findById(req.params.id);
    if (!meal) {
      res.json({ success: false, message: "Meal not found!" });
    } else {
      const checkSaved = await savedMealSchema.find({
        meal_id: meal.id,
        customer_id: req.customer,
      });
      if (checkSaved.length > 0) {
        res.json({ success: true, meal, saved: true, savedMeal: checkSaved });
      } else {
        res.json({ success: true, meal, saved: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const saveMeal = async (req, res) => {
  try {
    const { meal_id } = req.body;
    const savedMeal = await savedMealSchema.findOne({
      meal_id,
      customer_id: req.customer,
    });
    if (savedMeal) {
      res.json({ success: true, message: "Meal already saved!" });
    } else {
      const newSavedMeal = new savedMealSchema({
        meal_id,
        customer_id: req.customer,
      }).save();
      // await newSavedMeal
      res.json({ success: true, message: "Meal saved!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const removeMealFromSave = async (req, res) => {
  try {
    const savedMeal = await savedMealSchema.findById(req.params.id);
    if (!savedMeal) {
      res.json({ success: false, message: "Meal not found in saved" });
    } else {
      await savedMealSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Meal removed from saved" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const saveWorkout = async (req, res) => {
  try {
    const { workOut_id } = req.body;
    const savedMeal = await savedWorkOutSchema.findOne({
      workOut_id,
      customer_id: req.customer,
    });
    if (savedMeal) {
      res.json({ success: true, message: "Workout already saved!" });
    } else {
      const newSavedWorkout = new savedWorkOutSchema({
        workOut_id,
        customer_id: req.customer,
      }).save();
      // await newSavedWorkout
      res.json({ success: true, message: "Workout saved!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getSavedWorkOutAndMeal = async (req, res) => {
  try {
    const savedMeal = await savedMealSchema
      .find({ customer_id: req.customer })
      .populate("meal_id");
    const savedWorkout = await savedWorkOutSchema
      .find({
        customer_id: req.customer,
      })
      .populate("workOut_id");
    res.json({ success: true, savedWorkout, savedMeal });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const removeWorkoutFromSave = async (req, res) => {
  try {
    const savedWorkout = await savedWorkOutSchema.findById(req.params.id);
    if (!savedWorkout) {
      res.json({ success: false, message: "Workout not found in saved" });
    } else {
      await savedWorkOutSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Workout removed from saved" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

module.exports = {
  sendFeedback,
  Register,
  Login,
  getProfile,
  updateProfile,
  uploadCustomerHeightRecord,
  getCustomerHeightRecord,
  deleteCustomerHeightRecord,
  uploadCustomerWeightRecord,
  getCustomerWeightRecord,
  deleteCustomerWeightRecord,
  viewAllWorkOuts,
  viewSingleWorkOut,
  viewAllMeals,
  viewSingleMeal,
  saveMeal,
  removeMealFromSave,
  saveWorkout,
  removeWorkoutFromSave,
  getSavedWorkOutAndMeal,
};
