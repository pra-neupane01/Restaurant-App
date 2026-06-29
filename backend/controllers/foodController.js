const pool = require("../config/db");

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status({
        success: false,
        message: "Unauthorized user.",
      });
    }

    const {
      food_id,
      food_title,
      food_description,
      image_url,
      availability_status,
      rating,
      rating_count,
      restaurant_code,
      category_id,
    } = req.body;

    if (
      !food_id ||
      !food_title ||
      !availability_status ||
      !restaurant_code ||
      !category_id
    ) {
      return res.status(404).send({
        success: false,
        message: "Please provide all the required fields.",
      });
    }

    const foods = await pool.query(
      `INSERT INTO food(
    food_id,
    food_title,
    food_description,
    image_url,
    availability_status,
    rating,
    rating_count,
    restaurant_code,
    category_id
  ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        food_id,
        food_title,
        food_description,
        image_url,
        availability_status,
        rating,
        rating_count,
        restaurant_code,
        category_id,
      ],
    );

    res.status(200).send({
      success: true,
      message: "Successfully Food Created.",
      foods: foods.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create food API.",
    });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const foodItems = await pool.query(`SELECT * FROM food`);
    console.log(foodItems.rows);

    if (foodItems.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Food Available.",
      });
    }

    res.status(200).send({
      success: true,
      message: foodItems.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Food API.",
      error,
    });
  }
};

const getFoodByFoodIdController = async (req, res) => {
  try {
    const foodId = req.params.foodId;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Provide food id.",
      });
    }

    const foodResult = await pool.query(`SELECT * FROM food WHERE food_id=$1`, [
      foodId,
    ]);
    if (foodResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No food Available.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food with the provided id has been fetched.",
      food: foodResult.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Food By Id API.",
      error,
    });
  }
};

// get food by restaurant id
const getFoodByRestaurantId = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant id.",
      });
    }

    const foodResult = await pool.query(
      `SELECT * FROM food WHERE restaurant_code=$1`,
      [restaurantId],
    );
    if (foodResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No food Available.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food with the provided id has been fetched.",
      food: foodResult.rows,
      foodCount: foodResult.rows.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Food By RestaurantId API.",
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user.",
      });
    }

    const foodId = req.params.foodId;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide food id.",
      });
    }

    const {
      food_title,
      food_description,
      image_url,
      availability_status,
      rating,
      rating_count,
    } = req.body;

    // ✅ Get specific food
    const existingFood = await pool.query(
      `SELECT * FROM food WHERE food_id = $1`,
      [foodId],
    );

    if (existingFood.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Food Not Found.",
      });
    }

    const currentFood = existingFood.rows[0];

    // ✅ Use nullish operator
    const finalFoodTitle = food_title ?? currentFood.food_title;
    const finalFoodDescription =
      food_description ?? currentFood.food_description;
    const finalImageUrl = image_url ?? currentFood.image_url;
    const finalAvailabilityStatus =
      availability_status ?? currentFood.availability_status;
    const finalRating = rating ?? currentFood.rating;
    const finalRatingCount = rating_count ?? currentFood.rating_count;

    const updatedFood = await pool.query(
      `
      UPDATE food 
      SET food_title = $1,
          food_description = $2,
          image_url = $3,
          availability_status = $4,
          rating = $5,
          rating_count = $6
      WHERE food_id = $7
      RETURNING *
      `,
      [
        finalFoodTitle,
        finalFoodDescription,
        finalImageUrl,
        finalAvailabilityStatus,
        finalRating,
        finalRatingCount,
        foodId,
      ],
    );

    res.status(200).send({
      success: true,
      message: "Successfully updated the food item.",
      food: updatedFood.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update Food API.",
    });
  }
};
// delete food by food id

const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.foodId;

    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide food ID.",
      });
    }

    // ✅ Check if specific food exists
    const foodResult = await pool.query(
      `SELECT * FROM food WHERE food_id = $1`,
      [foodId],
    );

    if (foodResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Food not found.",
      });
    }

    // ✅ Delete food
    await pool.query(`DELETE FROM food WHERE food_id = $1`, [foodId]);

    res.status(200).send({
      success: true,
      message: "Food item deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Food API.",
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByFoodIdController,
  getFoodByRestaurantId,
  deleteFoodController,
  updateFoodController,
};
