import { useState, useEffect } from 'react';

interface PaymentSuccessData {
  reference?: string;
  orderId?: string;
  status: 'verifying' | 'completed' | 'pending' | 'failed' | 'error';
  orderDetails?: any;
}

export const usePaymentSuccess = (reference?: string, orderId?: string) => {
  const [data, setData] = useState<PaymentSuccessData>({
    reference,
    orderId,
    status: 'verifying'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get status from URL parameters (set by backend redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const urlStatus = urlParams.get('status');
    
    if (urlStatus === 'success') {
      console.log('Payment completed successfully (backend redirect)');
      setData(prev => ({ ...prev, status: 'completed' }));
      setIsLoading(false);
    } else if (urlStatus === 'failed') {
      console.log('Payment failed (backend redirect)');
      setData(prev => ({ ...prev, status: 'failed' }));
      setIsLoading(false);
    } else if (urlStatus === 'error') {
      console.log('Payment error (backend redirect)');
      setData(prev => ({ ...prev, status: 'error' }));
      setIsLoading(false);
    } else {
      // If no status in URL, assume it's still verifying
      console.log('No status in URL, assuming verification in progress');
      setData(prev => ({ ...prev, status: 'verifying' }));
      setIsLoading(true);
    }
  }, []);

  const refreshStatus = async () => {
    // No manual refresh needed since backend handles everything
    console.log('Backend handles payment verification, no manual refresh needed');
  };

  return {
    ...data,
    isLoading,
    refreshStatus
  };
};
