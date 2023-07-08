import axios from "axios";

var Axios = axios.create({
  baseURL: "http://192.168.201.147:9000/api/",
  // baseURL: "https://chattanchalhss.com/api/",
  withCredentials: true,
});

export default Axios;