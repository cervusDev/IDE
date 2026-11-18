export interface IListScreeningVersionsOutputData {
  list: {
    id: string;
    version: number;
    isLatest: boolean;
  }[]
}