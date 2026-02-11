const pool = require("../config/db");
//CREATE RESTAURANT

const createRestaurantContoller = async (req, res) => {
  try {
    const {
      restaurant_code,
      title,
      image_url,
      foods,
      open_time,
      pickup,
      delivery,
      service_door,
      logo_url,
      rating,
      address,
    } = req.body;

    // validation
    if (!restaurant_code || !title || !foods || !logo_url || !address) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the required fields.",
      });
    }

    await pool.query(
      `
      INSERT INTO restaurant
      (restaurant_code, title, image_url, foods, open_time, 
        pickup, delivery, service_door, logo_url, rating, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `,
      [
        restaurant_code,
        title,
        image_url,
        foods,
        open_time,
        pickup,
        delivery,
        service_door,
        logo_url,
        rating,
        address,
      ],
    );

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create restaurant API",
      error: error.message,
    });
  }
};

module.exports = { createRestaurantContoller };
