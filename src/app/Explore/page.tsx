'use client';
import Link from 'next/link';
import { FiFilter, FiSearch, FiGrid, FiList, FiStar, FiChevronDown, FiX } from 'react-icons/fi';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/footer';

const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics' },
  { id: 2, name: 'Clothing', slug: 'clothing' },
  { id: 3, name: 'Footwear', slug: 'footwear' },
  { id: 4, name: 'Accessories', slug: 'accessories' },
  { id: 5, name: 'Home', slug: 'home' },
  { id: 6, name: 'Beauty', slug: 'beauty' },
];

const filters = {
  price: [
    { id: 1, name: 'Under $100', value: '0-100' },
    { id: 2, name: '$100 - $300', value: '100-300' },
    { id: 3, name: '$300 - $500', value: '300-500' },
    { id: 4, name: 'Over $500', value: '500-10000' },
  ],
  rating: [
    { id: 1, name: '4 stars & up', value: '4-5' },
    { id: 2, name: '3 stars & up', value: '3-5' },
    { id: 3, name: '2 stars & up', value: '2-5' },
    { id: 4, name: '1 star & up', value: '1-5' },
  ],
};

const mockProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 299.99,
    image: "/images/download.jpeg",
    category: "electronics",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: ['black', 'silver'],
    badge: "Bestseller"
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image: "/images/images (1).jpeg",
    category: "electronics",
    rating: 4.5,
    reviews: 89,
    colors: ['black', 'rose gold'],
    badge: "Limited Edition"
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    price: 29.99,
    image: "/images/images (2).jpeg",
    category: "clothing",
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
    category: "footwear",
    rating: 4.7,
    reviews: 203,
    colors: ['blue', 'black'],
    badge: "Trending"
  },
  {
    id: "5",
    name: "Laptop Backpack",
    price: 49.99,
    image: "/images/backpack.jpg",
    category: "accessories",
    rating: 4.3,
    reviews: 78,
    colors: ['black', 'gray']
  },
  {
    id: "6",
    name: "Earphones",
    price: 59.99,
    image: "/images/earphones.jpg",
    category: "electronics",
    rating: 4.1,
    reviews: 45,
    colors: ['white', 'black']
  },
];
export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: null as string | null,
    price: null as string | null,
    rating: null as string | null,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // تغيير الفلاتر
  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string | null) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }));
  };

  // تصفير الفلاتر
  const clearFilters = () => {
    setSelectedFilters({
      category: null,
      price: null,
      rating: null,
    });
    setSearchQuery('');
  };

  // فلترة المنتجات
  const filteredProducts = mockProducts.filter(product => {
    // فلترة البحث
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // فلترة التصنيف
    if (selectedFilters.category && product.category !== selectedFilters.category) {
      return false;
    }

    // فلترة السعر
    if (selectedFilters.price) {
      const [min, max] = selectedFilters.price.split('-').map(Number);
      if (isNaN(min) || isNaN(max) || product.price < min || product.price > max) {
        return false;
      }
    }

    // فلترة التقييم
    if (selectedFilters.rating) {
      const [minRating] = selectedFilters.rating.split('-').map(Number);
      if (isNaN(minRating) || product.rating < minRating) {
        return false;
      }
    }

    return true;
  });

  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Explore Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover our latest products and best offers
          </p>
        </div>
        
        {/* Search and filters bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            >
              <FiFilter />
              <span>Filters</span>
            </button>
            
            <div className="hidden md:flex gap-2">
              <select
                value={selectedFilters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedFilters.price || ''}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <option value="">All Prices</option>
                {filters.price.map(price => (
                  <option key={price.id} value={price.value}>
                    {price.name}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedFilters.rating || ''}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <option value="">All Ratings</option>
                {filters.rating.map(rating => (
                  <option key={rating.id} value={rating.value}>
                    {rating.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>
        
        {/* Active filters */}
        {(selectedFilters.category || selectedFilters.price || selectedFilters.rating || searchQuery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedFilters.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Category: {categories.find(c => c.slug === selectedFilters.category)?.name}
                <button 
                  onClick={() => handleFilterChange('category', null)}
                  className="ml-1 mr-2"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            
            {selectedFilters.price && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Price: {filters.price.find(p => p.value === selectedFilters.price)?.name}
                <button 
                  onClick={() => handleFilterChange('price', null)}
                  className="ml-1 mr-2"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            
            {selectedFilters.rating && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Rating: {filters.rating.find(r => r.value === selectedFilters.rating)?.name}
                <button 
                  onClick={() => handleFilterChange('rating', null)}
                  className="ml-1 mr-2"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Search: {searchQuery}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-1 mr-2"
                >
                  <FiX size={14} />
                </button>
              </span>
            )}
            
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        
        {/* Mobile filters sidebar */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)}></div>
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white dark:bg-gray-800 shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="overflow-y-auto py-4 px-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center">
                          <input
                            id={`category-${category.id}`}
                            type="radio"
                            checked={selectedFilters.category === category.slug}
                            onChange={() => handleFilterChange('category', category.slug)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`category-${category.id}`} className="ml-2 text-sm">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Price</h3>
                    <div className="space-y-2">
                      {filters.price.map(price => (
                        <div key={price.id} className="flex items-center">
                          <input
                            id={`price-${price.id}`}
                            type="radio"
                            checked={selectedFilters.price === price.value}
                            onChange={() => handleFilterChange('price', price.value)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`price-${price.id}`} className="ml-2 text-sm">
                            {price.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Rating</h3>
                    <div className="space-y-2">
                      {filters.rating.map(rating => (
                        <div key={rating.id} className="flex items-center">
                          <input
                            id={`rating-${rating.id}`}
                            type="radio"
                            checked={selectedFilters.rating === rating.value}
                            onChange={() => handleFilterChange('rating', rating.value)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`rating-${rating.id}`} className="ml-2 text-sm">
                            {rating.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Products grid/list */}
        {filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6' : 'space-y-4'}>
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FiSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any products matching your search.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}