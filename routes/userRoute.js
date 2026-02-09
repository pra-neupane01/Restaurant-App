const express = require("express");
const userControllerModule = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/getuser", authMiddleware, userControllerModule.userController);

module.exports = router;
