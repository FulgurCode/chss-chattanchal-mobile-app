import axios from "axios";

var Axios = axios.create({
  baseURL: "http://192.168.250.147:9000/api/",
  withCredentials: true,
});

export default Axios;