import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  PlayCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";
import { FullScreenLoader } from "../components/Loader";
import { useCourseBySlug, getCourseById } from "../hooks/useCourses";

const CourseDetails = () => {
  const { id } = useParams();

  // Check if id is a MongoDB ObjectId (24 hex chars) or a slug
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

  // Use different hook based on id type
  const { course, loading, error } = isObjectId
    ? { course: null, loading: true, error: null } // Will handle ObjectId separately
    : useCourseBySlug(id);

  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  // Fetch course by ObjectId if needed
  useEffect(() => {
    if (isObjectId) {
      const fetchCourse = async () => {
        try {
          const courseData = await getCourseById(id);
          setCourseData(courseData);
        } catch (err) {
          setFetchError("Course not found");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCourse();
    } else {
      // Use slug data
      setCourseData(course);
      setIsLoading(loading);
      setFetchError(error);
    }
  }, [id, isObjectId, course, loading, error]);

  const finalCourse = courseData || course;
  const finalLoading = isObjectId ? isLoading : loading;
  const finalError = fetchError || error;

  if (finalLoading) return <FullScreenLoader />;
  if (finalError)
    return (
      <div className="text-red-500 text-center p-8 pt-24">
        Error: {finalError}
      </div>
    );
  if (!finalCourse)
    return <div className="text-center p-8 pt-24">Course not found</div>;

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {finalCourse.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {finalCourse.title}
              </h1>
              <p className="text-xl opacity-90 mb-2">
                {finalCourse.sanskritName}
              </p>
              <p className="text-lg opacity-80 mb-6">
                {finalCourse.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {finalCourse.instructor?.name?.charAt(0) || "I"}
                  </div>
                  <div>
                    <div className="font-semibold">
                      {finalCourse.instructor?.name || "Instructor"}
                    </div>
                    <div className="text-sm opacity-75">
                      {finalCourse.instructor?.title || "Ayurvedacharya"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>{finalCourse.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5" />
                  <span>{finalCourse.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5" />
                  <span>{finalCourse.level}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={
                    finalCourse.registrationFormUrl ||
                    "https://docs.google.com/forms/d/e/1FAIpQLSdp0jt1Gt_jZMjD1_PvUtaSKNU64dvolKRV8PfmxpTNSWYh8Q/viewform"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Enroll Now
                  </Button>
                </a>
                <Link to={"/courses"}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-slate-600 hover:bg-white/10"
                  >
                    More Courses
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-video glassmorphism rounded-2xl flex items-center justify-center text-9xl">
                {finalCourse.icon}
              </div>
              <button className="absolute inset-0 flex items-center justify-center group">
                <PlayCircleIcon className="w-24 h-24 text-white group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {finalCourse.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {finalCourse.syllabus?.map((module, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedModule(
                          expandedModule === index ? null : index
                        )
                      }
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg">
                          Module {index + 1}: {module.module}
                        </div>
                        <div className="text-sm text-gray-600">
                          {module.topics?.length || 0} topics •{" "}
                          {module.duration}
                        </div>
                      </div>
                      {expandedModule === index ? (
                        <ChevronUpIcon className="w-6 h-6 text-blue-600" />
                      ) : (
                        <ChevronDownIcon className="w-6 h-6 text-blue-600" />
                      )}
                    </button>

                    {expandedModule === index && (
                      <div className="p-4 space-y-2">
                        {module.topics?.map((topic, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircleIcon className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-700">{topic}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Ayurvedic Resources */}
            <section className="glassmorphism rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">
                Ayurvedic Resources Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-3xl mb-2">📄</div>
                  <h3 className="font-bold mb-1">Herb Encyclopedia PDF</h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive guide to 100+ herbs
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                  <div className="text-3xl mb-2">🍲</div>
                  <h3 className="font-bold mb-1">Ayurvedic Recipes</h3>
                  <p className="text-sm text-gray-600">
                    50+ dosha-balancing recipes
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-bold mb-1">Classical Texts</h3>
                  <p className="text-sm text-gray-600">
                    Excerpts from Charaka & Sushruta
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <div className="text-3xl mb-2">🎓</div>
                  <h3 className="font-bold mb-1">Certificate</h3>
                  <p className="text-sm text-gray-600">
                    Official completion certificate
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="glassmorphism rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ₹{finalCourse.price}
                </div>
                {finalCourse.originalPrice && (
                  <div className="text-xl text-gray-400 line-through">
                    ₹{finalCourse.originalPrice}
                  </div>
                )}
                <div className="mt-2 text-sm text-green-600 font-semibold">
                  Save{" "}
                  {Math.round(
                    (1 - finalCourse.price / finalCourse.originalPrice) * 100
                  )}
                  %
                </div>
              </div>

              {/* <Link to={`/checkout/${finalCourse._id}`}>
                <Button size="lg" className="w-full mb-4">
                  Enroll Now
                </Button>
              </Link> */}

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdp0jt1Gt_jZMjD1_PvUtaSKNU64dvolKRV8PfmxpTNSWYh8Q/viewform"
                target="_blank"
              >
                <Button size="lg" className="w-full mb-4">
                  Enroll Now{" "}
                </Button>
              </a>

              <div className="space-y-3 pt-4 border-t border-gray-200 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span>✓</span>
                  <span>Lifetime Access</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>✓</span>
                  <span>Mobile & Desktop</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>✓</span>
                  <span>Certificate of Completion</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>✓</span>
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
