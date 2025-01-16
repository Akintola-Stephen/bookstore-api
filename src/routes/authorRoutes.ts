import express from "express";
import {
    createAuthor,
} from "../controllers/authorController";

const router = express.Router();

// Route for creating a new author
router.post("/", createAuthor);


export default router;
