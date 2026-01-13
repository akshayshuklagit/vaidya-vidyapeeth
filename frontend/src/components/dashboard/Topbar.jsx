import { useState } from "react";
import {
  BellIcon,
  Bars3Icon,
  ChevronDownIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import NotificationDropdown from "../NotificationDropdown";

const Topbar = ({ title, onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const notifications = [];

  return (
    <header className="bg-gradient-to-r from-white to-blue-50/50 border-b border-blue-100 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-blue-100 mr-4 transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <NotificationDropdown />
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-medium">
                  <img
                    src={
                      auth.user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        auth.user.name
                      )}&background=4f46e5&color=fff`
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover shadow-md"
                  />
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {auth.user.name}
                </p>
                <p className="text-xs text-gray-500">{auth.user.role}</p>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </button>

            {/* Profile Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                    <Link to="/profile">View Profile</Link>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                    <Link to="/">Home</Link>
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
