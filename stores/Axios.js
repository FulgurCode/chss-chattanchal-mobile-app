import axios from "axios";

var Axios = axios.create({
  baseURL: "http://192.168.162.250:9000/api/",
  withCredentials: true,
});

export default Axios;