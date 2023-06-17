import axios from "axios";

var Axios = axios.create({
  baseURL: "https://chattanchalhss.com/api/",
  withCredentials: true,
});

export default Axios;