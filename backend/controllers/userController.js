const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// GET user data (uses token info from authMiddleware)
const getUserController = async (req, res) => {
  try {
    // Read user id from token
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }

    // Fetch user info from database
    const result = await pool.query(
      `SELECT user_id, username, email, address, phonenumber, usertype, created_at
       FROM users
       WHERE user_id = $1`,
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "user data",
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User API",
      error,
    });
  }
};

// UPDATE USER CONTROLLER
// This function updates user profile data using PostgreSQL
const updateUserController = async (req, res) => {
  try {
    /* ------------------------------------------------
       STEP 1: Get user ID from token
       (token is added by auth middleware)
    ------------------------------------------------ */
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }

    /* ------------------------------------------------
       STEP 2: Get data sent from frontend
       These may or may NOT be provided
    ------------------------------------------------ */
    const { userName, address, phoneNumber } = req.body;

    /* ------------------------------------------------
       STEP 3: Get current user data from database
       We do this so we don't overwrite data with NULL
    ------------------------------------------------ */
    const existingUser = await pool.query(
      `
      SELECT username, address, phonenumber
      FROM users
      WHERE user_id = $1
      `,
      [userId],
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Current user data from DB
    const currentUser = existingUser.rows[0];

    /* ------------------------------------------------
       STEP 4: Decide final values
       If frontend sends new value → use it
       Else → keep old value
    ------------------------------------------------ */
    const finalUserName = userName ?? currentUser.username;
    const finalAddress = address ?? currentUser.address;
    const finalPhoneNumber = phoneNumber ?? currentUser.phonenumber;

    /* ------------------------------------------------
       STEP 5: Update user in database
    ------------------------------------------------ */
    const updatedUser = await pool.query(
      `
      UPDATE users
      SET username = $1,
          address = $2,
          phonenumber = $3
      WHERE user_id = $4
      RETURNING user_id, username, email, address, phonenumber, usertype, created_at
      `,
      [finalUserName, finalAddress, finalPhoneNumber, userId],
    );

    /* ------------------------------------------------
       STEP 6: Send success response
    ------------------------------------------------ */
    res.status(200).send({
      success: true,
      message: "User updated successfully!",
      user: updatedUser.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
    });
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    // 1️⃣ Get data from frontend
    const { email, newPassword, answer } = req.body;

    // 2️⃣ Validation
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the fields.",
      });
    }

    // 3️⃣ Check user using email + answer
    const userResult = await pool.query(
      `
      SELECT user_id
      FROM users
      WHERE email = $1 AND answer = $2
      `,
      [email, answer],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found or invalid answer.",
      });
    }

    const userId = userResult.rows[0].user_id;

    // 4️⃣ Hash new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 5️⃣ Update password in database
    await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE user_id = $2
      `,
      [hashedPassword, userId],
    );

    // 6️⃣ Success response
    res.status(200).send({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Password Reset API",
    });
  }
};

// udpate password controller
const updatePasswordController = async (req, res) => {
  try {
    // 1️⃣ Get user ID from token
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }

    // 2️⃣ Get passwords from frontend
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old and new password.",
      });
    }

    // 3️⃣ Get current user with hashed password
    const userResult = await pool.query(
      `
      SELECT user_id, password
      FROM users
      WHERE user_id = $1
      `,
      [userId],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    const user = userResult.rows[0];

    // 4️⃣ Compare old password with hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Old password is incorrect.",
      });
    }

    // 5️⃣ Hash new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 6️⃣ Update password in database
    await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE user_id = $2
      `,
      [hashedPassword, userId],
    );

    // 7️⃣ Success response
    res.status(200).send({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Password API",
    });
  }
};

// delete profile of user
// user can delete their profile once logged in on the basis of token provided

const deleteProfileController = async (req, res) => {
  try {
    // 1️⃣ Get user ID from token (secure way)
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }

    // 2️⃣ Check if user exists
    const userResult = await pool.query(
      `
      SELECT user_id FROM users
      WHERE user_id = $1
      `,
      [userId],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // 3️⃣ Delete user
    await pool.query(
      `
      DELETE FROM users
      WHERE user_id = $1
      `,
      [userId],
    );

    // 4️⃣ Success response
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Profile API",
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
};
