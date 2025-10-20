import { useState, useEffect, useRef } from 'react';
import { useOrder } from './useOrder';

interface PaymentSuccessData {
  reference?: string;
  orderId?: string;
  status: 'verifying' | 'completed' | 'pending' | 'failed' | 'error';
  orderDetails?: any;
}

export const usePaymentSuccess = (reference?: string, orderId?: string) => {
  const { getPaymentStatus } = useOrder();
  const [data, setData] = useState<PaymentSuccessData>({
    reference,
    orderId,
    status: 'verifying'
  });
  const [isLoading, setIsLoading] = useState(true);
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    // Skip entirely if no reference (backend redirects)
    if (!reference) {
      console.log('usePaymentSuccess: No reference provided, skipping hook entirely');
      setIsLoading(false);
      return;
    }

    const verifyPayment = async () => {
      console.log('usePaymentSuccess: verifyPayment called', { reference, hasVerified: hasVerifiedRef.current });

      // Check if this is a discount order (URL has status=success)
      const urlParams = new URLSearchParams(window.location.search);
      const urlStatus = urlParams.get('status');
      
      if (urlStatus === 'success') {
        console.log('Discount order detected, skipping payment verification');
        setData(prev => ({ ...prev, status: 'completed' }));
        setIsLoading(false);
        hasVerifiedRef.current = true;
        return;
      }

      // Only verify once for payment orders
      if (hasVerifiedRef.current) {
        console.log('Payment already verified, skipping');
        return;
      }

      try {
        setIsLoading(true);
        
        // Add a small delay to ensure payment processing is complete
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Call the backend to verify payment and send emails
        console.log('Calling backend to verify payment and send emails');
        const status = await getPaymentStatus(reference);
        
        setData(prev => ({
          ...prev,
          status: status as PaymentSuccessData['status']
        }));

        // If payment is completed, you could fetch additional order details here
        if (status === 'completed') {
          console.log('Payment verified successfully via backend callback');
        }
        
        hasVerifiedRef.current = true;
      } catch (error) {
        console.error('Error verifying payment:', error);
        setData(prev => ({ ...prev, status: 'error' }));
        hasVerifiedRef.current = true;
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [reference, getPaymentStatus]);

  const refreshStatus = async () => {
    if (reference && !hasVerifiedRef.current) {
      setIsLoading(true);
      try {
        console.log('Manual refresh: calling backend to verify payment');
        const status = await getPaymentStatus(reference);
        setData(prev => ({
          ...prev,
          status: status as PaymentSuccessData['status']
        }));
        hasVerifiedRef.current = true;
      } catch (error) {
        console.error('Error refreshing payment status:', error);
        setData(prev => ({ ...prev, status: 'error' }));
        hasVerifiedRef.current = true;
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Refresh requested, but payment already verified or no reference');
    }
  };

  return {
    ...data,
    isLoading,
    refreshStatus
  };
};
