import express from "express";
import {
    createAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
} from "../controllers/authorController";

import { validateRequest } from "../middlewares/validateRequest";
import {
    createAuthorSchema,
    updateAuthorSchema,
} from "../validation/authorValidation";

const router = express.Router();

// Route for creating a new author
router.post("/", validateRequest(createAuthorSchema), createAuthor);

// Route for getting all authors
router.get("/", getAuthors);

// Route for getting a single author by ID
router.get("/:id", getAuthorById);

// Route for updating an author
router.put("/:id", validateRequest(updateAuthorSchema), updateAuthor);

// Route for deleting an author
router.delete("/:id", deleteAuthor);


export default router;
