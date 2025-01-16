import express from "express";
import {
    createCategory
} from "../controllers/categoryController";

const router = express.Router();

// Route for creating a new category
router.post("/", createCategory);

export default router;
