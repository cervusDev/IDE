export interface IListScreeningOutputData {
  list: {
    studentName: string;
    studentAge: number;
    legalGuardianName: string;
    nis: string | null;
    healthUnity: string;
    registration: string;
  }[]
  pagination: {
    total: number;
    page: number;
    limit: number;
  }
}