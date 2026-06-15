// src/hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/api';

// Custom hook for fetching products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],  // Unique key for caching
    queryFn: fetchProducts,   // The function that fetches data
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes (optional)
  });
};