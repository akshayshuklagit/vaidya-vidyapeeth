import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useAdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, []);

  return { data, loading, error };
};