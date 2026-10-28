import IDecryptAuthTokenOutput from "./dtos/decrypt/IInputData";

interface IAuthTokenProvider {
  decrypt(token: string): Promise<IDecryptAuthTokenOutput>;
}

export default IAuthTokenProvider;
