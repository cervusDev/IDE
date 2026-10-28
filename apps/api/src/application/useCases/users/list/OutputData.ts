interface IList {
  name: string;
  id: string;
  isActive: boolean;
  email: string;
}

export interface IOutputData {
  list: IList[]
}