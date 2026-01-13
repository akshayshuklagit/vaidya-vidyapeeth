import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const AdminBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Benefits of Triphala in Daily Life",
      author: "Dr. Amit Singh",
      status: "Pending",
      submitted: "Dec 12, 2024",
      category: "Herbal Medicine",
      views: 0,
    },
    {
      id: 2,
      title: "Understanding Doshas: A Complete Guide",
      author: "Dr. Kavita Sharma",
      status: "Pending",
      submitted: "Dec 11, 2024",
      category: "Fundamentals",
      views: 0,
    },
    {
      id: 3,
      title: "Seasonal Ayurvedic Practices",
      author: "Dr. Ravi Kumar",
      status: "Published",
      submitted: "Dec 10, 2024",
      category: "Lifestyle",
      views: 1247,
    },
    {
      id: 4,
      title: "Panchakarma: Ancient Detox Method",
      author: "Dr. Priya Sharma",
      status: "Published",
      submitted: "Dec 8, 2024",
      category: "Panchakarma",
      views: 892,
    },
    {
      id: 5,
      title: "Ayurvedic Diet for Modern Life",
      author: "Dr. Meera Patel",
      status: "Rejected",
      submitted: "Dec 7, 2024",
      category: "Nutrition",
      views: 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600">Review and manage blog submissions</p>
        </div>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2">
          <PlusIcon className="w-5 h-5" />
          <span>Create New Blog</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Blogs</p>
              <p className="text-3xl font-bold text-gray-900">48</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600">32</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Review
              </p>
              <p className="text-3xl font-bold text-yellow-600">12</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-purple-600">15.2K</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Pending Approvals
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {blogs
            .filter((blog) => blog.status === "Pending")
            .map((blog) => (
              <div key={blog.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      {blog.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>by {blog.author}</span>
                      <span>•</span>
                      <span>{blog.submitted}</span>
                      <span>•</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {blog.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      This blog post discusses the importance of Ayurvedic
                      principles in modern healthcare...
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 ml-6">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* All Blogs Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Blogs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Title
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Author
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Category
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Views
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Date
                </th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📄</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {blog.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{blog.author}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {blog.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : blog.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {blog.views.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{blog.submitted}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
