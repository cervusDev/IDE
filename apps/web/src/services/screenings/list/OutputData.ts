export interface IListScreeningOutputData {
  list: {
    id: string;
    studentName: string;
    studentAge: string;
    legalGuardianName: string;
    nis: string;
    healthUnity: string;
    studentRa: string;
    registration: string;
  }[]
  pagination: {
    total: number;
    page: number;
    limit: number;
  }
}