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

module.exports = router;
