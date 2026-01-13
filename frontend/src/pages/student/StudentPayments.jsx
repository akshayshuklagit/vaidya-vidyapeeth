import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  CreditCardIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const StudentPayments = () => {
  const payments = [
    {
      id: 1,
      course: "Fundamentals of Ayurveda",
      amount: "₹2,999",
      date: "Dec 10, 2024",
      status: "Completed",
      paymentMethod: "Credit Card",
      transactionId: "TXN123456789",
    },
    {
      id: 2,
      course: "Panchakarma Therapy",
      amount: "₹4,999",
      date: "Nov 25, 2024",
      status: "Completed",
      paymentMethod: "UPI",
      transactionId: "TXN987654321",
    },
    {
      id: 3,
      course: "Herbal Medicine Basics",
      amount: "₹1,999",
      date: "Nov 15, 2024",
      status: "Completed",
      paymentMethod: "Net Banking",
      transactionId: "TXN456789123",
    },
    {
      id: 4,
      course: "Advanced Ayurveda Course",
      amount: "₹6,999",
      date: "Dec 14, 2024",
      status: "Pending",
      paymentMethod: "Credit Card",
      transactionId: "TXN789123456",
    },
  ];

  const totalSpent = payments
    .filter((p) => p.status === "Completed")
    .reduce(
      (sum, p) => sum + parseInt(p.amount.replace("₹", "").replace(",", "")),
      0
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
        <p className="text-gray-600">
          Track your course payments and transactions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCardIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">3</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">1</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Saved Payment Methods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCardIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">**** **** **** 1234</p>
              <p className="text-sm text-gray-600">Expires 12/26</p>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">📱</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">UPI ID</p>
              <p className="text-sm text-gray-600">john@paytm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Transaction History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Course
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Date
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Method
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
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📖</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {payment.course}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{payment.date}</td>
                  <td className="py-4 px-6 text-gray-600">
                    {payment.paymentMethod}
                  </td>
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

      {/* Download Receipt */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📄</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Download Receipt</h4>
            <p className="text-sm text-gray-600 mb-3">
              Get payment receipts for your records
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Download All
            </button>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💬</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Payment Support</h4>
            <p className="text-sm text-gray-600 mb-3">
              Have questions about your payments?
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPayments;
