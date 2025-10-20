import { API_BASE_URL, API_ENDPOINTS, getHeaders } from './config';
import type { OrderData, OrderResponse, DiscountValidationResponse, OrderStatusResponse } from './config';

// Generic API request handler
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('Making API request to:', url);
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });

  const responseText = await response.text();
  console.log('API response status:', response.status);
  console.log('API response text:', responseText);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  let data;
  try {
    data = JSON.parse(responseText);
  } catch (parseError) {
    console.error('Failed to parse API response as JSON:', parseError);
    console.error('Response was:', responseText);
    throw new Error('Invalid JSON response from server');
  }

  return data;
};

// Verify discount code
export const verifyDiscountCode = async (code: string): Promise<boolean> => {
  try {
    // Use the new endpoint format: /discounts/validate/:id
    const url = API_ENDPOINTS.DISCOUNT_CHECK.replace(':id', code);
    console.log('Verifying discount code with URL:', url);
    console.log('Discount code:', code);

    const response = await apiRequest<DiscountValidationResponse>(url, {
      method: 'GET',
    });

    console.log('Discount verification response:', response);
    return response.success;
  } catch (error) {
    console.error('Error verifying discount code:', error);
    return false;
  }
};

// Create order
export const createOrder = async (orderData: OrderData): Promise<OrderResponse> => {
  try {
    console.log('Creating order with data:', orderData);
    
    const response = await apiRequest<OrderResponse>(API_ENDPOINTS.ORDERS, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });

    console.log('Order creation response:', response);
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Check payment status
export const checkPaymentStatus = async (reference: string) => {
  try {
    // Use GET /payments/callback with query parameters
    const url = `${API_ENDPOINTS.PAYMENT_STATUS}?reference=${reference}`;
    console.log('Checking payment status with URL:', url);
    console.log('Full API URL:', `${API_BASE_URL}${url}`);

    const response = await apiRequest<OrderStatusResponse>(url);

    console.log('Payment status response:', response);
    return response.data?.status || 'unknown';
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
};
