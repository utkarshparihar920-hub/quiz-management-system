const express = require("express");

const router = express.Router();

const { 
    getUsers,
    updateUser ,
    deleteUser
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Get all users - Admin only
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getUsers
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUser
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

module.exports = router;