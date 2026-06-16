// src/schemas/productSchema.js
import { z } from 'zod';

export const productSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title cannot exceed 100 characters'),
  
  price: z.number()
    .positive('Price must be a positive number')
    .min(0.01, 'Price must be at least 0.01'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),
  
  category: z.string()
    .min(2, 'Category must be at least 2 characters'),
  
  // ✅ This makes image field optional
  image: z.string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')), // Also allows empty string
});