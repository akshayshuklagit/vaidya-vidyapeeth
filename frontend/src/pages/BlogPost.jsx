import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";
import api from "../utils/api";
import { FullScreenLoader } from "../components/Loader";

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${slug}`);
        setBlog(res.data.data || res.data.blog || null);
      } catch (error) {
        console.error(
          "Failed to fetch blog:",
          error.response?.data || error.message
        );
        setError(error.response?.data?.error || "Blog not found");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <FullScreenLoader />;
  if (!blog)
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Blog not found
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/blog"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );

  const blogPost = blog;

  return (
    <div className="min-h-screen pt-16 pb-12 sm:pt-20 sm:pb-20 bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-blue-200 to-transparent rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-tr from-indigo-200 to-transparent rounded-full blur-3xl opacity-20 -z-10"></div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-4 sm:mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold transition-all duration-300 hover:gap-3"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Articles
          </Link>
        </motion.div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <motion.span
              className="inline-block px-4 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              {blogPost.category}
            </motion.span>
          </div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {blogPost.title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {blogPost.excerpt}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-gray-700 mb-6 sm:mb-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-md text-sm sm:text-base">
              <UserIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
              <span className="font-medium text-xs sm:text-sm">
                {blogPost.author.name}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-md text-sm sm:text-base">
              <CalendarDaysIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
              <span className="font-medium text-xs sm:text-sm">
                {new Date(
                  blogPost.publishedAt || blogPost.createdAt
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-md text-sm sm:text-base">
              <ClockIcon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
              <span className="font-medium text-xs sm:text-sm">
                {blogPost.readTime} min read
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="ghost"
              size="sm"
              icon={ShareIcon}
              className="text-blue-700 hover:bg-blue-100"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: blogPost.title,
                      text: blogPost.excerpt,
                      url: window.location.href,
                    })
                    .catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={BookmarkIcon}
              className="text-blue-700 hover:bg-blue-100"
            >
              Save
            </Button>
          </motion.div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          className="relative h-56 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-12 shadow-lg sm:shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={
              blogPost.thumbnail?.url || "https://via.placeholder.com/800x400"
            }
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          className="prose prose-lg max-w-none mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </motion.div>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-xs sm:text-sm text-gray-600 font-semibold">
            Tags:
          </span>
          {blogPost.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full cursor-pointer hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
            >
              #{tag}
            </motion.span>
          ))}
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;
