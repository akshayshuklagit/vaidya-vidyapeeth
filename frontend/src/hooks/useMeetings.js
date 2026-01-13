import { useState, useEffect } from "react";
import api from "../utils/api";

export const useMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses/admin");
      setCourses(response.data.data || []);
      return response.data.data || [];
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
      return [];
    }
  };

  const fetchMeetings = async (courseList) => {
    try {
      setError(null);

      if (!courseList || courseList.length === 0) {
        setMeetings([]);
        return;
      }

      const allMeetings = [];

      // Fetch meetings for all courses
      for (const course of courseList) {
        try {
          const response = await api.get(
            `/zoom/courses/${course._id}/meetings`
          );
          if (response.data.success) {
            allMeetings.push(...response.data.data);
          }
        } catch (err) {
          console.error(
            `Error fetching meetings for course ${course._id}:`,
            err
          );
          // Continue with other courses even if one fails
        }
      }

      setMeetings(
        allMeetings.sort(
          (a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt)
        )
      );
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch meetings");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const courseList = await fetchCourses();
        await fetchMeetings(courseList);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const createMeeting = async (meetingData) => {
    const response = await api.post("/zoom/meetings", meetingData);
    await fetchMeetings(courses);
    return response.data.data;
  };

  const startMeeting = async (meetingId) => {
    const response = await api.post(`/zoom/meetings/${meetingId}/start`);
    await fetchMeetings(courses);
    return response.data.data;
  };

  const joinMeeting = async (meetingId) => {
    const response = await api.get(`/zoom/meetings/${meetingId}/join`);
    return response.data.data;
  };

  return {
    meetings,
    courses,
    loading,
    error,
    createMeeting,
    startMeeting,
    joinMeeting,
    refetch: () => fetchMeetings(courses),
  };
};
