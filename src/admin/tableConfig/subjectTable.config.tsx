import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import type { DataTableColumn, DataTableAction } from "@/shared";
import { type SubjectResponseDto } from "@/admin";

export const getSubjectColumns = (
  styles: Record<string, string>
): DataTableColumn<SubjectResponseDto>[] => [
  {
    key: "id",
    label: "ID",
    sortable: true,
    width: "100px",
    className: styles.idColumn,
    render: (subject) => <span className={styles.idBadge}>{subject.id}</span>,
  },
  {
    key: "name",
    label: "Nombre",
    sortable: true,
    className: styles.nameColumn,
    render: (subject) => (
      <div className={styles.nameCell}>
        <div className={styles.nameWrapper}>
          <span>{subject.name}</span>
        </div>
      </div>
    ),
  },
  {
    key: "year",
    label: "Año",
    sortable: true,
    className: styles.nameColumn,
    render: (subject) => (
      <div className={styles.nameCell}>
        <div className={styles.nameWrapper}>
          <span>{subject.course?.year?.name || "Sin asignar"}</span>
        </div>
      </div>
    ),
  },
  {
    key: "course",
    label: "Curso",
    sortable: true,
    className: styles.nameColumn,
    render: (subject) => (
      <div className={styles.nameCell}>
        <div className={styles.nameWrapper}>
          <span>{subject.course?.name || "Sin asignar"}</span>
        </div>
      </div>
    ),
  },
  {
    key: "teacher",
    label: "Docente",
    sortable: true,
    className: styles.nameColumn,
    render: (subject) => (
      <div className={styles.nameCell}>
        <div className={styles.nameWrapper}>
          <FaUser
            className={
              subject.teacher?.name
                ? styles.teacherIcon
                : styles.teacherIconUnassigned
            }
          />
          <span>
            {subject.teacher
              ? subject.teacher.name + " " + subject.teacher.lastname
              : "Sin asignar"}
          </span>
        </div>
      </div>
    ),
  },
];

export const getSubjectActions = ({
  styles,
  handleEdit,
  handleDelete,
}: {
  styles: Record<string, string>;
  handleEdit: (subject: SubjectResponseDto) => void;
  handleDelete: (subject: SubjectResponseDto) => void;
}): DataTableAction<SubjectResponseDto>[] => [
  {
    label: "Editar",
    icon: <FaEdit />,
    onClick: handleEdit,
    variant: "ghost",
    className: styles.editButton,
    title: "Modificar materia",
  },
  {
    label: "Eliminar",
    icon: <FaTrash />,
    onClick: handleDelete,
    variant: "ghost",
    className: styles.deleteButton,
    title: "Eliminar materia",
  },
];
