import { FaEdit, FaTrash } from "react-icons/fa";
import type { DataTableColumn, DataTableAction } from "@/shared";
import type { YearResponseDto } from "@/admin";

export const getYearColumns = (
  styles: Record<string, string>,
): DataTableColumn<YearResponseDto>[] => [
  {
    key: "name",
    label: "Nombre del Año",
    sortable: true,
    className: styles.nameColumn,
    render: (year) => (
      <div className={styles.nameWrapper}>
        <span>{year.name}</span>
      </div>
    ),
  },
];

export const getYearActions = ({
  styles,
  handleEdit,
  handleDelete,
}: {
  styles: Record<string, string>;
  handleEdit: (year: YearResponseDto) => void;
  handleDelete: (year: YearResponseDto) => void;
}): DataTableAction<YearResponseDto>[] => [
  {
    label: "Editar",
    icon: <FaEdit />,
    onClick: handleEdit,
    variant: "ghost",
    className: styles.editButton,
    title: "Modificar año",
  },
  {
    label: "Eliminar",
    icon: <FaTrash />,
    onClick: handleDelete,
    variant: "ghost",
    className: styles.deleteButton,
    title: "Eliminar año",
  },
];
