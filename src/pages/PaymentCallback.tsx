import { motion } from 'framer-motion';
import { usePaymentSuccess } from '../hooks';

const PaymentCallback = () => {
  // Get all parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const reference = urlParams.get('reference') || undefined;
  const orderId = urlParams.get('order') || undefined;
  const status = urlParams.get('status') || 'verifying'; // success, failed, error
  const message = urlParams.get('message') || undefined;
  
  // Always use the hook for verification
  const { status: paymentStatus, isLoading, refreshStatus } = usePaymentSuccess(reference, orderId);

  const getStatusInfo = () => {
    // If URL has explicit status, use that
    if (status === 'success') {
      return {
        title: 'Payment Successful!',
        message: 'Your order has been confirmed and payment processed successfully.',
        icon: '✅',
        color: 'text-green-600',
        showEmailMessage: true
      };
    }
    
    if (status === 'failed') {
      return {
        title: 'Payment Failed',
        message: 'There was an issue processing your payment. Please try again.',
        icon: '❌',
        color: 'text-red-600',
        showEmailMessage: false
      };
    }
    
    if (status === 'error') {
      return {
        title: 'Payment Error',
        message: message || 'An unexpected error occurred while processing your payment.',
        icon: '⚠️',
        color: 'text-orange-600',
        showEmailMessage: false
      };
    }

    // If no explicit status, use background verification result
    switch (paymentStatus) {
      case 'completed':
        return {
          title: 'Payment Successful!',
          message: 'Your order has been confirmed and payment processed successfully.',
          icon: '✅',
          color: 'text-green-600',
          showEmailMessage: true
        };
      case 'pending':
        return {
          title: 'Payment Pending',
          message: 'Your payment is being processed. Please wait a moment.',
          icon: '⏳',
          color: 'text-yellow-600',
          showEmailMessage: false
        };
      case 'failed':
        return {
          title: 'Payment Failed',
          message: 'There was an issue processing your payment. Please try again.',
          icon: '❌',
          color: 'text-red-600',
          showEmailMessage: false
        };
      case 'error':
        return {
          title: 'Verification Error',
          message: 'Unable to verify payment status. Please contact support.',
          icon: '⚠️',
          color: 'text-red-600',
          showEmailMessage: false
        };
      default:
        return {
          title: 'Verifying Payment...',
          message: 'Please wait while we confirm your payment.',
          icon: '🔄',
          color: 'text-blue-600',
          showEmailMessage: false
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center"
      >
        {/* Status Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {statusInfo.icon}
        </motion.div>

        {/* Status Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl font-bold mb-4 ${statusInfo.color}`}
        >
          {statusInfo.title}
        </motion.h1>

        {/* Status Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          {statusInfo.message}
        </motion.p>

        {/* Email Confirmation Message */}
        {statusInfo.showEmailMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold text-green-800">Check Your Email</span>
            </div>
            <p className="text-green-700 text-sm">
              We've sent a confirmation email with your order details. Please check your inbox and spam folder.
            </p>
          </motion.div>
        )}

        {/* Order Reference */}
        {reference && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-lg p-4 mb-6"
          >
            <p className="text-sm text-gray-600 mb-1">Order Reference</p>
            <p className="font-mono text-sm font-semibold text-gray-800">{reference}</p>
          </motion.div>
        )}

        {/* Loading Spinner */}
        {isLoading && status === 'verifying' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Verifying payment...</span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          {statusInfo.title === 'Payment Successful!' && (
            <>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => window.print()}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Print Receipt
              </button>
            </>
          )}
          
          {statusInfo.title === 'Payment Failed' && (
            <>
              <button
                onClick={() => window.location.href = '/waitlist'}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Go Home
              </button>
            </>
          )}
          
          {statusInfo.title === 'Payment Error' && (
            <>
              <button
                onClick={() => window.location.href = '/waitlist'}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Go Home
              </button>
            </>
          )}
          
          {statusInfo.title === 'Payment Pending' && (
            <button
              onClick={refreshStatus}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Checking...' : 'Refresh Status'}
            </button>
          )}
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 pt-4 border-t border-gray-200"
        >
          <p className="text-xs text-gray-500">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@arkid.com" className="text-blue-600 hover:underline">
              support@arkid.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentCallback;

