const pool = require("../config/db");

const orderSchema = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS orders(
    order_id VARCHAR(50) PRIMARY KEY,
    payment_amount INTEGER NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'Preparing'
      CHECK (order_status IN ('Preparing','On the way','Delivered')),
    user_id INTEGER NOT NULL,
    food_id VARCHAR(50) NOT NULL,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_order_food FOREIGN KEY (food_id) REFERENCES food(food_id)
  ); 
  `;

  try {
    await pool.query(query);
    console.log("✅ Orders table ensured.");
  } catch (err) {
    console.error("❌ Error creating Orders table:", err);
  }
};

module.exports = { orderSchema };
