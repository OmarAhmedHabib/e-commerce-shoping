'use client';
import { useState } from 'react';
import { FiCreditCard, FiTruck, FiCheckCircle, FiChevronRight, FiLock } from 'react-icons/fi';

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState('shipping');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const cartItems = [
    { id: 1, name: 'Running Shoes', price: 199, quantity: 1, image: '/shoe.jpg' },
    { id: 2, name: 'Men\'s Shirt', price: 129, quantity: 2, image: '/shirt.jpg' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 25;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
        
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center ${activeTab === 'shipping' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'shipping' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              <span>1</span>
            </div>
            <span className="ml-2">Shipping</span>
          </div>
          
          <FiChevronRight className="text-gray-400 mx-2" />
          
          <div className={`flex items-center ${activeTab === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'payment' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              <span>2</span>
            </div>
            <span className="ml-2">Payment</span>
          </div>
          
          <FiChevronRight className="text-gray-400 mx-2" />
          
          <div className={`flex items-center ${activeTab === 'review' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'review' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              <span>3</span>
            </div>
            <span className="ml-2">Review</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left section - Checkout form */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              {activeTab === 'shipping' && (
                <>
                  <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Region</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select Region</option>
                          <option value="ny">New York</option>
                          <option value="ca">California</option>
                          <option value="tx">Texas</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        type="button" 
                        onClick={() => setActiveTab('payment')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </>
              )}
              
              {activeTab === 'payment' && (
                <>
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  <form>
                    <div className="space-y-4 mb-6">
                      <div 
                        className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'credit' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                        onClick={() => setPaymentMethod('credit')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${paymentMethod === 'credit' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}>
                            {paymentMethod === 'credit' && <FiCheckCircle className="text-white text-sm" />}
                          </div>
                          <FiCreditCard className="text-gray-600 mr-2" />
                          <span className="font-medium">Credit Card</span>
                        </div>
                        
                        {paymentMethod === 'credit' && (
                          <div className="mt-4 space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                              <input 
                                type="text" 
                                placeholder="1234 5678 9012 3456" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <input 
                                  type="text" 
                                  placeholder="MM/YY" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                <input 
                                  type="text" 
                                  placeholder="123" 
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                              <input 
                                type="text" 
                                placeholder="Name on card" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`border rounded-md p-4 cursor-pointer ${paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                        onClick={() => setPaymentMethod('cash')}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${paymentMethod === 'cash' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'}`}>
                            {paymentMethod === 'cash' && <FiCheckCircle className="text-white text-sm" />}
                          </div>
                          <FiTruck className="text-gray-600 mr-2" />
                          <span className="font-medium">Cash on Delivery</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        type="button" 
                        onClick={() => setActiveTab('shipping')}
                        className="text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                      >
                        Back
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setActiveTab('review')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </>
              )}
              
              {activeTab === 'review' && (
                <>
                  <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-800 mb-2">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>John Doe</p>
                        <p>123 Main Street, Apt 4B</p>
                        <p>New York, NY 10001</p>
                        <p>United States</p>
                        <p>+1 (555) 123-4567</p>
                        <p>john@example.com</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-800 mb-2">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        {paymentMethod === 'credit' ? (
                          <div className="flex items-center">
                            <FiCreditCard className="text-gray-600 mr-2" />
                            <span>Credit Card - **** **** **** 3456</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <FiTruck className="text-gray-600 mr-2" />
                            <span>Cash on Delivery</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-800 mb-2">Order Items</h3>
                      <div className="space-y-4">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <div className="w-16 h-16 bg-gray-200 rounded-md mr-3"></div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-medium">${item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-start mb-6">
                      <input 
                        type="checkbox" 
                        id="agreeTerms" 
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 mr-2"
                      />
                      <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        type="button" 
                        onClick={() => setActiveTab('payment')}
                        className="text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        disabled={!agreeTerms}
                        className={`px-6 py-2 rounded-md transition ${agreeTerms ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                      >
                        Place Order
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <FiLock className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">Your transactions are secure and encrypted</span>
            </div>
          </div>
          
          {/* Right section - Order summary */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t border-b border-gray-200 py-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (15%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Code</label>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300 transition">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}