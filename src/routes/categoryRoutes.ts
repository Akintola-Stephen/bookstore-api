import express from "express";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController";

const router = express.Router();

// Route for creating a new category
router.post("/", createCategory);

// Route for getting all categories
router.get("/", getCategories);

// Route for getting a single category by ID
router.get("/:id", getCategoryById);

// Route for updating a category
router.put("/:id", updateCategory);

// Route for deleting a category
router.delete("/:id", deleteCategory);

export default router;
