import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import bCryptConfig from '@config/bCrypt';
import IHashProvider from '../IHashProvider';
import ICreateHashInputData from '../dtos/ICreateHashInputData';
import ICompareHashInputData from '../dtos/ICompareHashInputData';

export class HashProvider implements IHashProvider {
  public async compare(inputData: ICompareHashInputData): Promise<boolean> {
    const isEqual = await bcryptjs.compare(inputData.text, inputData.hashed);
    return isEqual;
  }

  public create(inputData: ICreateHashInputData): string {
    const uuid = crypto.randomUUID();
    const uuidClean = uuid.replace(/-/g, '');
    const hash = uuidClean.substring(0, inputData.length);
    return hash;
  }

  public async encrypt(text: string): Promise<string> {
    const textEncrypted = await bcryptjs.hash(text, bCryptConfig.salt);
    return textEncrypted;
  }
}
