import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default instance;