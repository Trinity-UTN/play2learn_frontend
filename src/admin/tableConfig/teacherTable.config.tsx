import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import type { DataTableColumn, DataTableAction } from "@/shared";
import type { TeacherResponseDto } from "@/admin";

export const getTeacherColumns = (
  styles: Record<string, string>,
  handleRestore: (teacher: TeacherResponseDto) => void
): DataTableColumn<TeacherResponseDto>[] => [
  {
    key: "id",
    label: "ID",
    sortable: true,
    width: "100px",
    className: styles.idColumn,
    render: (teacher) => <span className={styles.idBadge}>{teacher.id}</span>,
  },
  {
    key: "name",
    label: "Nombre",
    sortable: true,
    className: styles.nameColumn,
    render: (teacher) => (
      <div className={styles.nameWrapper}>
        <span>{teacher.name}</span>
      </div>
    ),
  },
  {
    key: "lastname",
    label: "Apellido",
    sortable: true,
    className: styles.nameColumn,
    render: (teacher) => (
      <div className={styles.nameWrapper}>
        <span>{teacher.lastname}</span>
      </div>
    ),
  },
  {
    key: "dni",
    label: "DNI",
    sortable: true,
    className: styles.nameColumn,
    render: (teacher) => (
      <div className={styles.nameWrapper}>
        <span>{teacher.dni}</span>
      </div>
    ),
  },
  {
    key: "user",
    label: "Email",
    sortable: true,
    className: styles.nameColumn,
    render: (teacher) => (
      <div className={styles.nameWrapper}>
        <span>{teacher.user.email}</span>
      </div>
    ),
  },
  {
    key: "active",
    label: "Estado",
    sortable: true,
    className: styles.nameColumn,
    render: (teacher) => (
      <div className={styles.nameWrapper}>
        {teacher.active ? (
          <div className={styles.status} style={{ backgroundColor: "#059669" }}>
            Activo
          </div>
        ) : (
          <button
            className={styles.btnStatus}
            style={{ backgroundColor: "#dc2626" }}
            onClick={() => handleRestore(teacher)}
          >
            De baja
          </button>
        )}
      </div>
    ),
  },
];

export const getTeacherActions = ({
  styles,
  handleEdit,
  handleDelete,
  handleRestorePassword,
}: {
  styles: Record<string, string>;
  handleEdit: (teacher: TeacherResponseDto) => void;
  handleDelete: (teacher: TeacherResponseDto) => void;
  handleRestorePassword: (teacher: TeacherResponseDto) => void;
}): DataTableAction<TeacherResponseDto>[] => [
  {
    label: "Editar",
    icon: <FaEdit />,
    onClick: handleEdit,
    variant: "ghost",
    className: styles.editButton,
    title: "Modificar docente",
  },
  {
    label: "Eliminar",
    icon: <FaTrash />,
    onClick: handleDelete,
    variant: "ghost",
    className: styles.deleteButton,
    title: "Eliminar docente",
  },
  {
    label: "Restaurar contraseña",
    icon: <MdOutlineSettingsBackupRestore />,
    onClick: handleRestorePassword,
    variant: "ghost",
    className: styles.restoreButton,
    title: "Restaurar contraseña",
  },
];
