  import { FiHome, FiUsers, FiSettings, FiBarChart2, FiCalendar, FiBell } from 'react-icons/fi';

  export default function Dashboard() {
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <nav className="p-4 space-y-2">
            <a href="/" className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-blue-600">
              <FiHome className="mr-2" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-blue-600">
              <FiUsers className="mr-2" />
              <span>Users</span>
            </a>
            <a href="#" className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-blue-600">
              <FiBarChart2 className="mr-2" />
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-blue-600">
              <FiSettings className="mr-2" />
              <span>Settings</span>
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white shadow-sm p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Welcome back!</h2>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <FiBell className="text-gray-500 text-xl" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCalendar className="text-gray-500" />
                  <span className="text-sm">{new Date().toLocaleDateString('en-US')}</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                  JD
                </div>
              </div>
            </div>
          </header>

          {/* Cards Section */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
              <h3 className="font-medium text-gray-600">Total Revenue</h3>
              <p className="text-2xl font-bold mt-2">$24,780</p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <span>↑ 12% from last month</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
              <h3 className="font-medium text-gray-600">Active Users</h3>
              <p className="text-2xl font-bold mt-2">1,892</p>
              <div className="mt-4 flex items-center text-sm text-blue-600">
                <span>↑ 8 new today</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-500">
              <h3 className="font-medium text-gray-600">Conversion Rate</h3>
              <p className="text-2xl font-bold mt-2">3.2%</p>
              <div className="mt-4 flex items-center text-sm text-yellow-600">
                <span>↓ 0.5% from average</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-gray-700">Sales Overview</h3>
                <select className="border rounded-md px-3 py-1 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last year</option>
                </select>
              </div>
              {/* Placeholder for Chart */}
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                [Chart.js or Recharts would go here]
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="px-6 pb-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-medium text-gray-700">Recent Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3, 4].map((item) => (
                      <tr key={item} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#TXN00{item}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Customer {item}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(item * 250).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item % 3 === 0 ? 'bg-green-100 text-green-800' : 
                            item % 2 === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item % 3 === 0 ? 'Completed' : item % 2 === 0 ? 'Pending' : 'Processing'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }