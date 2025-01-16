import { Request, Response } from "express";
import Category, { ICategory } from "../models/categoryModel";

// Create a new category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const newCategory: ICategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
};