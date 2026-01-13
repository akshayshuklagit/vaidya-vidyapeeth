import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroIllustration from "../assets/undraw_stepping-up_i0i7.svg";
import CountUp from "../components/CountUp";
import Slider from "../components/Slider";

import {
  SparklesIcon,
  AcademicCapIcon,
  VideoCameraIcon,
  ClockIcon,
  StarIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import GradientBackground from "../components/GradientBackground";
import Button from "../components/Button";
import CourseCard from "../components/CourseCard";
import { useLanguage } from "../contexts/LanguageContext";
import { useCourses } from "../hooks/useCourses";
import { useAuth } from "../contexts/AuthContext";
import FAQ from "./FAQ";

// FAQ Item Component
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Home = () => {
  const { t } = useLanguage();
  const { auth } = useAuth();
  const { courses, loading } = useCourses();
  const dashboardRoute = auth?.user?.role === "admin" ? "/admin" : "/dashboard";

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white overflow-hidden">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-56 -left-36 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-200/20 blur-3xl transform-gpu rotate-12" />
        <div className="absolute -bottom-56 -right-40 w-[44rem] h-[44rem] rounded-full bg-gradient-to-r from-cyan-100/30 to-sky-100/20 blur-4xl transform-gpu -rotate-12" />
      </div>
      {/* Hero Section */}
      <GradientBackground
        variant="blue"
        className="min-h-screen flex items-center pt-12"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-20 ml-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "circOut" }}
          >
            <div className="absolute top-10 left-20 w-36 h-36 border-4 border-white rounded-full animate-pulse blur-sm"></div>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center lg:text-left">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">
                  From <span className="text-yellow-300  ">शास्त्र</span> to
                  Successful Practice
                </span>
              </h1>

              <p className="text-xl md:text-xl text-white/80 mb-10 max-w-3xl leading-relaxed">
                {t("heroSubtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/courses">
                  <Button size="lg" icon={AcademicCapIcon}>
                    {t("exploreCoursesBtn")}
                  </Button>
                </Link>
                <Link to={dashboardRoute}>
                  <Button variant="outline" size="lg" icon={HomeIcon}>
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <motion.div
              className="relative hidden lg:flex justify-center lg:justify-end items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              {/* Glow background */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-500/30 blur-3xl" />

              {/* Illustration */}
              <motion.img
                src={heroIllustration}
                alt="Ayurveda Illustration"
                className="relative z-10 w-[90%] max-w-md drop-shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </GradientBackground>
      <section className="py-24 relative">
        {/* soft background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              {
                label: "Active Students",
                value: 500,
                suffix: "+",
                icon: "👨‍🎓",
              },
              { label: "Expert Vaidyas", value: 5, suffix: "+", icon: "👨‍⚕️" },
              { label: "Courses", value: 10, suffix: "+", icon: "📚" },
              { label: "Success Rate", value: 95, suffix: "%", icon: "⭐" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group text-center"
              >
                {/* icon */}
                <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-md">
                  <span className="text-2xl">{stat.icon}</span>
                </div>

                {/* value */}
                <div className="text-4xl md:text-5xl font-bold text-white drop-shadow">
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </div>

                {/* underline */}
                <div className="mx-auto mt-2 h-[2px] w-10 bg-white/40 rounded-full group-hover:w-16 transition-all" />

                {/* label */}
                <div className="mt-3 text-sm text-white/80 tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t("popularCourses")}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Master the ancient science of Ayurveda with our comprehensive
              courses taught by experienced Vaidyas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? // Loading skeleton
                [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
              : courses.slice(0, 3).map((course, index) => (
                  <motion.div
                    key={course._id}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CourseCard course={course} index={index} />
                  </motion.div>
                ))}
          </div>

          <motion.div className="text-center mt-12" {...fadeInUp}>
            <Link to="/courses">
              <Button size="lg" variant="ghost">
                View All Courses →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* <Slider /> */}

      {/* Upcoming Live Classes */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-6 paper-texture"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 relative z-10">
          <span className="gradient-text">Poster Prade</span>
        </h1>

        <Slider />
      </section>

      <section className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* WHY CHOOSE US */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Why Choose Us
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg">
                A learning platform built for authentic, practical, and
                result-driven Ayurveda education.
              </p>

              <ul className="space-y-4">
                {[
                  "Authentic Shastra-based Teaching",
                  "Live + Recorded Hybrid Classes",
                  "Experienced Practicing Vaidyas",
                  "Case-Based Learning Approach",
                  "Flexible for Working Professionals",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-1">✔</span>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WHAT YOU’LL BE ABLE TO DO */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                What You’ll Be Able To Do
              </h3>
              <p className="text-gray-600 mb-8">
                Practical skills you’ll gain by completing our Ayurveda
                programs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Identify Prakriti & Vikriti",
                  "Design Ayurvedic Diet Plans",
                  "Recommend Herbs Safely",
                  "Handle Common Clinical Cases",
                  "Understand Pulse & Diagnosis Basics",
                  "Begin Wellness Consultations",
                ].map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl"
                  >
                    <span className="text-blue-600 text-xl">🌿</span>
                    <span className="text-gray-900 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Blog Posts */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Popular Blog Posts</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover insights, tips, and wisdom from our Ayurveda experts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Understanding Your Dosha: A Complete Guide",
                excerpt:
                  "Learn how to identify your unique body constitution and live in harmony with your natural tendencies.",
                author: "Dr. Priya Sharma",
                date: "Dec 15, 2024",
                readTime: "5 min read",
                category: "Fundamentals",
                image:
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
              },
              {
                id: 2,
                title: "10 Ayurvedic Herbs for Daily Wellness",
                excerpt:
                  "Discover powerful herbs that can transform your health when incorporated into your daily routine.",
                author: "Vaidya Rajesh Kumar",
                date: "Dec 12, 2024",
                readTime: "7 min read",
                category: "Herbs",
                image:
                  "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&h=250&fit=crop",
              },
              {
                id: 3,
                title: "Seasonal Eating According to Ayurveda",
                excerpt:
                  "Align your diet with nature's rhythms for optimal health and vitality throughout the year.",
                author: "Dr. Kavita Patel",
                date: "Dec 10, 2024",
                readTime: "6 min read",
                category: "Nutrition",
                image:
                  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop",
              },
            ].map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div className="text-center mt-12" {...fadeInUp}>
            <Link to="/blog">
              <Button size="lg" variant="ghost">
                View All Blog Posts →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our Ayurveda courses and
              learning platform
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "What is Ayurveda and why should I learn it?",
                answer:
                  "Ayurveda is a 5,000-year-old holistic healing system from India that focuses on balancing mind, body, and spirit. Learning Ayurveda helps you understand your unique constitution, prevent diseases naturally, and achieve optimal wellness through personalized lifestyle and dietary practices.",
              },
              {
                question: "Do I need any prior medical knowledge to start?",
                answer:
                  "No prior medical knowledge is required! Our courses are designed for beginners and start with fundamental concepts. We teach everything from basic principles to practical applications, making Ayurveda accessible to everyone regardless of their background.",
              },
              {
                question: "Are the courses certified and recognized?",
                answer:
                  "Yes, our courses are designed by qualified Ayurvedic practitioners and provide certificates upon completion. While our certificates demonstrate your knowledge and commitment, we recommend checking local regulations if you plan to practice professionally.",
              },
              {
                question: "How do the live classes work?",
                answer:
                  "Our live classes are conducted online with experienced Vaidyas (Ayurvedic doctors). You can interact directly with instructors, ask questions in real-time, and participate in practical demonstrations. All sessions are recorded for later review.",
              },
              {
                question: "Can I learn Ayurveda while working full-time?",
                answer:
                  "Absolutely! Our courses are designed for working professionals with flexible schedules. You can access recorded lectures anytime, and live classes are scheduled at convenient times. Most students complete courses within 2-6 months studying part-time.",
              },
              {
                question: "What support do I get during the course?",
                answer:
                  "You'll have access to expert instructors, downloadable study materials, practice exercises, and a community of fellow learners. Our support team is available to help with technical issues and course-related questions throughout your learning journey.",
              },
            ].map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>

          <motion.div className="text-center mt-12" {...fadeInUp}>
            <Link to="/faq">
              <Button size="lg" variant="ghost">
                View All FAQs →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Begin Your Ayurveda Journey Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students worldwide learning authentic Ayurveda
              from experienced practitioners
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg transform hover:-translate-y-1 transition"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-black hover:bg-white/10 hover:text-white"
                >
                  Browse Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
