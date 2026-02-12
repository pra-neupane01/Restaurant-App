const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const foodControllerModule = require("../controllers/foodController");
const { route } = require("./testRoute");

const router = express.Router();

//routes
router.post(
  "/createfood",
  authMiddleware,
  foodControllerModule.createFoodController,
);

// get all food
router.get("/getallfood", foodControllerModule.getAllFoodController);

// get food by food id
router.get(
  "/getfoodbyid/:foodId",
  foodControllerModule.getFoodByFoodIdController,
);

// get food by restaurant id
router.get(
  "/getfoodbyrestaurantid/:restaurantId",
  foodControllerModule.getFoodByRestaurantId,
);

// update food
router.put(
  "/updatefood/:foodId",
  authMiddleware,
  foodControllerModule.updateFoodController,
);

// delete food by food id
router.delete(
  "/deletefood/:foodId",
  authMiddleware,
  foodControllerModule.deleteFoodController,
);

module.exports = router;
