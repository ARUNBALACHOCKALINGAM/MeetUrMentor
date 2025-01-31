import axios from 'axios';

// Set the base URL globally for all requests
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;