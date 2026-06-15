// src/services/api.js
const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  
  // IMPORTANT: React Query needs errors to be THROWN, not just returned
  // This is the "Error Handling Mandate" from your assignment
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};

// Optional: Fetch single product by ID (for later use)
export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}: ${response.status}`);
  }
  return response.json();
};