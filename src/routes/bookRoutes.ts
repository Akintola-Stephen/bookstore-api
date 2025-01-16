import express from "express";
import {
    createBook,
} from "../controllers/bookController";

const router = express.Router();

// Route for creating a new book
router.post("/", createBook);


export default router;
