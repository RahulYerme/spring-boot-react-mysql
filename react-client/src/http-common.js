import axios from "axios";

export default axios.create({
  baseURL: "http://173.255.115.177:32535/api",
  headers: {
    "Content-type": "application/json"
  }
});
