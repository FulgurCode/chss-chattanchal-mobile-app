import axios from "axios";

var Axios = axios.create({
  // baseURL: "http://localhost:9000/api/",
  // baseURL: "http://192.168.162.147:9000/api/",
  baseURL: "http://192.168.162.147:9000/api/",
  withCredentials: true,
});

export default Axios;