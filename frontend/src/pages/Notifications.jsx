import { BellIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";

const Notifications = () => {
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const getTypeColor = (type) => {
    switch (type) {
      case "course":
        return "bg-blue-100 text-blue-800";
      case "payment":
        return "bg-green-100 text-green-800";
      case "system":
        return "bg-gray-100 text-gray-800";
      case "announcement":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-17">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex justify-between">
            <div className="flex items-center gap-3">
              <BellIcon className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold">Notifications</h1>
            </div>

            {notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Body */}
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-6 hover:bg-gray-50 ${
                    !n.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{n.title}</h3>
                        {!n.isRead && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getTypeColor(
                            n.category
                          )}`}
                        >
                          {n.category}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-1">{n.message}</p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(n.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!n.isRead && (
                        <button
                          onClick={() => markAsRead(n._id)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <CheckIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(n._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
