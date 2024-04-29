import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const checkLoginStatus = async () => {
      try {
        const response = await api.get('/validate-login');
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('accessToken', response.data.data.token);
      localStorage.setItem('refreshToken', 'refreshtoken');
      setLoading(false);
      console.log(response.data);
      setUser(response.data.data.user);
      return response.data;
    } catch (error) {
      setLoading(false);
      // console.clear();
      return Promise.reject(error.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    api.post('/auth/logout');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
