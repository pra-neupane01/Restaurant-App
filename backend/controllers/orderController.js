const pool = require("../config/db");

const placeOrderController = async (req, res) => {
  try {
    // 🔐 Logged-in user id from auth middleware
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user.",
      });
    }

    // 📦 Get data from body
    const { order_id, payment_amount, food_id } = req.body;

    // ✅ Validation
    if (!order_id || !payment_amount || !food_id) {
      return res.status(400).send({
        success: false,
        message: "Provide all required fields.",
      });
    }

    // 🧠 Insert WITHOUT order_status (DEFAULT will apply)
    const orderResult = await pool.query(
      `
      INSERT INTO orders(order_id, payment_amount, user_id, food_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [order_id, payment_amount, userId, food_id],
    );

    res.status(201).send({
      success: true,
      message: "Order created successfully.",
      order: orderResult.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Order API.",
      error,
    });
  }
};

// CHANGE ORDER STATUS
const orderstatusController = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    if (!orderId) {
      return res.status(400).send({
        success: false,
        message: "Please provide order id.",
      });
    }

    const { order_status } = req.body;

    const existingOrder = await pool.query(
      `SELECT * FROM orders WHERE order_id = $1`,
      [orderId],
    );

    if (existingOrder.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Order Not Found.",
      });
    }

    const currentOrder = existingOrder.rows[0];

    // If not provided, keep old status
    const finalOrderStatus = order_status ?? currentOrder.order_status;

    const updatedOrder = await pool.query(
      `UPDATE orders 
       SET order_status = $1 
       WHERE order_id = $2 
       RETURNING *`,
      [finalOrderStatus, orderId],
    );

    res.status(200).send({
      success: true,
      message: "Order Status Updated.",
      order: updatedOrder.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order Status API.",
      error,
    });
  }
};

module.exports = { placeOrderController, orderstatusController };
