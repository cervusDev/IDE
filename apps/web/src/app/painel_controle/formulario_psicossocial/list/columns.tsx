import { Column } from "@/components/layout/table";
import { Eye, Edit, Trash2 } from "lucide-react";
import { FormListItem } from "./types";
import { RowActionItem, RowActionsMenu } from "@/components/layout/row-actions";

interface GetFormColumnsOptions {
  onDelete?: (item: FormListItem) => Promise<void> | void;
}

export function getFormColumns({
  onDelete,
}: GetFormColumnsOptions = {}): Column<FormListItem>[] {
  const actions: RowActionItem<FormListItem>[] = [
    {
      label: "Ver Detalhes",
      icon: <Eye className="w-4 h-4 text-zinc-600" />,
      href: (item) => `/painel_controle/formulario_psicossocial/${item.id}/visualizar`,
    },
    {
      label: "Editar",
      icon: <Edit className="w-4 h-4 text-[#307FE2]" />,
      variant: "primary",
      href: (item) => `/painel_controle/formulario_psicossocial/${item.id}`,
    },
    {
      label: "Excluir",
      icon: <Trash2 className="w-4 h-4 text-red-600" />,
      variant: "danger",
      dividerBefore: true,
      hidden: !onDelete,
      onClick: onDelete,
      confirm: {
        title: "Confirmar exclusão",
        description: (item) => (
          <>
            Deseja realmente excluir o registro de{" "}
            <strong className="text-zinc-900">{item.studentName}</strong>?
          </>
        ),
        confirmLabel: "Excluir",
        loadingLabel: "Excluindo...",
      },
    },
  ];

  return [
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
      cell: (item) => <RowActionsMenu item={item} actions={actions} />,
    },
  ];
}