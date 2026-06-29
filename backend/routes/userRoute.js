const express = require("express");
const userControllerModule = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// get user route
router.get("/getuser", authMiddleware, userControllerModule.getUserController);

// update profile route
// update profile route
router.put(
  "/updateuser",
  authMiddleware,
  userControllerModule.updateUserController,
);

router.post(
  "/resetpassword",
  authMiddleware,
  userControllerModule.resetPasswordController,
);

//update password route
router.post(
  "/updatepassword",
  authMiddleware,
  userControllerModule.updatePasswordController,
);
//delte user
router.delete(
  "/deleteuser",
  authMiddleware,
  userControllerModule.deleteProfileController,
);

module.exports = router;
