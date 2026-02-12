const pool = require("../config/db");

const foodSchema = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS food (
  food_id VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
  food_title VARCHAR(255) NOT NULL,
  food_description TEXT,
  image_url VARCHAR(255),
  availability_status VARCHAR(50) NOT NULL DEFAULT 'Available' CHECK (availability_status IN ('Available','Unavailable')),
  rating INTEGER NOT NULL DEFAULT 1 CHECK (rating BETWEEN 1 AND 5),
  rating_count INTEGER NOT NULL DEFAULT 0,
  restaurant_code VARCHAR(50) NOT NULL,
  category_id INTEGER NOT NULL,
  CONSTRAINT fk_food_res FOREIGN KEY (restaurant_code) REFERENCES restaurant (restaurant_code),
  CONSTRAINT fk_food_cat FOREIGN KEY (category_id) REFERENCES category (category_id)
);
`;

  try {
    await pool.query(query);
    console.log("✅ Food table ensured.");
  } catch (err) {
    console.error("❌ Error creating food table:", err);
  }
};

module.exports = { foodSchema };
