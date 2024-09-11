import axios from "axios";

export const api = axios.create({
  baseURL: "https://users-api-1-zqfm.onrender.com",
  timeout: 8 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
