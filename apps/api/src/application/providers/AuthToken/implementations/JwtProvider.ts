import jwtEnv from '@environment/jwtEnv';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

import IDecryptAuthTokenOutput from '../dtos/decrypt/IInputData';
import IAuthTokenProvider from '../IAuthTokenProvider';

interface IJwtVerifyResponse extends JwtPayload {
  id: number;
}

class JwtProvider implements IAuthTokenProvider {
  public async decrypt(token: string): Promise<IDecryptAuthTokenOutput> {
    const { id } = jsonwebtoken.verify(
      token,
      jwtEnv.secret,
    ) as IJwtVerifyResponse;
    const outputData: IDecryptAuthTokenOutput = {
      adminId: id,
    };
    return outputData;
  }
}

export default JwtProvider;
