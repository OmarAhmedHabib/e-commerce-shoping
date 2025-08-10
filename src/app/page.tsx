import { FiArrowRight, FiTruck, FiRefreshCw, FiShield, FiStar, FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/ProductCard";
import Navbar from "@/components/navbar";
import Button from '@/components/Button';

const mockProducts = [
   {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "/images/download.jpeg",
    category: "Electronics",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: ['black', 'silver'],
    badge: "Bestseller"
  },
  {
    id: "2",
  name: "Smart Watch Pro",
    price: 199.99,
    image: "/images/images (1).jpeg",
    category: "Electronics",
    rating: 4.5,
    reviews: 89,
    colors: ['black', 'rose gold'],
    badge: "Limited Edition"
  },
  {
    id: "3",
  name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "/images/images (2).jpeg",
    category: "Clothing",
    rating: 4.2,
    reviews: 56,
    isNew: true,
    colors: ['white', 'black', 'gray']
  },
  {
    id: "4",
    name: "Running Shoes",
    price: 89.99,
    image: "/images/download (1).jpeg",
    category: "Footwear",
    rating: 4.7,
    reviews: 203,
    colors: ['blue', 'black'],
    badge: "Trending"
  },
];


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      <Navbar />

      <main className="mx-auto overflow-hidden">
        {/* Hero Section - معدل للهاتف */}
        <section className="relative h-auto min-h-screen py-20 flex items-center justify-center overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 animate-gradient-shift"></div>
          <div className="absolute inset-0 bg-[url('/images/dot-pattern.png')] opacity-10"></div>
          
          <div className="container relative z-10 px-4">
            <div className="max-w-2xl text-center md:text-left">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium tracking-wider text-white uppercase bg-white/20 rounded-full backdrop-blur-sm">
                New Collection 2025
              </span>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Redefine</span> Your Shopping
              </h1>
              <p className="text-lg md:text-2xl text-white/90 mb-8">
                Discover premium products for your lifestyle
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                href="/products" 
                  className="px-6 py-3 md:px-8 md:py-4 bg-white text-indigo-900 hover:bg-gray-100 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                >
                  <FiShoppingBag className="transition-transform group-hover:scale-110" /> 
                  Shop Now
                </Link>
                <div>

                <Link 
                 href="/Explore" 
                 className="px-6 py-3 md:px-8 md:py-4 border-2 border-white text-white hover:bg-white/10 rounded-full font-bold text-base md:text-lg transition-all flex items-center justify-center gap-3 group">
                Explore <FiChevronRight className="transition-transform group-hover:translate-x-1" />
                </Link>
                  </div>
              </div>
            </div>
          </div>
          
          {/* Floating product image - مخفي على الهاتف */}
          <div className="hidden md:block absolute right-10 bottom-10 w-[400px] h-[400px] rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-full bg-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="w-[200px] h-[200px] rounded-full bg-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <img 
                  src="/images/images (3).jpeg" 
                  alt="Featured Product" 
                  className="w-full h-full object-contain animate-float rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Floating Categories - معدل للهاتف */}
        <div className="container mx-auto px-4 md:-mt-20 relative z-20">
          <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-4">
            {['Electronics', 'Clothing', 'Home', 'Accessories'].map((category, index) => (
              <Link 
                href={`/products?category=${category.toLowerCase()}`}
                key={index} 
                className="group relative overflow-hidden bg-white dark:bg-gray-800 p-4 md:p-8 rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-20 md:h-20 mb-4 md:mb-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg md:rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <FiStar className="text-indigo-600 dark:text-indigo-300 text-xl md:text-3xl" />
                  </div>
                  <h3 className="text-center font-bold text-base md:text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {category}
                  </h3>
                  <p className="text-center text-gray-500 dark:text-gray-400 mt-1 md:mt-2 text-xs md:text-sm">
                    {index * 3 + 5} Collections
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      {/* Features Section */}
        <section className="py-16 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-20">
              <span className="inline-block px-3 py-1 md:px-4 md:py-2 mb-3 text-xs md:text-sm font-medium tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Elevate Your Shopping</h2>
              <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Quality products with exceptional service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: <FiTruck className="text-3xl md:text-4xl" />,
                  title: "Fast Delivery",
                  desc: "Get your order in 1-2 business days",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: <FiRefreshCw className="text-3xl md:text-4xl" />,
                  title: "Easy Returns",
                  desc: "30-day return policy",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: <FiShield className="text-3xl md:text-4xl" />,
                  title: "Secure Checkout",
                  desc: "Protected payment info",
                  color: "from-purple-500 to-purple-600"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden group bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-500"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.color} blur-md"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <div className={`w-16 h-16 md:w-20 md:h-20 mb-6 md:mb-8 rounded-lg md:rounded-xl bg-gradient-to-r ${feature.color} text-white flex items-center justify-center mx-auto`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-center mb-3 md:mb-4">{feature.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center flex-grow">{feature.desc}</p>
                    <div className="mt-4 md:mt-6 text-center">
                      <Button className="text-sm md:text-base text-indigo-600 dark:text-indigo-400 font-medium flex items-center justify-center mx-auto gap-2 group-hover:underline">
                        Learn more <FiChevronRight className="transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products - معدل للهاتف */}
        <section className="py-16 md:py-28 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16">
              <div className="mb-4 md:mb-0">
                <span className="inline-block px-3 py-1 md:px-4 md:py-2 mb-2 md:mb-3 text-xs md:text-sm font-medium tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300">
                  Curated Selection
                </span>
                <h2 className="text-3xl md:text-5xl font-bold">Featured Products</h2>
              </div>
              <Link 
                href="/products" 
                className="px-5 py-2.5 md:px-6 md:py-3 bg-white dark:bg-gray-800 border-2 border-indigo-600 rounded-full text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 group text-sm md:text-base"
              >
                View All <FiArrowRight className="inline transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mockProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard 
                    product={product} 
                    className="hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-0.5 md:px-3 md:py-1 bg-indigo-600 text-white text-xs font-bold rounded-full z-10">
                      {product.badge}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Testimonials - معدل للهاتف */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 md:mb-20">
            <span className="inline-block px-3 py-1 md:px-4 md:py-2 mb-3 text-xs md:text-sm font-medium tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300">
              Customer Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Customer Reviews</h2>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                quote: "The quality exceeded my expectations! Fast shipping and excellent service.",
                name: "Sarah Salah",
                role: "Fashion Blogger",
                image: "/images/testimonial-4.jpg"
              },
              {
                quote: "Never had such a seamless shopping experience. Products are top-notch!",
                name: "Ahmed khaled",
                role: "Tech Enthusiast",
                image: "/images/testimonial-2.jpg"
              },
              {
                quote: "Absolutely love my purchases! Quality is unmatched.",
                name: "Emily Rodriguez",
                role: "Interior Designer",
                image: "/images/three.jpg"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex mb-3 md:mb-4 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current text-sm md:text-base" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 md:mb-8 text-center italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 md:mr-4 overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={`Photo of ${testimonial.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        {/* Newsletter CTA - معدل للهاتف */}
        <section className="relative py-16 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 animate-gradient-shift"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Join Our Community</h2>
              <p className="text-base md:text-xl text-indigo-100 mb-8 md:mb-10">
                Get exclusive offers and 10% off your first order
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-3 md:px-6 md:py-4 rounded-full border-0 focus:ring-2 focus:ring-white text-gray-900 placeholder-gray-500 text-sm md:text-base"
                />
                <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-indigo-600 hover:bg-gray-100 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base">
                  Subscribe
                </button>
              </div>
              
              <p className="text-indigo-100/80 text-xs md:text-sm mt-4 md:mt-6">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}