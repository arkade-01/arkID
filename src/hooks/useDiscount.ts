import { useState } from 'react';
import { verifyDiscountCode } from '../api/services';

export const useDiscount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyDiscount = async (code: string) => {
    if (!code) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const isValid = await verifyDiscountCode(code);
      
      if (!isValid) {
        setError('Invalid discount code');
        return false;
      }
      
      return true;
    } catch (error) {
      setError('Failed to verify discount code');
      console.error('Error applying discount:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    applyDiscount,
    isLoading,
    error,
    clearError,
  };
};

