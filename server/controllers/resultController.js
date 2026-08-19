const pool = require("../config/db");

exports.submitResult = async (req, res) => {
    try {
        const { quiz_id, answers } = req.body;

        // Check required data
        if (!quiz_id || !answers || !Array.isArray(answers)) {
            return res.status(400).json({
                message: "Quiz ID and answers are required"
            });
        }

        // Get correct answers from database
        const result = await pool.query(
            `SELECT id, correct_answer
             FROM questions
             WHERE quiz_id = $1`,
            [quiz_id]
        );

        const questions = result.rows;

        if (questions.length === 0) {
            return res.status(404).json({
                message: "No questions found for this quiz"
            });
        }

        // Calculate score
        let score = 0;

        questions.forEach((question) => {
            const submittedAnswer = answers.find(
                (answer) => answer.question_id === question.id
            );

            if (
                submittedAnswer &&
                submittedAnswer.selected_answer === question.correct_answer
            ) {
                score++;
            }
        });

        // Calculate percentage
        const percentage = (score / questions.length) * 100;

        // Save result in database
        const savedResult = await pool.query(
            `INSERT INTO results
             (user_id, quiz_id, score, percentage)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [
                req.user.id,
                quiz_id,
                score,
                percentage
            ]
        );

        res.status(201).json({
            message: "Result calculated and saved successfully",
            result: {
                ...savedResult.rows[0],
                totalQuestions: questions.length
            }
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


exports.getAllResults = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                r.id,
                r.user_id,
                u.full_name AS student_name,
                r.quiz_id,
                q.title AS quiz_title,
                r.score,
                r.percentage,
                r.created_at
            FROM results r
            JOIN users u ON r.user_id = u.id
            JOIN quizzes q ON r.quiz_id = q.id
            ORDER BY r.created_at DESC
        `);

        res.status(200).json(result.rows);

    } catch (error) {
        console.error("Error fetching results:", error);

        res.status(500).json({
            message: "Failed to fetch results"
        });
    }
};


exports.getMyResults = async (req, res) => {
    try {

        const result = await pool.query(
            `
            SELECT
                r.id,
                r.quiz_id,
                q.title AS quiz_title,
                r.score,
                r.percentage,
                r.created_at
            FROM results r
            JOIN quizzes q ON r.quiz_id = q.id
            WHERE r.user_id = $1
            ORDER BY r.created_at DESC
            `,
            [req.user.id]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.error("Error fetching student results:", error);

        res.status(500).json({
            message: "Failed to fetch your results"
        });
    }
};