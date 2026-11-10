import { FilterField } from "@/components/layout/filter";
import { FormFilters } from "./types";

export const filterFields: FilterField<FormFilters>[] = [
  { name: "healthUnity", label: "Unidade de Saúde", placeholder: "Ex: UBS Central" },
  { name: "nis", label: "Nº Cadastro Único (NIS)", placeholder: "Ex: 123.456" },
  { name: "registration", label: "Nº da Matrícula", placeholder: "Ex: MAT-2026" },
  { name: "studentName", label: "Nome do Atendido", placeholder: "Ex: João da Silva" },
  { name: "studentAge", label: "Idade", type: "number", placeholder: "Ex: 10" },
  { name: "studentRa", label: "RA", placeholder: "Ex: 98765432" },
];