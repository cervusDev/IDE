export interface FormListItem {
  id: string;
  registration: string;          // Matrícula
  healthUnity: string;           // Unidade de Saúde
  nis?: string;                  // Cadastro Único (NIS)
  studentName: string;           // Nome do Atendido
  studentAge: string;            // Idade
  studentRa: string;             // RA
  legalGuardianName: string;     // Responsável Legal
  createdAt: string;             // Data de Cadastro
}

export interface FormFilters {
  healthUnity?: string;
  nis?: string;
  registration?: string;
  studentName?: string;
  studentAge?: string;
  studentRa?: string;
}