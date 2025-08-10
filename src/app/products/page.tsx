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

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      rating: 4.5,
      reviewCount: 128,
      category: 'electronics',
      image: '/headphones.jpg',
      isFeatured: true,
      isNew: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 249.99,
      rating: 4.2,
      reviewCount: 86,
      category: 'electronics',
      image: '/smartwatch.jpg',
      isFeatured: true
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 89.99,
      rating: 4.7,
      reviewCount: 215,
      category: 'sports',
      image: '/shoes.jpg',
      isNew: true
    },
    {
      id: 4,
      name: 'Cotton T-Shirt',
      price: 24.99,
      rating: 4.0,
      reviewCount: 42,
      category: 'clothing',
      image: '/tshirt.jpg'
    },
    {
      id: 5,
      name: 'Leather Wallet',
      price: 49.99,
      rating: 4.3,
      reviewCount: 57,
      category: 'accessories',
      image: '/wallet.jpg'
    },
    {
      id: 6,
      name: 'Bluetooth Speaker',
      price: 79.99,
      rating: 4.1,
      reviewCount: 93,
      category: 'electronics',
      image: '/speaker.jpg'
    },
    {
      id: 7,
      name: 'Yoga Mat',
      price: 29.99,
      rating: 4.4,
      reviewCount: 71,
      category: 'sports',
      image: '/yogamat.jpg'
    },
    {
      id: 8,
      name: 'Denim Jeans',
      price: 59.99,
      rating: 4.6,
      reviewCount: 134,
      category: 'clothing',
      image: '/jeans.jpg'
    }
  ];

  // Available categories
  const categories = [...new Set(products.map(product => product.category))];

  // Filter products based on search, price range, and categories
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(product.category);
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        // Assuming newer products have higher IDs (for demo)
        return b.id - a.id;
      default: // 'featured'
        return (b.isFeatured || 0) - (a.isFeatured || 0) || b.rating - a.rating;
    }
  });

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
          <p className="text-gray-600">Browse our collection of high-quality products</p>
        </div>

        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          {/* Search input */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort options */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>

            {/* Mobile filter button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <FiFilter /> Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - hidden on mobile unless toggled */}
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <h3 className="font-medium text-lg mb-4">Filters</h3>

              {/* Price range filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">${priceRange[0]}</span>
                  <span className="text-sm text-gray-600">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Categories filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`cat-${category}`} className="text-sm text-gray-700 capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
                    {/* Product image */}
                    <div className="relative">
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Product Image</span>
                      </div>
                      {product.isNew && (
                        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          New
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Product details */}
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviewCount})</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
                      <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
                        <FiShoppingCart /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <FiSearch className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 1000]);
                    setSelectedCategories([]);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
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