// API Configuration
// Force production URL for now
export const API_BASE_URL = 'https://arkid-bk3nd.onrender.com/api';

// Debug log to check which URL is being used
console.log('API_BASE_URL:', API_BASE_URL);
console.log('import.meta.env.PROD:', import.meta.env.PROD);
console.log('import.meta.env.MODE:', import.meta.env.MODE);

// For testing - you can temporarily use localhost
// export const API_BASE_URL = 'http://localhost:3000/api';

// API Endpoints
export const API_ENDPOINTS = {
  ORDERS: '/orders',
  DISCOUNT_CHECK: '/discounts/validate/:id',
  PAYMENT_STATUS: '/payments/callback',
} as const;

// Request headers
export const getHeaders = () => ({
  'Content-Type': 'application/json',
});

// Order data types for frontend integration

export interface OrderData {
  name: string;
  cardLink: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  currency: string;
  email: string;
  amount: number; // Required amount field
  discountCode?: string; // Optional discount code
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    cardLink: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    currency: string;
    email: string;
    amount: number;
    transactionId: string;
    reference: string;
    status: 'pending' | 'completed' | 'failed';
    discount?: string;
    createdAt: string;
  };
  paymentUrl?: string; // Only present for payment orders
  reference?: string; // Only present for payment orders
}

export interface DiscountValidationResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    code: string;
    description: string;
    // Add other properties as needed
  };
}

export interface OrderStatusResponse {
  success: boolean;
  data: {
    status: 'pending' | 'completed' | 'failed';
    order: {
      _id: string;
      name: string;
      cardLink: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      country: string;
      currency: string;
      email: string;
      amount: number;
      transactionId: string;
      reference: string;
      status: 'pending' | 'completed' | 'failed';
      discount?: string;
      createdAt: string;
    };
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}

// Union type for all possible API responses
export type ApiResponse = OrderResponse | DiscountValidationResponse | OrderStatusResponse | ApiErrorResponse;
