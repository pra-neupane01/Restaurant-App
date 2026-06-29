const pool = require("../config/db");

const categorySchema = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS category (
category_id  SERIAL PRIMARY KEY,
  category_title VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL DEFAULT 'https://static.vecteezy.com/system/resources/previews/013/195/659/original/restaurant-delicious-food-logo-badge-line-style-design-with-smile-face-fork-and-spoon-icon-concept-for-catering-food-culinary-logo-design-vector.jpg'
);
`;

  try {
    await pool.query(query);
    console.log("✅ Category table ensured.");
  } catch (err) {
    console.error("❌ Error creating Category table:", err);
  }
};

module.exports = { categorySchema };
