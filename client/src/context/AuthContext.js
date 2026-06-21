import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage on initial load
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      localStorage.removeItem('user');
      return null;
    }
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Only decode token if we don't have user data
      if (!user) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const userData = {
            id: payload.userId,
            email: payload.email,
            role: payload.role,
            isGuest: payload.isGuest || false
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token, user]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Set header synchronously to prevent race conditions on dashboard redirects
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      console.log('register', userData.email);
      const response = await axios.post('/api/auth/register', userData);
      console.log('registered');

      // Server returns { verificationRequired, email } — do NOT set token yet
      if (response.data.verificationRequired) {
        return {
          success: true,
          verificationRequired: true,
          email: response.data.email
        };
      }

      // Direct login (fallback if no OTP required)
      if (response.data.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setToken(response.data.token);
        setUser(response.data.user);
      }
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await axios.post('/api/auth/verify-otp', { email, otp });
      const { token, user } = response.data;
      
      // Set header synchronously to prevent race conditions on dashboard redirects
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // On success, server returns { token, user }
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'OTP verification failed' };
    }
  };

  const startFreeTrial = async () => {
    try {
      const response = await axios.post('/api/auth/register-free', {});
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return { success: true };
    } catch (error) {
      console.error('Free trial error:', error.response?.data);
      return { success: false, error: error.response?.data?.error || 'Failed to start free trial' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, verifyOTP, startFreeTrial, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
