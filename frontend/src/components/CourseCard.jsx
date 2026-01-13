import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { useLanguage } from "../contexts/LanguageContext";

const CourseCard = ({ course, index = 0 }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group h-full"
    >
      <div className="h-full glassmorphism rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
        {/* Image */}
        <div className="relative h-38 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            {/* {course.icon || "🌿"} */}
            <img src={`${course.thumbnail.url}`} alt="" />
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {course.flags?.isNew && (
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                NEW
              </span>
            )}
            {course.flags?.isBestSeller && (
              <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                ⭐ BESTSELLER
              </span>
            )}
          </div>
          {/* Level Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full">
              {course.level}
            </span>
          </div>
          {/* Live Sessions Badge */}
          {course.flags?.hasLiveSessions && (
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                <VideoCameraIcon className="w-3 h-3" />
                LIVE
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              {course.category}
            </span>
          </div>

          {/* Title */}
          <Link to={`/courses/${course.slug}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {course.title}
            </h3>
          </Link>

          {/* Sanskrit Name */}
          {course.sanskritName && (
            <p className="text-sm text-gray-500 italic mb-3">
              {course.sanskritName}
            </p>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {course.instructor?.name?.charAt(0) || "V"}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900">
                {course.instructor?.name || "Vaidya"}
              </p>
              <p className="text-xs text-gray-500">
                {course.instructor?.title || "Ayurveda Expert"}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-600">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-600">
                {course.students} {t("students")}
              </span>
            </div>
          </div>

          {/* Features */}
          {course.features && course.features.length > 0 && (
            <div className="space-y-2 mb-4">
              {course.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-green-500 text-sm">✓</span>
                  <span className="text-xs text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ₹{course.price}
              </div>
              {course.originalPrice && (
                <div className="text-sm text-gray-400 line-through">
                  ₹{course.originalPrice}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Link to={`/courses/${course.slug}`}>
                <Button variant="outline" size="sm">
                  {t("viewDetails")}
                </Button>
              </Link>
              {/* <a
                href={course.registrationFormUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm">Enroll Now</Button>
              </a> */}
              <Link to={`/courses/${course.slug}`}>
                <Button size="sm">Enroll Now</Button>
              </Link>
            </div>
          </div>

          {/* Certificate Badge */}
          {course.flags?.hasCertificate && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <AcademicCapIcon className="w-4 h-4" />
                <span className="font-medium">{t("certificate")} Included</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
