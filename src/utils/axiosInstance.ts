import axios from 'axios';

// Set the base URL globally for all requests
const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BACKEND_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true
});


// Set the base URL globally for all requests
export const axiosChat = axios.create({
  baseURL: import.meta.env.VITE_CHAT_BACKEND_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});


// Set the base URL globally for all requests
export const axiosTask = axios.create({
  baseURL: import.meta.env.VITE_TASK_BACKEND_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true
});

export default axiosAuth;