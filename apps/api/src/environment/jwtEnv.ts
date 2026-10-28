import { envConfig } from '@config/env';

interface IJwtEnv {
  secret: string;
}

const jwtEnv: IJwtEnv = {
  secret: envConfig.JWT_SECRET,
};

export default jwtEnv;
