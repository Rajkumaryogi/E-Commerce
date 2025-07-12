import API from '../api/axios';

export const register = async (username, email, password) => {
  const response = await API.post('/register', { username, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await API.post('/login', { email, password });
  return response.data;
};

export const logout = async () => {
  await API.post('/logout');
};

export const getCurrentUser = async () => {
  const response = await API.get('/users/me');
  return response.data;
};