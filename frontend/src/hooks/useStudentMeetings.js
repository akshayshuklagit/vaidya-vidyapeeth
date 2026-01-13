import { useState, useEffect } from "react";
import api from "../utils/api";

export const useStudentMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await api.get("/users/enrolled-courses");

      return res.data.data || [];
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      return [];
    }
  };

  const fetchMeetings = async (courseList) => {
    if (!courseList?.length) {
      setMeetings([]);
      return;
    }

    const allMeetings = [];

    for (const course of courseList) {
      try {
        const res = await api.get(`/zoom/courses/${course._id}/meetings`);

        if (res.data.success) {
          allMeetings.push(...res.data.data);
        }
      } catch (error) {
        console.error(
          `Error fetching meetings for course ${course._id}:`,
          error
        );
      }
    }

    const uniqueMeetings = Array.from(
      new Map(allMeetings.map((m) => [m._id, m])).values()
    );

    setMeetings(
      uniqueMeetings.sort(
        (a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt)
      )
    );
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const courses = await fetchEnrolledCourses();
        setEnrolledCourses(courses);
        await fetchMeetings(courses);
      } catch {
        setError("Failed to load meetings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Join meeting endpoint
  const joinMeeting = async (meetingId) => {
    try {
      setJoining(true);

      const res = await api.post(`/zoom/meetings/${meetingId}/join`);

      return res.data.data;
    } catch (error) {
      console.error("Join meeting error:", error);
      throw error;
    } finally {
      setJoining(false);
    }
  };

  return {
    meetings,
    enrolledCourses,
    loading,
    joining,
    error,
    joinMeeting,
    refetch: () => fetchMeetings(enrolledCourses),
  };
};
