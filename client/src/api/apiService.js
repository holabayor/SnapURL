import { api } from '.';

const signupUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.clear();
    throw error.response.data;
  }
};

const loginUser = async (loginCredentials) => {
  try {
    const response = await api.post('/auth/login', loginCredentials);
    console.log(response);
    localStorage.setItem('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshtoken');
    return response.data;
  } catch (error) {
    console.clear();
    return Promise.reject(error);
  }
};

export { signupUser, loginUser };
