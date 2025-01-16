import { Request, Response } from "express";
import Author, { IAuthor } from "../models/authorModel";

// Create a new author
export const createAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, bio, dateOfBirth } = req.body;
        const newAuthor: IAuthor = new Author({ name, bio, dateOfBirth });
        await newAuthor.save();
        res.status(201).json({ newAuthor });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// Get all authors
export const getAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// Get a specific author by ID
export const getAuthorById = async (req: Request, res: Response): Promise<void> => {
    try {
        const author = await Author.findById(req.params.id);

        if (!author) {
            res.status(404).json({ message: "Author not found" });
            return;
        }

        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// Update an author
export const updateAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, bio, dateOfBirth } = req.body;

        const author = await Author.findById(req.params.id);
        if (!author) {
            res.status(404).json({ message: "Author not found" });
            return;
        }

        author.name = name || author.name;
        author.bio = bio || author.bio;
        author.dateOfBirth = dateOfBirth || author.dateOfBirth;

        await author.save();
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};

// Delete an author
export const deleteAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            res.status(404).json({ message: "Author not found" });
            return;
        }

        await author.deleteOne();
        res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};