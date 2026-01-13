import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/vidhyapeeth_logo.webp";
import { useAuth } from "../contexts/AuthContext";

import {
  Bars3Icon,
  XMarkIcon,
  LanguageIcon,
  AcademicCapIcon,
  UserPlusIcon,
  BellIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { useLanguage } from "../contexts/LanguageContext";
import { showSuccess, showInfo } from "../utils/toast";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("courses"), href: "/courses" },
    { name: t("blog"), href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
  ];

  const isActive = (path) => location.pathname === path;
  const { auth, logout } = useAuth();
  const dashboardRoute = auth?.user?.role === "admin" ? "/admin" : "/dashboard";

  const isLoggedIn = !!auth?.user;

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 glassmorphism paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Ayurveda Vidyapeeth Logo"
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                {t("academyName")}
              </h1>
              <p className="text-xs text-gray-600">{t("tagline")}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
              aria-label="Toggle language"
            >
              <LanguageIcon className="w-5 h-5" />
              <span className="ml-1 text-xs font-semibold">
                {language.toUpperCase()}
              </span>
            </button>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <NotificationDropdown />

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
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
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {auth.user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {auth.user.role === "admin" ? "Admin" : "Student"}
                      </p>
                    </div>
                    <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors block"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          View Profile
                        </Link>
                        <Link
                          to={dashboardRoute}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors block"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          {auth?.user?.role === "admin"
                            ? "Admin panel"
                            : "Dashboard"}
                        </Link>
                        <hr className="my-2" />
                        <button
                          onClick={async () => {
                            await logout();
                            setShowProfileMenu(false);
                            showSuccess("Successfully logged out!");
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/authpage">
                  <Button variant="ghost" size="sm" icon={UserPlusIcon}>
                    {t("Register")}
                  </Button>
                </Link>

                <Link to="/authpage">
                  <Button size="sm">{t("Login")}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/20 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 space-y-3 border-t border-gray-200">
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LanguageIcon className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    {language === "en" ? "हिंदी" : "English"}
                  </span>
                </button>

                {isLoggedIn ? (
                  <>
                    <Link
                      to="/notifications"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <BellIcon className="w-5 h-5" />
                      <span>Notifications</span>
                      {notificationCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserIcon className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-4 py-4 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <AcademicCapIcon className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={async () => {
                        await logout();
                        setIsOpen(false);
                        showSuccess("Successfully logged out!");
                      }}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-red-600 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="md" className="w-full">
                        {t("Dashboard")}
                      </Button>
                    </Link>
                    <Link to="/authpage" onClick={() => setIsOpen(false)}>
                      <Button size="md" className="w-full">
                        {t("login")}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
