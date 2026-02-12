const pool = require("../config/db");
// CREATE CATEGORY
const createCategoryController = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }
    const { category_title, image_url } = req.body;

    if (!category_title) {
      return res.status(400).send({
        success: false,
        message: "Please provide category title.",
      });
    }

    await pool.query(
      `
      INSERT INTO category(category_title, image_url)
      VALUES($1, $2)
      `,
      [category_title, image_url],
    );

    res.status(201).send({
      success: true,
      message: "Category Created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category API.",
    });
  }
};

// GET ALL CATEGORY
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await pool.query(`
            SELECT * FROM category`);

    if (categories.rows.length === 0) {
      res.status(404).send({
        success: false,
        message: "No category Available.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category succesfully fetched.",
      categories: categories.rows,
      count: categories.rows.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Category API.",
    });
  }
};

// UPDATE CATEGORY
const updateCategoryController = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user",
      });
    }

    const categoryId = req.params.categoryId;
    const { category_title, image_url } = req.body;

    // Check if category exists
    const existingCategory = await pool.query(
      `SELECT * FROM category WHERE category_id = $1`,
      [categoryId],
    );

    if (existingCategory.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Category not found.",
      });
    }

    const currentCategory = existingCategory.rows[0];

    const finalTitle = category_title || currentCategory.category_title;
    const finalImage = image_url || currentCategory.image_url;

    const updatedCategory = await pool.query(
      `
      UPDATE category 
      SET category_title = $1, image_url = $2
      WHERE category_id = $3
      RETURNING *
      `,
      [finalTitle, finalImage, categoryId],
    );

    res.status(200).send({
      success: true,
      message: "Successfully updated the category.",
      category: updatedCategory.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Category API.",
    });
  }
};

// DELETE CATEGORY || DELETE
const deleteCategoryController = async (req, res) => {
  try {
    // ✅ Check logged-in user
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized user detected.",
      });
    }

    // ✅ Get categoryId and ensure it's a number
    const categoryId = Number(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid category ID.",
      });
    }

    console.log("Deleting category ID:", categoryId);

    // ✅ Check if category exists
    const existingCategory = await pool.query(
      `SELECT * FROM category WHERE category_id = $1`,
      [categoryId],
    );

    if (existingCategory.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Category not found.",
      });
    }

    // ✅ Delete category
    await pool.query(`DELETE FROM category WHERE category_id = $1`, [
      categoryId,
    ]);

    return res.status(200).send({
      success: true,
      message: `Category with ID ${categoryId} deleted successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Category API.",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
