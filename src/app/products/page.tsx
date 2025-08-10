'use client';

import { useState, useMemo } from 'react';
import { FiStar } from 'react-icons/fi';

export default function ProductList() {
  const [selectedFilters, setSelectedFilters] = useState({
    category: null as string | null,
    price: 500,
    rating: null as number | null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 299, rating: 4.5, category: 'Electronics', image: '/images/headphones.jpg' },
    { id: 2, name: 'Smart Watch', price: 199, rating: 4, category: 'Electronics', image: '/images/watch.jpg' },
    { id: 3, name: 'Running Shoes', price: 99, rating: 3.5, category: 'Sports', image: '/images/shoes.jpg' },
    { id: 4, name: 'Coffee Maker', price: 149, rating: 5, category: 'Home', image: '/images/coffee.jpg' },
  ];

  // ترتيب الفئات أبجدي
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))].sort();

  // فلترة المنتجات
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      return (
        (!selectedFilters.category || product.category === selectedFilters.category) &&
        (!selectedFilters.rating || product.rating >= selectedFilters.rating) &&
        product.price <= selectedFilters.price &&
        (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [products, selectedFilters, searchQuery]);

  // مسح الفلاتر
  const clearFilters = () => {
    setSelectedFilters({ category: null, price: 500, rating: null });
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* الفلاتر */}
      <aside className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block bg-white shadow rounded-lg p-4`}>
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* البحث */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* الفئة */}
        <div className="mb-4">
          <label className="font-medium">Category</label>
          <select
            className="w-full p-2 border rounded mt-2"
            value={selectedFilters.category || ''}
            onChange={(e) => setSelectedFilters(prev => ({ ...prev, category: e.target.value || null }))}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* السعر */}
        <div className="mb-4">
          <label className="font-medium">Max Price: ${selectedFilters.price}</label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={selectedFilters.price}
            onChange={(e) => setSelectedFilters(prev => ({ ...prev, price: Number(e.target.value) }))}
            className="w-full"
          />
        </div>

        {/* التقييم */}
        <div className="mb-4">
          <label className="font-medium">Minimum Rating</label>
          <select
            className="w-full p-2 border rounded mt-2"
            value={selectedFilters.rating || ''}
            onChange={(e) => setSelectedFilters(prev => ({ ...prev, rating: e.target.value ? Number(e.target.value) : null }))}
          >
            <option value="">All</option>
            {[5, 4.5, 4, 3.5, 3].map((rating) => (
              <option key={rating} value={rating}>{rating} ★ & up</option>
            ))}
          </select>
        </div>

        {/* مسح الفلاتر */}
        <button
          onClick={clearFilters}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded mt-2"
        >
          Clear Filters
        </button>
      </aside>

      {/* المنتجات */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Products</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-blue-500 text-white px-3 py-1 rounded"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden rounded">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                <p className="text-blue-500 font-bold">${product.price}</p>

                {/* النجوم */}
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => {
                    if (i + 1 <= Math.floor(product.rating)) {
                      return <FiStar key={i} className="text-yellow-400 fill-current" />;
                    } else if (i < product.rating && product.rating % 1 !== 0) {
                      return <FiStar key={i} className="text-yellow-400 fill-current opacity-50" />;
                    } else {
                      return <FiStar key={i} className="text-gray-300" />;
                    }
                  })}
                  <span className="ml-2 text-sm text-gray-500">{product.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
