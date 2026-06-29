const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const orderControllerModule = require("../controllers/orderController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// CREATE ORDER || POST
router.post(
  "/createorder",
  authMiddleware,
  orderControllerModule.placeOrderController,
);

// ORDER STATUS
router.put(
  "/orderstatus/:orderId",
  authMiddleware,
  adminMiddleware,
  orderControllerModule.orderstatusController,
);

module.exports = router;
