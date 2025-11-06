import axios from 'axios';

const requester = axios.create({
  baseURL: 'http://localhost:5000/api', // Assuming your backend runs on port 5000 and has an /api prefix
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