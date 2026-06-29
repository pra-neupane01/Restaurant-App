const pool = require("../config/db");

const restaurantSchema = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS restaurant (
  restaurant_code VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  foods TEXT[] NOT NULL,
  open_time TIME,
  pickup VARCHAR(50) NOT NULL DEFAULT 'Available' CHECK (pickup IN ('Available','Unavailable')),
  delivery VARCHAR(50) NOT NULL DEFAULT 'Available' CHECK (delivery IN ('Available','Unavailable')),
  service_door VARCHAR(50) NOT NULL DEFAULT 'Open' CHECK (service_door IN ('Open','Closed')),
  logo_url VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL DEFAULT 1 CHECK (rating BETWEEN 1 AND 5),
  address TEXT NOT NULL
);
`;

  try {
    await pool.query(query);
    console.log("✅ Restaurant table ensured.");
  } catch (err) {
    console.error("❌ Error creating restaurant table:", err);
  }
};

module.exports = { restaurantSchema };
