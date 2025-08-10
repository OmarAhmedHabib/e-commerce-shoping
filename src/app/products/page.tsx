'use client';

import Button from '@/components/Button';
import { useState } from 'react';
import { FiSearch, FiFilter, FiStar, FiShoppingCart } from 'react-icons/fi';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Sample products
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 199.99, rating: 4.5, reviewCount: 128, category: 'electronics', image: '/headphones.jpg', isFeatured: true, isNew: true },
    { id: 2, name: 'Smart Watch', price: 249.99, rating: 4.2, reviewCount: 86, category: 'electronics', image: '/smartwatch.jpg', isFeatured: true },
    { id: 3, name: 'Running Shoes', price: 89.99, rating: 4.7, reviewCount: 215, category: 'sports', image: '/shoes.jpg', isNew: true },
    { id: 4, name: 'Cotton T-Shirt', price: 24.99, rating: 4.0, reviewCount: 42, category: 'clothing', image: '/tshirt.jpg' },
    { id: 5, name: 'Leather Wallet', price: 49.99, rating: 4.3, reviewCount: 57, category: 'accessories', image: '/wallet.jpg' },
    { id: 6, name: 'Bluetooth Speaker', price: 79.99, rating: 4.1, reviewCount: 93, category: 'electronics', image: '/speaker.jpg' },
    { id: 7, name: 'Yoga Mat', price: 29.99, rating: 4.4, reviewCount: 71, category: 'sports', image: '/yogamat.jpg' },
    { id: 8, name: 'Denim Jeans', price: 59.99, rating: 4.6, reviewCount: 134, category: 'clothing', image: '/jeans.jpg' }
  ];

  const categories = [...new Set(products.map(p => p.category))];

  // Filters
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id - a.id;
      default: return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating;
    }
  });

  const toggleCategory = category => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const renderStars = rating => {
    return [...Array(5)].map((_, i) => {
      if (i < Math.floor(rating)) return <FiStar key={i} className="fill-yellow-400 text-yellow-400" />;
      if (i < rating) return <FiStar key={i} className="text-yellow-400 opacity-50" />;
      return <FiStar key={i} className="text-gray-300" />;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
          <p className="text-gray-600">Browse our collection of high-quality products</p>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute inset-y-0 left-3 my-auto text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-1 px-3 py-2 border rounded-md text-sm"
            >
              <FiFilter /> Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Filters */}
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <h3 className="font-medium text-lg mb-4">Filters</h3>
              
              {/* Price */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <div className="flex items-center gap-2 mb-2">
                  <input type="number" min="0" max="1000" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-16 border rounded p-1 text-sm" />
                  <span>-</span>
                  <input type="number" min="0" max="1000" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-16 border rounded p-1 text-sm" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 capitalize">
                      <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map(p => (
                  <div key={p.id} className="bg-white rounded-lg shadow hover:shadow-md transition">
                    <div className="relative w-full h-48">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      {p.isNew && <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">New</span>}
                      {p.isFeatured && <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Featured</span>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 mb-1">{p.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-1">{renderStars(p.rating)}</div>
                        <span className="text-xs text-gray-500">({p.reviewCount})</span>
                      </div>
                      <p className="text-lg font-bold mb-3">${p.price.toFixed(2)}</p>
                      <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
                        <FiShoppingCart /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <FiSearch className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button onClick={() => { setSearchQuery(''); setPriceRange([0, 1000]); setSelectedCategories([]); }} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
