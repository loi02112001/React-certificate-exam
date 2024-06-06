import axios from "axios";
import { API_BASE_URL } from "../utils/Constant";

const axiosClient = axios.create({
  baseURL: API_BASE_URL
});

axiosClient.interceptors.response.use((response) => {
  if (response !== undefined && response.data !== undefined) {
    return response.data;
  }
  return response;
}, async (error) => {
  throw error;
});

export default axiosClient;