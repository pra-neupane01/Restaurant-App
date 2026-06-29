const pool = require("../config/db");
module.exports = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }

    const userResult = await pool.query(
      `SELECT usertype FROM users WHERE user_id = $1`,
      [userId],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 FIXED HERE
    if (userResult.rows[0].usertype !== "Admin") {
      return res.status(403).send({
        success: false,
        message: "Only Admin Access",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized Access.",
      error,
    });
  }
};
