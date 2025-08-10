'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  FiShoppingCart, FiUser, FiSearch, FiHome,
  FiPackage, FiList, FiLock, FiMenu, FiX
} from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute = pathname.startsWith('/auth');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const cartItemsCount = 3;

  if (isAdminRoute || isAuthRoute) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Desktop Links */}
          <div className="flex items-center ">
            <Link href="/" className="text-xl font-bold 
          text-blue-600 dark:text-white">LEEN
            <span className='text-xl font-bold 
          text-blue-200 dark:text-white'>-Shoping</span>
            </Link>
            <div className="hidden md:flex md:ml-8 md:space-x-8">
              <Link href="/" className={pathname === '/' ? 'text-blue-600' : 'text-gray-500 dark:text-gray-300'}>
                <FiHome className="inline mr-1" /> Home
              </Link>
              <Link href="/products" className={pathname === '/products' ? 'text-blue-600' : 'text-gray-500 dark:text-gray-300'}>
                <FiPackage className="inline mr-1" /> Products
              </Link>
              <Link href="/orders" className={pathname.startsWith('/orders') ? 'text-blue-600' : 'text-gray-500 dark:text-gray-300'}>
                <FiList className="inline mr-1" /> Orders
              </Link>
            </div>
          </div>

          {/* Search + Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-64 border rounded-md text-sm focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300">
              <FiShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300"
              >
                <FiUser className="h-5 w-5" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <Link href="/auth/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FiLock className="inline mr-2" /> Login
                  </Link>
                  <Link href="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Admin Dashboard
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 md:hidden"
            >
              {showMobileMenu ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {showMobileMenu && (
   <div className="absolute top-16 right-0 bg-white shadow-md rounded-md p-4 flex flex-col space-y-2 w-48 md:hidden z-50">
                <Link href="/" onClick={() => setShowMobileMenu(false)} className={pathname === '/' ? 'text-blue-600' : 'text-gray-700'}>
                  <FiHome className="inline mr-2" /> Home
                </Link>
                <Link href="/products" onClick={() => setShowMobileMenu(false)} className={pathname === '/products' ? 'text-blue-600' : 'text-gray-700'}>
                  <FiPackage className="inline mr-2" /> Products
                </Link>
                <Link href="/orders" onClick={() => setShowMobileMenu(false)} className={pathname.startsWith('/orders') ? 'text-blue-600' : 'text-gray-700'}>
                  <FiList className="inline mr-2" /> Orders
                </Link>
              </div>
      )}
    </nav>
  );
}
