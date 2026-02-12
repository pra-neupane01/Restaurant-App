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

// get all restaurant
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await pool.query(`SELECT * FROM restaurant`);

    // Correct check
    if (restaurants.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No restaurants available",
      });
    }

    res.status(200).send({
      success: true,
      count: restaurants.rows.length,
      restaurants: restaurants.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Restaurant API.",
    });
  }
};

// get specific restaurant
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide Restaurant ID",
      });
    }
    const restaurants = await pool.query(
      `SELECT * FROM restaurant WHERE restaurant_code = $1`,
      [restaurantId],
    );

    // ✅ Correct check
    if (restaurants.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No restaurant exists with this ID.",
      });
    }

    res.status(200).send({
      success: true,
      restaurant: restaurants.rows[0], // better naming
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Restaurant By Id API.",
    });
  }
};

// delete restaurant || DELETE
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Provide a valid Restaurant ID.",
      });
    }
    const restaurantInfo = await pool.query(
      `DELETE FROM restaurant WHERE restaurant_code = $1 `,
      [restaurantId],
    );

    res.status(200).send({
      success: true,
      message: `Restaurant with the id, ${restaurantId} deleted successfully.`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant API",
      error,
    });
  }
};

module.exports = {
  createRestaurantContoller,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
