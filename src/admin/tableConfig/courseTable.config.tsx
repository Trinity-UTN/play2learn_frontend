import { FaEdit, FaTrash } from "react-icons/fa";
import type { DataTableColumn, DataTableAction } from "@/shared";
import type { CourseResponseDto } from "@/admin";

export const getCourseColumns = (
  styles: Record<string, string>
): DataTableColumn<CourseResponseDto>[] => [
  {
    key: "id",
    label: "ID",
    sortable: true,
    width: "100px",
    className: styles.idColumn,
    render: (curso) => <span className={styles.idBadge}>{curso.id}</span>,
  },
  {
    key: "name",
    label: "Nombre del curso",
    sortable: true,
    className: styles.nameColumn,
    render: (course) => (
      <div className={styles.nameWrapper}>
        <span>{course.name}</span>
      </div>
    ),
  },
  {
    key: "year",
    label: "Nombre del Año",
    sortable: true,
    className: styles.nameColumn,
    render: (course) => (
      <div className={styles.nameWrapper}>
        <span>{course.year.name}</span>
      </div>
    ),
  },
];

export const getCourseActions = ({
  styles,
  handleEdit,
  handleDelete,
}: {
  styles: Record<string, string>;
  handleEdit: (course: CourseResponseDto) => void;
  handleDelete: (course: CourseResponseDto) => void;
}): DataTableAction<CourseResponseDto>[] => [
  {
    label: "Editar",
    icon: <FaEdit />,
    onClick: handleEdit,
    variant: "ghost",
    className: styles.editButton,
    title: "Modificar curso",
  },
  {
    label: "Eliminar",
    icon: <FaTrash />,
    onClick: handleDelete,
    variant: "ghost",
    className: styles.deleteButton,
    title: "Eliminar curso",
  },
];
