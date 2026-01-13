import { Link } from "react-router-dom";
import {
  PlayIcon,
  BellIcon,
  CreditCardIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { useDashboard } from "../../hooks/useDashboard";
import { useStudentMeetings } from "../../hooks/useStudentMeetings";
import { FullScreenLoader } from "../../components/Loader";
import { formatDistanceToNow } from "date-fns";

const StudentDashboard = () => {
  const { auth } = useAuth();
  const { data, loading, error } = useDashboard();
  const { meetings } = useStudentMeetings();
  const { notifications } = useNotifications();

  if (loading) return <FullScreenLoader />;
  if (error)
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;

  const stats = data?.stats || {
    enrolledCourses: 0,
    completedCourses: 0,
    totalProgress: 0,
  };
  const courses = data?.courses || [];
  const payments = data?.payments || [];

  const upcomingMeetings = meetings
    .filter((m) => {
      const now = new Date();
      const meetingTime = new Date(m.scheduledAt);

      if (isNaN(meetingTime)) return false;

      const diffInMinutes = (meetingTime - now) / 60000;

      return (
        m.status === "live" || // live now
        diffInMinutes >= 0 || // future
        diffInMinutes > -m.duration // recently started but valid
      );
    })
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {auth.user.name}🙏
        </h2>
        <p className="text-blue-100">
          Continue your journey towards mastering Ayurveda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Courses Enrolled
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.enrolledCourses}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hours Learned</p>
              <p className="text-3xl font-bold text-gray-900">
                {Math.round(stats.totalProgress)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certificates</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.completedCourses}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            My Courses
          </h3>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{course.thumbnail}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {course.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <Link
                  to={`/course-player/${course.id}`}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <PlayIcon className="w-4 h-4" />
                  <span>Continue Learning</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Live Classes */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Upcoming Live Classes
            </h3>
            <Link
              to="/dashboard/live-classes"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingMeetings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <VideoCameraIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No upcoming live classes</p>
                <Link
                  to="/dashboard/live-classes"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Check all classes
                </Link>
              </div>
            ) : (
              upcomingMeetings.map((meeting) => {
                const canJoin = () => {
                  const now = new Date();
                  const meetingTime = new Date(meeting.scheduledAt);
                  const timeDiff = meetingTime - now;
                  return (
                    meeting.status === "live" ||
                    (timeDiff <= 15 * 60 * 1000 &&
                      timeDiff > -meeting.duration * 60 * 1000)
                  );
                };

                return (
                  <div
                    key={meeting._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {meeting.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {meeting.courseId?.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(meeting.scheduledAt).toLocaleString(
                            "en-IN",
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                      <div className="ml-3">
                        {meeting.status === "live" && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            🔴 Live
                          </span>
                        )}
                        {canJoin() && meeting.status === "scheduled" && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Can Join
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Notifications
          </h3>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BellIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification._id}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
                >
                  <BellIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Payments
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Course
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{payment.course}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {payment.amount}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{payment.date}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
