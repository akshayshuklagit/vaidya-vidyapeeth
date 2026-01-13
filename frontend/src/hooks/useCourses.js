import { useState, useEffect } from "react";
import api from "../utils/api";

export const useCourses = (filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const params = new URLSearchParams(filters);
        const response = await api.get(`/courses?${params}`);
        setCourses(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [JSON.stringify(filters)]);

  return { courses, loading, error, refetch: () => window.location.reload() };
};

export const useAdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/courses/admin");
      setCourses(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async (courseData) => {
    const response = await api.post("/courses/admin", courseData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await fetchCourses();
    return response.data.data;
  };

  const updateCourse = async (id, courseData) => {
    const response = await api.put(`/courses/admin/${id}`, courseData);
    await fetchCourses();
    return response.data.data;
  };

  const deleteCourse = async (id) => {
    await api.delete(`/courses/admin/${id}`);
    await fetchCourses();
  };

  return {
    courses,
    loading,
    error,
    createCourse,
    updateCourse,
    deleteCourse,
    refetch: fetchCourses,
  };
};
export const useCourseBySlug = (slug) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/courses/slug/${slug}`);

        setCourse(response.data.data);
      } catch (err) {
        console.error("Error fetching course by slug:", err);
        setError(err.response?.data?.error || "Course not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  return { course, loading, error };
};

// Add getCourseById function
export const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data.data;
};

export const getCourseBySlug = async (slug) => {
  const response = await api.get(`/courses/slug/${slug}`);
  return response.data.data;
};
