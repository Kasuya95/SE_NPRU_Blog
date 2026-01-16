import axios from "axios";
import TokenService from "./token.service";
const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = TokenService.getAccessToken();
  console.log(baseURL);
  if (token) {
    config.headers["x-access-token"] = token;
  }
  // For FormData, let axios automatically set Content-Type with boundary
  // Don't override Content-Type for FormData
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

export default instance;
