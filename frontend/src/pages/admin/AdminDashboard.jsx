import { useNavigate } from "react-router-dom";
import {
  UsersIcon,
  BookOpenIcon,
  CurrencyRupeeIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import { FullScreenLoader } from "../../components/Loader";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useAdminDashboard();

  if (loading) return <FullScreenLoader />;
  if (error)
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;

  const stats = [
    {
      title: "Total Users",
      value: data?.stats?.totalUsers || 0,
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Active Courses",
      value: data?.stats?.totalCourses || 0,
      icon: "📚",
      color: "bg-green-500",
    },
    {
      title: "Monthly Revenue",
      value: `₹${(data?.stats?.totalRevenue || 0).toLocaleString()}`,
      icon: "💰",
      color: "bg-yellow-500",
    },
    {
      title: "Active Enrollments",
      value: data?.stats?.activeEnrollments || 0,
      icon: "📝",
      color: "bg-purple-500",
    },
  ];

  const recentUsers = data?.recentUsers || [];
  const recentActivity = data?.recentActivity || [];

  const handleApproveBlog = (blogId) => {
    // console.log('Approving blog:', blogId);
    // TODO: API call to approve blog
  };

  const handleRejectBlog = (blogId) => {
    // console.log('Rejecting blog:', blogId);
    // TODO: API call to reject blog
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Users
            </h3>
            <button
              onClick={() => navigate("/admin/users")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentUsers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent users</p>
            ) : (
              recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      {user.role} •{" "}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/admin/courses")}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📚</div>
              <p className="text-sm font-medium text-gray-900">
                Manage Courses
              </p>
            </button>
            <button
              onClick={() => navigate("/admin/users")}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">👥</div>
              <p className="text-sm font-medium text-gray-900">Manage Users</p>
            </button>
            <button
              onClick={() => navigate("/admin/notes")}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📝</div>
              <p className="text-sm font-medium text-gray-900">Manage Notes</p>
            </button>
            <button
              onClick={() => navigate("/admin/blogs")}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">✍️</div>
              <p className="text-sm font-medium text-gray-900">Manage Blogs</p>
            </button>
            <button
              onClick={() => navigate("/admin/notifications")}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔔</div>
              <p className="text-sm font-medium text-gray-900">Notifications</p>
            </button>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            This Month
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">New Users</p>
                <p className="text-xs text-gray-600">Registered this month</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {data?.monthlyStats?.newUsers || 0}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Course Completions
                </p>
                <p className="text-xs text-gray-600">Certificates issued</p>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {data?.monthlyStats?.courseCompletions || 0}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Revenue</p>
                <p className="text-xs text-gray-600">Total earnings</p>
              </div>
              <p className="text-2xl font-bold text-yellow-600">
                ₹{(data?.monthlyStats?.revenue || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
