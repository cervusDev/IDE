interface IList {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface IListUserRepositoryOutputData {
  list: IList[];
}
