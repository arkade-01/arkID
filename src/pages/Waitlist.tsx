import { useState } from "react";
import { motion } from "framer-motion";
import { useDiscount, useOrder } from "../hooks";
import type { OrderData } from "../api/config";

const Waitlist = () => {
  const [paymentMethod, setPaymentMethod] = useState<'arkpay' | 'card'>('card');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country: '',
    state: '',
    zipcode: '',
    linktree: '',
    email: '',
    phone: '',
    discountCode: ''
  });
  
  const [discountApplied, setDiscountApplied] = useState(false);
  const discountAmount = 30000; // Full discount amount

  // Custom hooks
  const { applyDiscount, isLoading: discountLoading, error: discountError } = useDiscount();
  const { submitOrder, isLoading: orderLoading, error: orderError } = useOrder();

  // Combined loading and error states
  const isLoading = discountLoading || orderLoading;
  const error = discountError || orderError;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: 'arkpay' | 'card') => {
    setPaymentMethod(method);
  };

  const handleApplyDiscount = async () => {
    if (!formData.discountCode) return;
    
    const isValid = await applyDiscount(formData.discountCode);
    
    if (isValid) {
      setDiscountApplied(true);
      console.log('Discount applied:', formData.discountCode);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.address || !formData.country || !formData.state || !formData.zipcode || !formData.email || !formData.phone) {
      return;
    }
    
    // Only process card payments for now
    if (paymentMethod === 'card') {
      const orderData: OrderData = {
        name: formData.name,
        cardLink: formData.linktree || 'https://example.com/card', // Use linktree as card link or default
        phone: formData.phone,
        address: formData.address,
        city: formData.state, // Using state as city for now
        state: formData.state,
        currency: 'NGN', // Nigerian Naira
        email: formData.email,
        amount: discountApplied ? 0 : discountAmount, // 0 if discount applied, otherwise full amount
        discountCode: discountApplied ? formData.discountCode : undefined
      };
      
      const result = await submitOrder(orderData);
      
      if (result?.success) {
        if (result.completed) {
          // Order completed with discount - redirect to callback page with success status
          const callbackUrl = `/payment/callback?status=success&reference=${result.order?.reference || 'discount'}&order=${result.order?._id || 'completed'}`;
          window.location.href = callbackUrl;
        } else if (result.paymentUrl) {
          // Redirect to payment
          window.location.href = result.paymentUrl;
        }
      }
    } else {
      // ArkPay integration - placeholder for now
      console.log('ArkPay integration is coming soon');
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 font-custom">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8">
              {/* Shipping & Personal Information */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-xl font-bold text-black">Shipping & Personal Information</h2>
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name to appear on your card"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="relative">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-base"
                      >
                        <option value="">Country</option>
                        <option value="NG">Nigeria</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        name="zipcode"
                        placeholder="Zipcode"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <input
                      type="url"
                      name="linktree"
                      placeholder="Enter your linktree link (if available)"
                      value={formData.linktree}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                  </div>
                  
                  {/* Email and Phone on single line */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-xl font-bold text-black">Payment Information</h2>
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                
                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 sm:flex gap-2">
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('arkpay')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all text-base ${
                      paymentMethod === 'arkpay' 
                        ? 'bg-black text-white border-black' 
                        : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <img 
                      src="/Screenshot 2025-08-26 101826 1.png" 
                      alt="ArkPay logo" 
                      className="h-5 w-auto"
                    />
                    <span>ArkPay (Pay with crypto)</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('card')}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all text-base ${
                      paymentMethod === 'card' 
                        ? 'bg-black text-white border-black' 
                        : 'bg-gray-100 text-black border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <img 
                        src="/ri_visa-line.png" 
                        alt="Visa logo" 
                        className="h-4 w-auto"
                      />
                      <img 
                        src="/logos_mastercard.png" 
                        alt="Mastercard logo" 
                        className="h-4 w-auto"
                      />
                    </div>
                    <span>Card</span>
                  </button>
                </div>
              </div>

            </form>
          </div>

          {/* Mobile: Product Display First */}
          <div className="lg:hidden order-1">
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              {/* Product Display */}
              <div className="mb-6">
                <motion.div
                  initial={{ rotate: -5 }}
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-4 transform"
                >
                  <img
                    src="/Bigshot-Card-front-five.svg"
                    alt="Bigshot ArkCard"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </motion.div>
                
                <h3 className="text-xl font-bold text-black mb-2">ArkCard</h3>
                <div className="flex items-center gap-3">
                  <p className={`text-2xl font-bold ${discountApplied ? 'text-gray-400 line-through' : 'text-black'}`}>
                    ₦ {discountAmount.toLocaleString()}.00
                  </p>
                  {discountApplied && (
                    <p className="text-2xl font-bold text-black">
                      ₦ 0.00
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Checkout Section After Form */}
          <div className="lg:hidden order-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              {/* Line Separator */}
              <hr className="border-gray-200 mb-6" />
              
              {/* Discount Code */}
              <div className="mb-6">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="discountCode"
                    placeholder="Discount code"
                    value={formData.discountCode}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    disabled={!formData.discountCode || discountApplied || isLoading}
                    className="px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-base"
                  >
                    {isLoading ? 'Verifying...' : discountApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className={`font-semibold ${discountApplied ? 'text-gray-400 line-through' : ''}`}>
                      ₦ {discountAmount.toLocaleString()}.00
                    </span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between">
                      <span className="text-green-600">Discount Applied</span>
                      <span className="font-semibold text-green-600">-₦ {discountAmount.toLocaleString()}.00</span>
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-semibold">
                      ₦ {discountApplied ? '0.00' : `${discountAmount.toLocaleString()}.00`}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Error Display */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              {/* Pay Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Processing...' : 'Pay'}
              </button>
            </div>
          </div>

          {/* Desktop: Right Column - Product & Order Summary */}
          <div className="hidden lg:block lg:col-span-1 lg:order-2">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
              {/* Product Display */}
              <div className="mb-6">
                <motion.div
                  initial={{ rotate: -5 }}
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-4 transform"
                >
                  <img
                    src="/Bigshot-Card-front-five.svg"
                    alt="Bigshot ArkCard"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </motion.div>
                
                <h3 className="text-xl font-bold text-black mb-2">ArkCard</h3>
                <div className="flex items-center gap-3">
                  <p className={`text-2xl font-bold ${discountApplied ? 'text-gray-400 line-through' : 'text-black'}`}>
                    ₦ {discountAmount.toLocaleString()}.00
                  </p>
                  {discountApplied && (
                    <p className="text-2xl font-bold text-black">
                      ₦ 0.00
                    </p>
                  )}
                </div>
              </div>
              
              {/* Discount Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="discountCode"
                    placeholder="Discount code"
                    value={formData.discountCode}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    disabled={!formData.discountCode || discountApplied || isLoading}
                    className="px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap text-base"
                  >
                    {isLoading ? 'Verifying...' : discountApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className={`font-semibold ${discountApplied ? 'text-gray-400 line-through' : ''}`}>
                      ₦ {discountAmount.toLocaleString()}.00
                    </span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between">
                      <span className="text-green-600">Discount Applied</span>
                      <span className="font-semibold text-green-600">-₦ {discountAmount.toLocaleString()}.00</span>
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-semibold">
                      ₦ {discountApplied ? '0.00' : `${discountAmount.toLocaleString()}.00`}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Error Display */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              {/* Pay Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Processing...' : 'Pay'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;