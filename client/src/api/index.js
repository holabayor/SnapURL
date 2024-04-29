import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor to include the token in all requests
// api.interceptors.request.use(
//   async (config) => {
//     // Retrieve the access token from local storage
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor to handle token refresh logic
api.interceptors.request.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        console.log('Unable to refresh token:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
