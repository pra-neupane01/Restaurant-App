const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      phoneNumber,
      address,
      userType,
      answer,
    } = req.body;

    // 1️⃣ Validation
    if (!userName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // 2️⃣ Check existing user
    const existingUser = await pool.query(
      "SELECT user_id FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // 3️⃣ Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Insert user
    await pool.query(
      `
      INSERT INTO users
      (username, email, password, phonenumber, address, usertype, answer)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        userName,
        email,
        hashedPassword,
        phoneNumber,
        address,
        userType || "Client",
        answer || "HappyAnswer",
      ],
    );

    res.status(201).json({
      success: true,
      message: "Successfully Registered.",
    });
  } catch (error) {
    console.error("Error in register API:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

//LOGIN CONTROLLER

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email and Password",
      });
    }

    const userResult = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    ); // email match garyo bhane tyo sabai row aauxa
    //yesma chai object ma hunxa data , kati oota row xa bhanne info pani hunxa

    if (userResult.rows.length === 0) {
      // if email  really matched gareko xa bhane ta, rows badhi hunxa ni ta 0 bhanda
      return res.status(500).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const user = userResult.rows[0]; // exactly tyo user ko sabai data lai aauta row ma rakhxa (row le chai ) ra 0th index ko data linxa

    // decrypt and compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // token generation before logging in..
    const token = JWT.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.user_id,
        userName: user.username,
        email: user.email,
        password: user.password,
        userType: user.usertype,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = { registerController, loginController };
