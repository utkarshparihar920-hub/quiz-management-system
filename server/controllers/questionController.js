const pool = require("../config/db");

// Add Question
exports.addQuestion = async (req, res) => {
    try {
        const {
            quiz_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer
        } = req.body;

        if (
            !quiz_id ||
            !question ||
            !option_a ||
            !option_b ||
            !option_c ||
            !option_d ||
            !correct_answer
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO questions
            (quiz_id, question, option_a, option_b, option_c, option_d, correct_answer)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                quiz_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_answer
            ]
        );

        res.status(201).json({
            message: "Question added successfully",
            question: result.rows[0]
        });

    } catch (error) {
        console.error("Add Question Error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Get All Questions
exports.getQuestions = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM questions ORDER BY id ASC"
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Get Questions Error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Delete Question
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM questions WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        res.json({
            message: "Question deleted successfully",
            question: result.rows[0]
        });

    } catch (error) {
        console.error("Delete Question Error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};



// Update Question
exports.updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            quiz_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer
        } = req.body;

        const result = await pool.query(
            `UPDATE questions
             SET quiz_id = $1,
                 question = $2,
                 option_a = $3,
                 option_b = $4,
                 option_c = $5,
                 option_d = $6,
                 correct_answer = $7
             WHERE id = $8
             RETURNING *`,
            [
                quiz_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_answer,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        res.json({
            message: "Question updated successfully",
            question: result.rows[0]
        });

    } catch (error) {
        console.error("Update Question Error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Get Questions for Student Quiz Attempt
exports.getQuestionsByQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;

        const result = await pool.query(
            `SELECT
                id,
                quiz_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d
             FROM questions
             WHERE quiz_id = $1
             ORDER BY id ASC`,
            [quizId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "No questions found for this quiz"
            });
        }

        res.status(200).json(result.rows);

    } catch (error) {
        console.error("Get Questions By Quiz Error:", error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};