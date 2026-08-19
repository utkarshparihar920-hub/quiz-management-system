const pool = require("../config/db");

// Get all subjects
const getSubjects = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM subjects ORDER BY id"
    );

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


// Add a subject
const addSubject = async (req, res) => {
  try {
    const { subject_name } = req.body;

    if (!subject_name) {
      return res.status(400).json({
        message: "Subject name is required"
      });
    }

    const result = await pool.query(
      "INSERT INTO subjects (subject_name) VALUES ($1) RETURNING *",
      [subject_name]
    );

    res.status(201).json({
      message: "Subject added successfully",
      subject: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


// Delete a subject
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM subjects WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Subject not found"
      });
    }

    res.status(200).json({
      message: "Subject deleted successfully",
      subject: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


// Update a subject
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject_name } = req.body;

    if (!subject_name) {
      return res.status(400).json({
        message: "Subject name is required"
      });
    }

    const result = await pool.query(
      "UPDATE subjects SET subject_name = $1 WHERE id = $2 RETURNING *",
      [subject_name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Subject not found"
      });
    }

    res.status(200).json({
      message: "Subject updated successfully",
      subject: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};


module.exports = {
  getSubjects,
  addSubject,
  deleteSubject,
  updateSubject
};

