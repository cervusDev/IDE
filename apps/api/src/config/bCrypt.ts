interface IBCryptConfig {
  salt: number;
}

const SALT = 8;
const bCryptConfig: IBCryptConfig = {
  salt: SALT,
};

export default bCryptConfig;
