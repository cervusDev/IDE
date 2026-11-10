import { Column } from "@/components/layout/table";
import { Eye, Edit } from "lucide-react";
import { FormListItem } from "./types";
import Link from "next/link";

export const formColumns: Column<FormListItem>[] = [
  { header: "Matrícula", accessorKey: "registration", className: "font-medium text-zinc-900" },
  { header: "Unidade de Saúde", accessorKey: "healthUnity" },
  { header: "Cad. Único (NIS)", cell: (item) => <span className="text-zinc-600">{item.nis || "Não informado"}</span> },
  { header: "Nome do Atendido", accessorKey: "studentName", className: "font-semibold text-zinc-900" },
  { header: "Idade", cell: (item) => `${item.studentAge} anos` },
  { header: "RA", accessorKey: "studentRa", className: "text-zinc-600" },
  { header: "Responsável Legal", accessorKey: "legalGuardianName" },
  {
    header: "Ações",
    className: "text-center",
    cell: (item) => (
      <div className="flex items-center justify-center gap-2">
        {/* Botão de Ver Detalhes (Modo Leitura) */}
        <Link
          href={`/painel_controle/formulario_psicossocial/${item.id}/visualizar`}
          title="Ver Detalhes"
          className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl transition-all shadow-sm active:scale-95"
        >
          <Eye className="w-4 h-4" />
        </Link>

        {/* Botão de Editar */}
        <Link
          href={`/painel_controle/formulario_psicossocial/${item.id}`}
          title="Editar"
          className="p-2 bg-blue-50 hover:bg-blue-100 text-[#307FE2] rounded-xl transition-all shadow-sm active:scale-95"
        >
          <Edit className="w-4 h-4" />
        </Link>
      </div>
    ),
  },
];