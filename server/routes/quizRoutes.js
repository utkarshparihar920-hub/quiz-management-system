const express = require("express");

const router = express.Router();

const {
    getQuizzes,
    getQuizById,
    createQuiz,
    deleteQuiz,
    updateQuiz
} = require("../controllers/quizController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
    "/",
    authMiddleware,
    getQuizzes
);

router.get(
    "/:id",
    authMiddleware,
    getQuizById
);

router.delete(
    "/:id",
     authMiddleware,
      deleteQuiz
    );

    router.put(
        "/:id",
         authMiddleware,
          updateQuiz
        );

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createQuiz
);

module.exports = router;