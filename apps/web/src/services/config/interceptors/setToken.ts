import type { AxiosInstance } from "axios";

interface ITokenParsed {
  state: {
    token: string;
  };
}

const interceptorSetToken = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("@auth");
      const tokenParse: ITokenParsed = JSON.parse(token as string);

      if (token) {
        config.headers.Authorization = `Bearer ${tokenParse.state.token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default interceptorSetToken;
