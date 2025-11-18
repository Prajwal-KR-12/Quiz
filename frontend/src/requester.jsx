import axios from 'axios';

console.log('API URL:', process.env.REACT_APP_API_URL);

const requester = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Assuming your backend runs on port 5000 and has an /api prefix
  withCredentials: true, // Important for sending cookies with requests
});

export const registerUser = async (userData) => {
  try {
    const response = await requester.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default requester;