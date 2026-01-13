import { useState, useEffect } from 'react';
import api from '../utils/api';

export const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get('/payments/history');
        setPayments(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const createPaymentOrder = async (courseId) => {
    const response = await api.post('/payments/create', { courseId });
    return response.data;
  };

  const verifyPayment = async (paymentData) => {
    const response = await api.post('/payments/verify', paymentData);
    return response.data.data;
  };

  const getUserEnrollments = async () => {
    const response = await api.get('/payments/enrollments');
    return response.data.data;
  };

  return { 
    payments, 
    loading, 
    error, 
    createPaymentOrder, 
    verifyPayment,
    getUserEnrollments
  };
};

export const useAdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get('/admin/payments');
        setPayments(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return { payments, loading, error };
};