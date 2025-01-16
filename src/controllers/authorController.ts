import { Request, Response } from "express";
import Author, { IAuthor } from "../models/authorModel";

// Create a new author
export const createAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, bio, dateOfBirth } = req.body;
        const newAuthor: IAuthor = new Author({ name, bio, dateOfBirth });
        await newAuthor.save();
        res.status(201).json({newAuthor});
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: (error as Error).message });
    }
};