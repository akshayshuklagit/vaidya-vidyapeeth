import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useStudentMeetings } from "../../hooks/useStudentMeetings";
import { useAuth } from "../../contexts/AuthContext";
import { FullScreenLoader } from "../../components/Loader";

const StudentLiveClasses = () => {
  const { meetings, loading, error, joinMeeting } = useStudentMeetings();
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (loading) return <FullScreenLoader />;
  if (error)
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;

  const handleJoinMeeting = async (meetingId) => {
    try {
      // console.log("🚀 Starting to join meeting:", meetingId);
      const data = await joinMeeting(meetingId);
      const meeting = meetings.find((m) => m._id === meetingId);
      // console.log("✅ JOIN API RESPONSE:", data);
      // console.log("📋 Meeting data:", meeting);

      const navigationState = {
        meetingNumber: data.meetingNumber,
        password: data.password,
        signature: data.signature,
        sdkKey: data.sdkKey,
        title: meeting?.title || "Live Class",
        courseTitle: meeting?.courseId?.title || "Ayurveda Course",
        participantCount: meeting?.registeredParticipants?.length || 1,
        duration: meeting?.duration || 60,
        userName: data.userName,
        userEmail: data.userEmail,
      };

      // console.log("🧭 Navigation state:", navigationState);
      // console.log("🔄 Navigating to:", `/student/live/${meetingId}`);

      // Navigate to separate classroom page
      navigate(`/student/live/${meetingId}`, {
        state: navigationState,
      });
    } catch (err) {
      console.error("❌ Join meeting error:", err);
      alert(
        "Error: " + (err.response?.data?.error || "Failed to join meeting")
      );
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUpcoming = (meeting) => {
    const now = new Date();
    const start = new Date(meeting.scheduledAt);
    const end = new Date(start.getTime() + meeting.duration * 60000);

    return meeting.status === "live" || now < end;
  };

  const canJoin = (meeting) => {
    const now = new Date();
    const meetingTime = new Date(meeting.scheduledAt);
    const timeDiff = meetingTime - now;

    // Can join 15 minutes before or if meeting is live
    return (
      meeting.status === "live" ||
      (timeDiff <= 15 * 60 * 1000 && timeDiff > -meeting.duration * 60 * 1000)
    );
  };

  const upcomingMeetings = meetings.filter((m) => isUpcoming(m));
  const pastMeetings = meetings.filter((m) => !isUpcoming(m));
  const attendedCount = pastMeetings.length;
  const totalHours = Math.round(
    pastMeetings.reduce((sum, m) => sum + (m.duration || 60), 0) / 60
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Live Classes</h2>
        <p className="text-gray-600">
          Join live sessions with expert instructors
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Upcoming Classes
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {upcomingMeetings.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Classes Attended
              </p>
              <p className="text-3xl font-bold text-green-600">
                {attendedCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <VideoCameraIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hours Learned</p>
              <p className="text-3xl font-bold text-purple-600">{totalHours}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Upcoming Classes
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {upcomingMeetings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No upcoming classes scheduled.
            </div>
          ) : (
            upcomingMeetings.map((meeting) => (
              <div key={meeting._id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">
                        {meeting.title}
                      </h4>
                      {meeting.status === "live" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          🔴 Live Now
                        </span>
                      )}
                      {canJoin(meeting) && meeting.status === "scheduled" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Can Join
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Course: {meeting.courseId?.title}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDateTime(meeting.scheduledAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{meeting.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>
                          {meeting.registeredParticipants?.length || 0}{" "}
                          registered
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    {canJoin(meeting) ? (
                      <button
                        onClick={() => handleJoinMeeting(meeting._id)}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        {meeting.status === "live"
                          ? "Join Now"
                          : "Join Meeting"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium"
                      >
                        Not Available
                      </button>
                    )}
                  </div>
                </div>

                {canJoin(meeting) && meeting.status === "scheduled" && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 You can join this meeting up to 15 minutes before the
                      scheduled time.
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Past Classes */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Past Classes</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {pastMeetings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No past classes yet.
            </div>
          ) : (
            pastMeetings.map((meeting) => (
              <div key={meeting._id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-1">
                      {meeting.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Course: {meeting.courseId?.title}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDateTime(meeting.scheduledAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{meeting.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>
                          {meeting.registeredParticipants?.length || 0} attended
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    <span className="text-sm text-gray-500">Completed</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLiveClasses;
