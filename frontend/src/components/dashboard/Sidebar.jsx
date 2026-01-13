import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  DocumentTextIcon,
  CreditCardIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  VideoCameraIcon,
  UsersIcon,
  PencilSquareIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const studentMenuItems = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "My Courses", href: "/dashboard/courses", icon: BookOpenIcon },
  {
    name: "Live Classes",
    href: "/dashboard/live-classes",
    icon: VideoCameraIcon,
  },
  {
    name: "Notes / Resources",
    href: "/dashboard/notes",
    icon: DocumentTextIcon,
  },
];

const adminMenuItems = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Courses", href: "/admin/courses", icon: BookOpenIcon },
  { name: "Notes / Resources", href: "/admin/notes", icon: DocumentTextIcon },
  { name: "Payments", href: "/admin/payments", icon: CreditCardIcon },
  { name: "Meeting manager", href: "/admin/meetings", icon: CreditCardIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Blogs", href: "/admin/blogs", icon: PencilSquareIcon },
  { name: "Notifications", href: "/admin/notifications", icon: BellIcon },
  { name: "Settings", href: "/admin/settings", icon: CogIcon },
];

const Sidebar = ({ isOpen, onClose, userRole = "student" }) => {
  const location = useLocation();
  const menuItems = userRole === "admin" ? adminMenuItems : studentMenuItems;

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-white to-blue-50/30 border-r border-blue-100 shadow-lg">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-blue-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">
                  {userRole === "admin" ? "⚙️" : "🌱"}
                </span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                {userRole === "admin" ? "Admin Panel" : "Vaidya Vidyapeeth"}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const isActive = (() => {
                // exact match for dashboard
                if (item.href === "/dashboard") {
                  return location.pathname === "/dashboard";
                }

                // exact match for admin dashboard
                if (item.href === "/admin") {
                  return location.pathname === "/admin";
                }

                // for nested routes
                return (
                  location.pathname === item.href ||
                  location.pathname.startsWith(item.href + "/")
                );
              })();

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-r-4 border-blue-500 shadow-md transform scale-105"
                      : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-sm"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-blue-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 hover:shadow-md transition-all duration-200"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-white to-blue-50/30 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">
                  {userRole === "admin" ? "⚙️" : "🌱"}
                </span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                {userRole === "admin" ? "Admin Panel" : "Vaidya Vidyapeeth"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname === item.href ||
                    location.pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 shadow-md"
                      : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-blue-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 hover:shadow-md transition-all duration-200"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
