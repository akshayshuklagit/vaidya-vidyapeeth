import { useState, useEffect } from "react";
import api from "../utils/api";

export const useStudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const res = await api.get("/users/enrolled-courses");
        setCourses(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return { courses, loading, error };
};
