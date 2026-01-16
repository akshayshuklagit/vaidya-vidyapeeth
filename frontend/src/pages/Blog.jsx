import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import api from "../utils/api";
import { FullScreenLoader } from "../components/Loader";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data.data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <FullScreenLoader />;
  const categories = ["All", "Nutrition", "Wellness", "Herbs", "Lifestyle"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Vaidya Vidyapeeth Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, wisdom, and practical guidance from Vaidya Vidyapeeth
            experts
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-3 rounded-full font-medium transition-all duration-300 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs.map((post, index) => (
            <motion.article
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-6xl relative overflow-hidden">
                {post.thumbnail?.url ? (
                  <>
                    <img
                      src={post.thumbnail.url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="text-6xl">📝</div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            to="/blog"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
          >
            View All Articles
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
