import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000, // optional: timeout 10s
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;