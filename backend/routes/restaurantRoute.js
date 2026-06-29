const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const restaurantControllerModule = require("../controllers/restaurantController");

const router = express.Router();

//routes
// CREATE RESTAURANT POST
router.post(
  "/create",
  authMiddleware,
  restaurantControllerModule.createRestaurantContoller,
);

// GET all restaurant info
router.get(
  "/getallrestaurant",
  restaurantControllerModule.getAllRestaurantController,
);

// GET specific restaurant info
router.get(
  "/getrestaurantbyid/:restaurantId",
  restaurantControllerModule.getRestaurantByIdController,
);

//DELETE Restaurant :ON THE BASIS OF ID provided
router.delete(
  "/deleterestaurant/:restaurantId",
  authMiddleware,
  restaurantControllerModule.deleteRestaurantController,
);

module.exports = router;
