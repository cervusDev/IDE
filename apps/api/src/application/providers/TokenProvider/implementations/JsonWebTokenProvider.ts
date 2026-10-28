import { JwtPayload, sign, verify } from 'jsonwebtoken';

import jwtTokenConfig from '@config/jwtToken';

import DecodeTokenOutputData from '../dtos/decodeToken/OutputData';
import GenerateTokenInputData from '../dtos/generateToken/InputData';
import ITokenProvider from '../ITokenProvider';

interface IJwtVerifyResponse extends JwtPayload {
  adminId: string;
}

class JsonWebTokenProvider implements ITokenProvider {
  public decode(token: string): DecodeTokenOutputData {
    const { adminId } = verify(token, jwtTokenConfig.secret) as IJwtVerifyResponse;
    const outputData = new DecodeTokenOutputData({
      id: adminId,
    });
    return outputData;
  }

  public generate(inputData: GenerateTokenInputData): string {
    const tokenGenerated = sign(inputData.payload, jwtTokenConfig.secret, {
      expiresIn: jwtTokenConfig.expiresIn,
    });
    return tokenGenerated;
  }
}

export default JsonWebTokenProvider;
