import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const AdminPayments = () => {
  const payments = [
    {
      id: 1,
      user: "John Doe",
      course: "Fundamentals of Ayurveda",
      amount: "₹2,999",
      date: "Dec 14, 2024",
      method: "Credit Card",
      status: "Completed",
      transactionId: "TXN123456789",
    },
    {
      id: 2,
      user: "Sarah Wilson",
      course: "Panchakarma Therapy",
      amount: "₹4,999",
      date: "Dec 14, 2024",
      method: "UPI",
      status: "Completed",
      transactionId: "TXN987654321",
    },
    {
      id: 3,
      user: "Mike Johnson",
      course: "Herbal Medicine",
      amount: "₹1,999",
      date: "Dec 13, 2024",
      method: "Net Banking",
      status: "Completed",
      transactionId: "TXN456789123",
    },
    {
      id: 4,
      user: "Lisa Brown",
      course: "Advanced Ayurveda",
      amount: "₹6,999",
      date: "Dec 13, 2024",
      method: "Credit Card",
      status: "Pending",
      transactionId: "TXN789123456",
    },
    {
      id: 5,
      user: "David Lee",
      course: "Yoga & Meditation",
      amount: "₹3,499",
      date: "Dec 12, 2024",
      method: "UPI",
      status: "Failed",
      transactionId: "TXN321654987",
    },
  ];

  const totalRevenue = payments
    .filter((p) => p.status === "Completed")
    .reduce(
      (sum, p) => sum + parseInt(p.amount.replace("₹", "").replace(",", "")),
      0
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Payments Management
          </h2>
          <p className="text-gray-600">Monitor all transactions and revenue</p>
        </div>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2">
          <ArrowDownTrayIcon className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-blue-600">₹45,000</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">1,247</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-3xl font-bold text-red-600">23</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-80"
            />
          </div>
          <div className="flex space-x-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>All Methods</option>
              <option>Credit Card</option>
              <option>UPI</option>
              <option>Net Banking</option>
            </select>
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            All Transactions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  User
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Course
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Method
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Date
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {payment.user.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {payment.user}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{payment.course}</td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{payment.method}</td>
                  <td className="py-4 px-6 text-gray-600">{payment.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm">
                    {payment.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue Analytics
        </h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl mb-2 block">📊</span>
            <p className="text-gray-600">
              Revenue chart will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
