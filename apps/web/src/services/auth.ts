import apiClient from "./config/axios";
import type { AxiosResponse } from "axios";

interface ILoginOutput {
  token: string;
  // role: {
  //   roleId: string;
  //   userId: string;
  //   role: {
  //     id: string;
  //     name: string;
  //     description: string;
  //   };
  // };
}

interface ILoginResponse {
  token: string;
  // role: {
  //   roleId: string;
  //   userId: string;
  //   role: {
  //     id: string;
  //     name: string;
  //     description: string;
  //   };
  // };
}

interface ILoginInput {
  email: string;
  password: string;
}

interface IAuthRepository {
  login(input: ILoginInput): Promise<ILoginOutput>;
}

export class AuthService implements IAuthRepository {
  public async login(input: ILoginInput): Promise<ILoginOutput> {
    const { data } = await apiClient.post<AxiosResponse<ILoginResponse>>(
      "/auth",
      input
    );

    const { 
      token, 
      // role 
    } = data as unknown as ILoginResponse;

    return {
      token
      // role,
    };
  }
}