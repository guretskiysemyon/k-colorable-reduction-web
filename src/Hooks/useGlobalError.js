// hooks/useGlobalError.js
import { useState } from 'react';

export const useGlobalError = () => {
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  return { error, setError, clearError };
};