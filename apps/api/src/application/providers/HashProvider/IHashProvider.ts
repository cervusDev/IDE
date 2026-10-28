import ICompareHashInputData from './dtos/ICompareHashInputData';
import ICreateHashInputData from './dtos/ICreateHashInputData';

interface IHashProvider {
  compare(inputData: ICompareHashInputData): Promise<boolean>;
  create(inputData: ICreateHashInputData): string;
  encrypt(text: string): Promise<string>;
}

export default IHashProvider;
