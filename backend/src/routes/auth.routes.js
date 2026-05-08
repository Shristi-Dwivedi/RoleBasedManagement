const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json(req.user);
});

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
    });
  }
);

router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

module.exports = router;