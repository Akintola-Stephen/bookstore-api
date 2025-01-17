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

// Get all categories
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
};

// Get a specific category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    await category.deleteOne();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
};