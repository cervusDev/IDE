interface IJwtTokenConfig {
  expiresIn: '1d';
  secret: string;
}

const ONE_DAY = '1d';
const jwtTokenConfig: IJwtTokenConfig = {
  expiresIn: ONE_DAY,
  secret: process.env.JWT_SECRET || '',
};

export default jwtTokenConfig;
