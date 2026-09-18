import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configure Axios default base URL (Render / Production ready)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  axios.defaults.baseURL = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

  // Add auth header for requests if logged in
  useEffect(() => {
    if (userInfo && userInfo.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [userInfo]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      const msg = err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
      setError(msg);
      throw new Error(msg);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/users', { name, email, password });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      const msg = err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  const updateProfile = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.put('/api/users/profile', user);
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      const msg = err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
      setError(msg);
      throw new Error(msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
