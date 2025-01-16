import { Request, Response } from "express";
import Book, { IBook } from "../models/bookModel";
import Author from "../models/authorModel";
import Category from "../models/categoryModel";

// Create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, category, publicationYear, isbn } = req.body;

        // Validation to check if the author and category exist
        const foundAuthor = await Author.findById(author);
        const foundCategory = await Category.findById(category);

        if (!foundAuthor || !foundCategory) {
            res.status(404).json({ message: "Author or Category not found" });
            return;
        }

        const newBook: IBook = new Book({
            title,
            author,
            category,
            publicationYear,
            isbn,
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};