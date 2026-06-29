const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const categoryControllerModule = require("../controllers/categoryController");

const router = express.Router();

//routes
// CREATE CATEGORY
router.post(
  "/createcategory",
  authMiddleware,
  categoryControllerModule.createCategoryController,
); // due to authmiddleware the token is checked for authorization

// GET ALL CATEGORY || GET ROUTE
router.get(
  "/getallcategory",
  categoryControllerModule.getAllCategoryController,
);

// UPDATE CATEGORY || UPDATE
router.put(
  "/updatecategory/:categoryId",
  authMiddleware,
  categoryControllerModule.updateCategoryController,
);

// DELETE CATEGORY || DELETE
router.delete(
  "/deletecategory/:categoryId",
  authMiddleware,
  categoryControllerModule.deleteCategoryController,
);

module.exports = router;
