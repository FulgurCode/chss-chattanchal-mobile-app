import axios from "axios";

var Axios = axios.create({
  baseURL: "http://192.168.20.13:9000/api/",
  withCredentials: true,
});

export default Axios;