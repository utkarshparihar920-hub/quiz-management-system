const express = require("express");

const router = express.Router();

const {
  getSubjects,
  addSubject,
  deleteSubject,
  updateSubject
} = require("../controllers/subjectController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// Get all subjects
router.get(
  "/",
  authMiddleware,
  getSubjects
);


// Add subject - Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addSubject
);


router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteSubject
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateSubject
);


module.exports = router;