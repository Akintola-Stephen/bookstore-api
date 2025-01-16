import { Request, Response } from "express";
import Book, { IBook } from "../models/bookModel";
import Author from "../models/authorModel";
import Category from "../models/categoryModel";
import { paginationHelper } from "../utils/paginationHelper";


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



// Get a specific book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findById(req.params.id).populate("author category");

        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// Update a book
export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, author, category, publicationYear, isbn } = req.body;

        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.category = category || book.category;
        book.publicationYear = publicationYear || book.publicationYear;
        book.isbn = isbn || book.isbn;

        await book.save();

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page, limit, sort, filter } = req.query;
        const query = filter ? JSON.parse(filter as string) : {};
        const books = paginationHelper(Book.find(query).populate("author category"), page, limit, sort);
        res.status(200).json(
            { message: "Books fetched successfully", data: books }
        );
    } catch (error) {
        res.status(500).json(
            { message: "Error fetching books", error: (error as Error).message }
        );
    }
};