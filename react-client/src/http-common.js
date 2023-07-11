import axios from "axios";

export default axios.create({
  baseURL: "http://172.31.229.127:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
