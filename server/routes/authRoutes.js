const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/register", register);
router.post("/login", login);

router.post("/logout", (req, res) => {
  res.status(200).json({
    message: "Logout successful. Please remove the token from the client."
  });
});

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome",
    user: req.user
  });
});

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin!"
    });
  }
);

module.exports = router;