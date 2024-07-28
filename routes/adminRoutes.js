const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const { VerifyAdminToken } = require("../middleware/authAdmin");
const {
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
} = require("../controllers/adminController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads/admin');

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

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/getProfile", VerifyAdminToken, getProfile);
router.get("/getAllCustomers", VerifyAdminToken, getAllCustomers);
router.get("/getFeedbacks", VerifyAdminToken, getFeedbacks);
router.put("/updateCustomerStatus/:id", VerifyAdminToken, updateCustomerStatus);
router.put(
  "/updateProfilePicture",
  VerifyAdminToken,
  upload.single("profile"),
  updateProfilePicture
);

router.put("/updateProfile", VerifyAdminToken, updateProfile);

//workOut
router.post("/insertNewWorkOut", VerifyAdminToken, insertNewWorkOut);
router.get("/getAllWorkOuts", VerifyAdminToken, getAllWorkOuts);
router.get("/getSingleWorkOut/:id", VerifyAdminToken, getSingleWorkOut);
router.put("/updateWorkOut/:id", VerifyAdminToken, updateWorkOut);
router.delete("/deleteWorkOut/:id", VerifyAdminToken, deleteWorkOut);
//workOut
router.post(
  "/insertNewMeal",
  upload.single("picture"),
  VerifyAdminToken,
  insertNewMeal
);
router.get("/getAllMeals", VerifyAdminToken, getAllMeals);
router.get("/getSingleMeal/:id", VerifyAdminToken, getSingleMeal);
router.put(
  "/updateMeal/:id",
  upload.single("picture"),
  VerifyAdminToken,
  updateMeal
);
router.delete("/deleteMeal/:id", VerifyAdminToken, deleteMeal);

//report
router.get("/getCounts", VerifyAdminToken, getCounts);
module.exports = router;
