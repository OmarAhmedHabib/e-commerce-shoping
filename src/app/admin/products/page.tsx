import Image from "next/image";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiFilter } from "react-icons/fi";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  image: string;
};

export default function ProductsPage() {
  const products: Product[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      category: "Electronics",
      price: 99.99,
      stock: 45,
      status: "in_stock",
      image: "/images/arrival3.jpg",
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      category: "Apparel",
      price: 29.99,
      stock: 3,
      status: "low_stock",
      image: "/images/arrival4.jpg",
    },
    {
      id: "3",
      name: "Stainless Steel Water Bottle",
      category: "Accessories",
      price: 24.95,
      stock: 0,
      status: "out_of_stock",
      image: "/images/bottle.jpg",
    },
    {
      id: "4",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 79.99,
      stock: 12,
      status: "in_stock",
      image: "/images/speaker.jpg",
    },
    {
      id: "5",
      name: "Yoga Mat",
      category: "Fitness",
      price: 34.5,
      stock: 7,
      status: "low_stock",
      image: "/images/yoga.jpg",
    },
  ];

  const statusClasses = {
    in_stock: "bg-green-100 text-green-800",
    low_stock: "bg-yellow-100 text-yellow-800",
    out_of_stock: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600">Manage your inventory</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Apparel">Apparel</option>
              <option value="Accessories">Accessories</option>
              <option value="Fitness">Fitness</option>
            </select>
            <button className="flex items-center px-3 py-2 border rounded-lg hover:bg-gray-50">
              <FiFilter className="mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-12 h-12 rounded overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[product.status]}`}
                    >
                      {product.status === "in_stock"
                        ? "In Stock"
                        : product.status === "low_stock"
                        ? "Low Stock"
                        : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FiEdit2 />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">5</span> of{" "}
            <span className="font-medium">12</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md text-sm font-medium bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
