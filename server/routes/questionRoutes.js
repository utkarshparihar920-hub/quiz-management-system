const express = require("express");

const router = express.Router();

const {
    addQuestion,
    getQuestions,
    deleteQuestion,
    updateQuestion,
    getQuestionsByQuiz
} = require("../controllers/questionController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Get all questions - Admin only
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getQuestions
);

// Get questions by quiz - Logged-in users
router.get(
    "/quiz/:quizId",
    authMiddleware,
    getQuestionsByQuiz
);

// Add question - Admin only
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    addQuestion
);

// Delete question - Admin only
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteQuestion
);

// Update question - Admin only
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateQuestion
);

module.exports = router;