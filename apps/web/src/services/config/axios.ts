import axios from "axios";
import interceptorSetToken from "./interceptors/setToken";
import { env } from "@/environment/env";

const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interceptorSetToken(apiClient);

export default apiClient;
