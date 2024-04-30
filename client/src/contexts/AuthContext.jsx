import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    setLoading(true);
    const checkLoginStatus = async () => {
      try {
        const response = await api.get('auth/validate-login');
        setUser(response.data.data);
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      setUser(response.data.data);
      setIsLoggedIn(true);
      return response.data;
    } catch (error) {
      // console.clear();
      return Promise.reject(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout failed: ', error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
