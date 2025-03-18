import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://hybrid.srishticampus.in/strartup_api/",

  // baseURL: 'http://localhost:4040/strartup_api/', 
  

  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

