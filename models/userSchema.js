const pool = require("../config/db");

/*
This model ensures the foods table exists.
It contains: id, name, description, price, category, created_at
*/

const userSchema = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
address TEXT[],
phoneNumber VARCHAR(15) UNIQUE NOT NULL,
userType VARCHAR(50) NOT NULL DEFAULT 'Client' CHECK (userType IN ('Client', 'Admin','Vendor','Driver')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
answer VARCHAR(50) NOT NULL
);
`;
  try {
    await pool.query(query);
    console.log("✅ Users table ensured.");
  } catch (err) {
    console.error("❌ Error creating users table:", err);
  }
};

module.exports = { userSchema };
