import axios from "axios";

const axiosApi= axios.create({
  baseURL: process.env.BE_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;