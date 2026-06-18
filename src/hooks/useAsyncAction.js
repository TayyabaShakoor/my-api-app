// src/hooks/useAsyncAction.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for handling async actions with loading state
 * Prevents multiple simultaneous submissions
 * 
 * @param {Function} asyncFn - The async function to execute
 * @returns {Object} { execute, isLoading, error }
 */
export const useAsyncAction = (asyncFn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      // Prevent multiple simultaneous executions
      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFn(...args);
        return result;
      } catch (err) {
        setError(err.message || 'Something went wrong');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn, isLoading]
  );

  return { execute, isLoading, error };
};