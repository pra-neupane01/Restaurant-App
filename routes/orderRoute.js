const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const orderControllerModule = require("../controllers/orderController");

const router = express.Router();

// CREATE ORDER || POST
router.post(
  "/createorder",
  authMiddleware,
  orderControllerModule.placeOrderController,
);

module.exports = router;
