const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const {
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
} = require("../controllers/customerController");
const { VerifyCustomerToken } = require("../middleware/authCustomer");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const dir = path.join(__dirname, 'uploads/customer');

    // Create the directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/sendFeedback", sendFeedback);
router.post("/Register", upload.single("profile"), Register);
router.post("/Login", Login);
router.get("/getProfile", VerifyCustomerToken, getProfile);
router.put(
  "/updateProfile",
  VerifyCustomerToken,
  upload.single("profile"),
  updateProfile
);
router.put(
  "/uploadCustomerHeightRecord",
  VerifyCustomerToken,
  uploadCustomerHeightRecord
);
router.get(
  "/getCustomerHeightRecord",
  VerifyCustomerToken,
  getCustomerHeightRecord
);
router.put(
  "/deleteCustomerHeightRecord",
  VerifyCustomerToken,
  deleteCustomerHeightRecord
);
router.put(
  "/uploadCustomerWeightRecord",
  VerifyCustomerToken,
  uploadCustomerWeightRecord
);
router.get(
  "/getCustomerWeightRecord",
  VerifyCustomerToken,
  getCustomerWeightRecord
);
router.put(
  "/deleteCustomerWeightRecord",
  VerifyCustomerToken,
  deleteCustomerWeightRecord
);

//workout
router.get("/viewAllWorkOuts", VerifyCustomerToken, viewAllWorkOuts);
router.get("/viewSingleWorkOut/:id", VerifyCustomerToken, viewSingleWorkOut);
//meal
router.get("/viewAllMeals", VerifyCustomerToken, viewAllMeals);
router.get("/viewSingleMeal/:id", VerifyCustomerToken, viewSingleMeal);

//save meal
router.post("/saveMeal", VerifyCustomerToken, saveMeal);
router.delete(
  "/removeMealFromSave/:id",
  VerifyCustomerToken,
  removeMealFromSave
);
//save Workout
router.post("/saveWorkout", VerifyCustomerToken, saveWorkout);
router.delete(
  "/removeWorkoutFromSave/:id",
  VerifyCustomerToken,
  removeWorkoutFromSave
);

// get saved
router.get(
  "/getSavedWorkOutAndMeal",
  VerifyCustomerToken,
  getSavedWorkOutAndMeal
);
module.exports = router;
