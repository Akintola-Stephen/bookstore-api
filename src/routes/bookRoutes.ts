import express from "express";
import {
    createBook,
    getBookById,
    updateBook,
    deleteBook,
} from "../controllers/bookController";

import { validateRequest } from "../middlewares/validateRequest";
import { createBookSchema, updateBookSchema } from "../validation/bookValidation";

const router = express.Router();

// Route for creating a new book
router.post("/", validateRequest(createBookSchema), createBook);


// Route for getting a single book by ID
router.get("/:id", getBookById);

// Route for updating a book
router.put("/:id", updateBook);

// Route for deleting a book
router.delete("/:id", deleteBook);


export default router;
