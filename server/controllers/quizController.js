const pool = require("../config/db");

// Get all quizzes
const getQuizzes = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM quizzes ORDER BY id DESC"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Get a single quiz by ID
const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM quizzes WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            quiz: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};




// Create a quiz
const createQuiz = async (req, res) => {
    try {

        const {
            title,
            description,
            category,
            difficulty,
            duration,
            total_marks,
            passing_marks,
            status
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            !difficulty ||
            !duration ||
            !total_marks ||
            !passing_marks ||
            !status
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO quizzes
      (title, description, category, difficulty, duration, total_marks, passing_marks, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
            [
                title,
                description,
                category,
                difficulty,
                duration,
                total_marks,
                passing_marks,
                status
            ]
        );

        res.status(201).json({
            message: "Quiz created successfully",
            quiz: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};



// Delete a quiz
const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM quizzes WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            message: "Quiz deleted successfully",
            quiz: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};



// Update a quiz
const updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            category,
            difficulty,
            duration,
            total_marks,
            passing_marks,
            status
        } = req.body;

        const result = await pool.query(
            `UPDATE quizzes
       SET title = $1,
           description = $2,
           category = $3,
           difficulty = $4,
           duration = $5,
           total_marks = $6,
           passing_marks = $7,
           status = $8
       WHERE id = $9
       RETURNING *`,
            [
                title,
                description,
                category,
                difficulty,
                duration,
                total_marks,
                passing_marks,
                status,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            message: "Quiz updated successfully",
            quiz: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


module.exports = {
    getQuizzes,
    getQuizById,
    createQuiz,
    deleteQuiz,
    updateQuiz
};