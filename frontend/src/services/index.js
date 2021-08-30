import axios from "axios";
const configHeaders = {
  "content-type": "application/json",
  Accept: "application/json",
};
const apiClient = axios.create({
  baseURL: "http://localhost:8000/",
  // withCredentials: true, //Esto es para SPA con sanctum
  headers: configHeaders,
});
export default apiClient;
