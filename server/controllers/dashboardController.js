const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
    try {
        const usersResult = await pool.query(
            "SELECT COUNT(*) FROM users"
        );

        const quizzesResult = await pool.query(
            "SELECT COUNT(*) FROM quizzes"
        );

        const questionsResult = await pool.query(
            "SELECT COUNT(*) FROM questions"
        );

        const attemptsResult = await pool.query(
            "SELECT COUNT(*) FROM results"
        );

        res.json({
            totalUsers: Number(usersResult.rows[0].count),
            totalQuizzes: Number(quizzesResult.rows[0].count),
            totalQuestions: Number(questionsResult.rows[0].count),
            totalAttempts: Number(attemptsResult.rows[0].count),
        });

    } catch (error) {

        console.error(
            "Error fetching dashboard statistics:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch dashboard statistics",
        });
    }
};

module.exports = {
    getDashboardStats,
};