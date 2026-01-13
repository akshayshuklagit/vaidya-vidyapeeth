import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  PlayIcon,
  PauseIcon,
  BookOpenIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ClockIcon,
  CheckCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { getCourseById } from "../hooks/useCourses";
import { usePayments } from "../hooks/usePayments";
import api from "../utils/api";
import { useRef, useCallback } from "react";

const CoursePlayer = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const { getUserEnrollments } = usePayments();
  const fetchedRef = useRef(false);

  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [activeTab, setActiveTab] = useState("lessons");
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (!id) return;
    if (fetchedRef.current) return; // ✅ prevents infinite loop

    fetchedRef.current = true;

    const fetchCourseData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Fetch course
        const courseData = await getCourseById(id);
        setCourse(courseData);

        // Convert syllabus to lessons - use videoId directly
        const courseLessons =
          courseData.syllabus?.map((module, index) => ({
            id: index + 1,
            title: module.module,
            duration: module.duration || "N/A",
            type: module.videoId ? "video" : "text",
            completed: false,
            videoUrl: module.videoId
              ? `https://www.youtube.com/embed/${module.videoId}`
              : null,
            topics: module.topics || [],
          })) || [];
        // console.log(courseLessons);

        setLessons(courseLessons);

        // 3️⃣ Fetch enrollment (ONCE)
        const enrollments = await getUserEnrollments();
        const userEnrollment = enrollments.find(
          (e) => e.courseId._id === courseData._id
        );

        if (userEnrollment) {
          setEnrollment(userEnrollment);
        }
      } catch (error) {
        console.error("Failed to fetch course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);
  const handleLessonClick = (index) => {
    setCurrentLesson(index);
  };

  const markLessonComplete = async () => {
    try {
      // Call API to update progress in backend
      await api.put(`/users/progress/${enrollment._id}`, {
        lessonId: currentLesson,
        completed: true,
      });

      // Update local state
      const updatedLessons = [...lessons];
      updatedLessons[currentLesson].completed = true;
      setLessons(updatedLessons);

      // Update enrollment progress
      const completedCount = updatedLessons.filter((l) => l.completed).length;
      const progressPercentage = Math.round(
        (completedCount / lessons.length) * 100
      );

      setEnrollment((prev) => ({
        ...prev,
        progress: {
          ...prev.progress,
          completedLessons: completedCount,
          percentage: progressPercentage,
        },
      }));
    } catch (error) {
      console.error("Error marking lesson complete:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!enrollment) {
    return <Navigate to={`/courses/${id}`} replace />;
  }

  const currentLessonData = lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{course?.icon || "📚"}</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {course?.title}
                </h1>
                <p className="text-sm text-gray-500">
                  Progress: {enrollment?.progress?.percentage || 0}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${enrollment?.progress?.percentage || 0}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {enrollment?.progress?.percentage || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Video/Content Area */}
              <div className="aspect-video bg-black relative">
                {currentLessonData?.videoUrl ? (
                  <iframe
                    src={currentLessonData.videoUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    title={currentLessonData.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <BookOpenIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No video available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {currentLessonData.title}
                    </h2>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{currentLessonData.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {currentLessonData.type === "live" ? (
                          <VideoCameraIcon className="w-4 h-4" />
                        ) : (
                          <PlayIcon className="w-4 h-4" />
                        )}
                        <span className="capitalize">
                          {currentLessonData.type} Class
                        </span>
                      </div>
                    </div>
                  </div>
                  {!currentLessonData.completed && (
                    <button
                      onClick={markLessonComplete}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    {["lessons", "notes", "resources"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                          activeTab === tab
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                  {activeTab === "lessons" && (
                    <div className="prose max-w-none">
                      <h4 className="text-lg font-semibold mb-3">
                        Lesson Topics:
                      </h4>
                      {currentLessonData?.topics?.length > 0 ? (
                        <ul className="list-disc list-inside space-y-2">
                          {currentLessonData.topics.map((topic, index) => (
                            <li key={index} className="text-gray-700">
                              {topic}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">
                          No topics available for this lesson.
                        </p>
                      )}
                    </div>
                  )}
                  {activeTab === "notes" && (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Take notes during the lesson:
                      </p>
                      <textarea
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Write your notes here..."
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Save Notes
                      </button>
                    </div>
                  )}
                  {activeTab === "resources" && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                        <span className="flex-1">Lesson Slides.pdf</span>
                        <button className="text-blue-600 hover:text-blue-700">
                          Download
                        </button>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                        <span className="flex-1">Additional Reading.pdf</span>
                        <button className="text-blue-600 hover:text-blue-700">
                          Download
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Lesson List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Course Content</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {lessons.filter((l) => l.completed).length} of{" "}
                  {lessons.length} lessons completed
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonClick(index)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      currentLesson === index
                        ? "bg-blue-50 border-r-2 border-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {lesson.completed ? (
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        ) : lesson.type === "video" ? (
                          <PlayIcon className="w-4 h-4 text-gray-400" />
                        ) : (
                          <BookOpenIcon className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {lesson.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {lesson.duration}
                          </span>
                          {lesson.type === "live" && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              Live
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
