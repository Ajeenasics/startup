import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://hybrid.srishticampus.in/strartup_api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
const axiosInstance = axios.create({
  baseURL: "http://localhost:4040/strartup_api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;