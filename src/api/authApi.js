import axios from 'axios';

const baseURL = 'http://localhost:8000/api/auth'; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
