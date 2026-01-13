import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center mt-10">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            404
          </div>
          <div className="text-6xl mb-6">🌿</div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for seems to have wandered off the path of
            wellness.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
          >
            <HomeIcon className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Looking for something specific?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/courses"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/blog"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/gallery"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
