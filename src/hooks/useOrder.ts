import { useState, useCallback } from 'react';
import { createOrder, checkPaymentStatus } from '../api/services';
import type { OrderData } from '../api/config';

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = useCallback(async (orderData: OrderData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await createOrder(orderData);
      
      if (result.success) {
        if (result.data.status === 'completed') {
          // Order completed with discount
          return { success: true, completed: true, order: result.data };
        } else {
          // Redirect to payment
          return { success: true, completed: false, paymentUrl: result.paymentUrl };
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process order';
      setError(errorMessage);
      console.error('Error submitting order:', error);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPaymentStatus = useCallback(async (reference: string) => {
    try {
      const status = await checkPaymentStatus(reference);
      return status;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return 'unknown';
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    submitOrder,
    getPaymentStatus,
    isLoading,
    error,
    clearError,
  };
};
