import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../entities/category.entity';  // Import Category entity

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();  // Fetch all categories
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const categoryRepository = getRepository(Category);
    const category = new Category();
    category.title = title;

    await categoryRepository.save(category);  // Save new category to the database
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};
