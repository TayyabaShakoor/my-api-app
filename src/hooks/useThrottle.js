// src/hooks/useThrottle.js
import { useRef, useCallback } from 'react';

/**
 * Custom hook that throttles a function
 * Prevents function from being called too frequently
 * 
 * @param {Function} fn - Function to throttle
 * @param {number} delay - Throttle delay in milliseconds
 * @returns {Function} Throttled function
 */
export const useThrottle = (fn, delay = 500) => {
  const lastCall = useRef(0);

  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        return fn(...args);
      }
    },
    [fn, delay]
  );
};