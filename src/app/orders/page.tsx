'use client';
import { useState } from 'react';
import { 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiClock, 
  FiXCircle,
  FiChevronRight,
  FiShoppingBag,
  FiInfo
} from 'react-icons/fi';

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  // Sample orders data with more realistic details
  const orders = [
    {
      id: 'ORD-78945',
      date: '2023-05-15',
      status: 'delivered',
      items: [
        { 
          name: 'Wireless Noise-Cancelling Headphones', 
          quantity: 1, 
          price: 99.99,
          image: '/images/headphones.jpg'
        },
        { 
          name: 'Premium Phone Case', 
          quantity: 2, 
          price: 19.99,
          image: '/images/phone-case.jpg'
        }
      ],
      total: 139.97,
      shipping: 5.99,
      discount: 10.00,
      subtotal: 134.96,
      trackingNumber: 'TRK-78945612',
      deliveryDate: '2023-05-20',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: 'ORD-78123',
      date: '2023-06-02',
      status: 'shipped',
      items: [
        { 
          name: 'Smart Watch Pro', 
          quantity: 1, 
          price: 199.99,
          image: '/images/smart-watch.jpg'
        }
      ],
      total: 199.99,
      shipping: 0.00,
      discount: 0.00,
      subtotal: 199.99,
      trackingNumber: 'TRK-78123345',
      estimatedDelivery: '2023-06-10',
      carrier: 'FedEx',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-77654',
      date: '2023-06-15',
      status: 'processing',
      items: [
        { 
          name: 'Bluetooth Speaker', 
          quantity: 1, 
          price: 79.99,
          image: '/images/speaker.jpg'
        },
        { 
          name: 'USB-C Fast Charging Cable', 
          quantity: 3, 
          price: 9.99,
          image: '/images/usb-cable.jpg'
        }
      ],
      total: 109.96,
      shipping: 0.00,
      discount: 5.00,
      subtotal: 104.96,
      paymentMethod: 'Mastercard •••• 5555'
    },
    {
      id: 'ORD-76543',
      date: '2023-04-28',
      status: 'cancelled',
      items: [
        { 
          name: 'Laptop Backpack', 
          quantity: 1, 
          price: 49.99,
          image: '/images/backpack.jpg'
        }
      ],
      total: 49.99,
      shipping: 4.99,
      discount: 0.00,
      subtotal: 54.98,
      cancellationReason: 'Changed my mind',
      paymentMethod: 'Apple Pay'
    }
  ];

  // Filter orders based on status
  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  // Get status details
  const getStatusDetails = (status) => {
    const statusMap = {
      delivered: {
        icon: <FiCheckCircle className="text-lg" />,
        color: 'text-green-600',
        bg: 'bg-green-100',
        text: 'Delivered',
        action: 'Buy Again'
      },
      shipped: {
        icon: <FiTruck className="text-lg" />,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        text: 'Shipped',
        action: 'Track Order'
      },
      processing: {
        icon: <FiClock className="text-lg" />,
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        text: 'Processing',
        action: 'View Details'
      },
      cancelled: {
        icon: <FiXCircle className="text-lg" />,
        color: 'text-red-600',
        bg: 'bg-red-100',
        text: 'Cancelled',
        action: 'Reorder'
      }
    };
    
    return statusMap[status] || {
      icon: <FiPackage className="text-lg" />,
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      text: 'Unknown',
      action: 'View'
    };
  };

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">
            View and manage your recent orders
          </p>
        </div>
        
        {/* Order filters - Horizontal scroll for mobile */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((filter) => {
              const isActive = activeFilter === filter;
              const statusDetails = getStatusDetails(filter);
              
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive 
                      ? `${statusDetails.bg} ${statusDetails.color}`
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {filter === 'all' ? 'All Orders' : statusDetails.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusDetails = getStatusDetails(order.status);
              const isExpanded = expandedOrder === order.id;
              
              return (
                <div 
                  key={order.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Order summary */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full ${statusDetails.bg} flex items-center justify-center ${statusDetails.color} mr-4`}>
                          {statusDetails.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${statusDetails.color}`}>
                          {statusDetails.text}
                        </span>
                        <FiChevronRight 
                          className={`ml-2 text-gray-400 transition-transform ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded order details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-4">
                      {/* Order items */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">ITEMS ORDERED</h4>
                        <div className="space-y-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <div className="flex">
                                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                                  {item.image && (
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Order summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">SHIPPING INFORMATION</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            {order.status === 'delivered' && (
                              <p className="text-sm">
                                <span className="font-medium">Delivered on:</span> {' '}
                                {new Date(order.deliveryDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            )}
                            {order.status === 'shipped' && (
                              <>
                                <p className="text-sm">
                                  <span className="font-medium">Carrier:</span> {order.carrier}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Tracking #:</span> {order.trackingNumber}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Estimated delivery:</span> {' '}
                                  {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </p>
                              </>
                            )}
                            {order.status === 'processing' && (
                              <p className="text-sm">
                                Your order is being prepared for shipment. We'll notify you when it ships.
                              </p>
                            )}
                            {order.status === 'cancelled' && (
                              <p className="text-sm">
                                <span className="font-medium">Cancellation reason:</span> {order.cancellationReason}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">PAYMENT INFORMATION</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm">
                              <span className="font-medium">Payment method:</span> {order.paymentMethod}
                            </p>
                            <div className="mt-3 space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                              </div>
                              {order.discount > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Discount:</span>
                                  <span className="text-green-600">-${order.discount.toFixed(2)}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-sm">
                                <span>Shipping:</span>
                                <span>
                                  {order.shipping > 0 
                                    ? `$${order.shipping.toFixed(2)}` 
                                    : 'Free'}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm font-medium mt-2 pt-2 border-t border-gray-200">
                                <span>Total:</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order actions */}
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition">
                          View Invoice
                        </button>
                        {order.status === 'shipped' && (
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">
                            Track Package
                          </button>
                        )}
                        {(order.status === 'delivered' || order.status === 'cancelled') && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition">
                            {statusDetails.action}
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition">
                          Contact Support
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
              <FiShoppingBag className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeFilter !== 'all' ? activeFilter : ''} orders found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {activeFilter === 'all'
                  ? "You haven't placed any orders yet."
                  : `You don't have any ${activeFilter} orders at this time.`}
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}