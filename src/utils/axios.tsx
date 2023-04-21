import axios from "axios";

const instance = axios.create({
  baseURL: "https://your-api-url.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
