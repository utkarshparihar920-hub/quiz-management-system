const pool = require("../config/db");

// Get all users
const getUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, full_name, email, role FROM users ORDER BY id"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, role } = req.body;

        if (!full_name || !email || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const result = await pool.query(
            `UPDATE users
       SET full_name = $1, email = $2, role = $3
       WHERE id = $4
       RETURNING id, full_name, email, role`,
            [full_name, email, role, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
    getUsers,
    updateUser,
    deleteUser
};