import { FiShoppingCart, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';
import Button from '@/components/Button';

export default function CartPage() {
  // Sample cart items data
  const cartItems = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      quantity: 1,
      image: '/images/fashion-product2.jpg',
      stock: 10
    },
    {
      id: '2',
      name: 'Smartphone',
      price: 899.99,
      quantity: 2,
      image: '/images/cat-1.jpg',
      stock: 5
    },
    {
      id: '3',
      name: 'Backpack',
      price: 49.99,
      quantity: 1,
      image: '/images/cat-5.jpg',
      stock: 15
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Head>
        <title>Shopping Cart | Your E-Shop</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiShoppingCart className="mr-2" />
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4">Start shopping to add items to your cart</p>
            <Link href="/products" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Products list */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 border-b flex flex-col md:grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-5 flex items-center">
                      <Button className="text-red-500 hover:text-red-700 ml-4">
                        <FiTrash2 />
                      </Button>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">In stock: {item.stock}</p>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-center">
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                    </div>

                    <div className="md:col-span-3 flex items-center justify-center">
                      <div className="flex items-center border rounded-lg">
                        <Button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                          <FiMinus />
                        </Button>
                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                        <Button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                          <FiPlus />
                        </Button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-center">
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between">
                <Link href="/products" className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                  ← Continue Shopping
                </Link>
                <Button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700
                 hover:bg-gray-500 hover:text-white">
                  Update Cart
                </Button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Discount Code</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Enter code" 
                      className="flex-1 border rounded-l-lg rounded-r-none px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Button className="bg-gray-200 px-4 py-2 rounded-r-lg rounded-l-none hover:bg-gray-300">
                      Apply
                    </Button>
                  </div>
                </div>

                <Button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Proceed to Checkout
                </Button>

              

                <div className="mt-4 text-sm text-gray-500">
                  <p>By clicking "Proceed to Checkout", you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}