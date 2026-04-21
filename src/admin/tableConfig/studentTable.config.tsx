import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import type {
  DataTableColumn,
  DataTableAction,
} from "@/shared/components/DataTable";
import type { StudentResponseDto } from "@/admin";

const StudentStatusTrue = ({ styles }: { styles: Record<string, string> }) => {
  return (
    <div className={styles.status} style={{ backgroundColor: "#059669" }}>
      Activo
    </div>
  );
};

const StudentStatusFalse = ({
  styles,
  student,
  onRestore,
}: {
  styles: Record<string, string>;
  student: StudentResponseDto;
  onRestore: (student: StudentResponseDto) => void;
}) => {
  return (
    <button
      className={styles.btnStatus}
      style={{ backgroundColor: "#dc2626" }}
      onClick={() => onRestore(student)}
    >
      De baja
    </button>
  );
};

export const getStudentColumns = ({
  styles,
  handleRestore,
}: {
  styles: Record<string, string>;
  handleRestore: (student: StudentResponseDto) => void;
}): DataTableColumn<StudentResponseDto>[] => [
  {
    key: "name",
    label: "Nombre",
    sortable: true,
    className: styles.nameColumn,
    render: (student) => (
      <div className={styles.wrapper}>
        <span>{student.name}</span>
      </div>
    ),
  },
  {
    key: "lastname",
    label: "Apellido",
    sortable: true,
    className: styles.nameColumn,
    render: (student) => (
      <div className={styles.wrapper}>
        <span>{student.lastname}</span>
      </div>
    ),
  },
  {
    key: "dni",
    label: "DNI",
    sortable: true,
    className: styles.nameColumn,
    render: (student) => (
      <div className={styles.centeredWrapper}>
        <span>{student.dni}</span>
      </div>
    ),
  },
  {
    key: "birthDate",
    label: "Edad",
    sortable: true,
    className: styles.nameColumn,
    render: (student) => (
      <div className={styles.centeredWrapper}>
        <span>{student.birthDate || "Sin asignar"}</span>
      </div>
    ),
  },
  {
    key: "user",
    label: "Email de Estudiante",
    sortable: true,
    className: styles.nameColumn,
    render: (student) => (
      <div className={styles.wrapper}>
        <span>{student.user.email}</span>
      </div>
    ),
  },
  {
    key: "emailTutor",
    label: "Email de Tutor",
    sortable: true,
    className: styles.nameColumn,
    render: (student) => (
      <div className={styles.wrapper}>
        <span>{student.emailTutor || "Sin asignar"}</span>
      </div>
    ),
  },
  {
    key: "course",
    label: "Curso",
    sortable: true,
    className: styles.nameColumn,
    render: (student) => (
      <div className={styles.wrapper}>
        <span>
          {student.course.year.name} "{student.course.name}"
        </span>
      </div>
    ),
  },
  {
    key: "active",
    label: "Estado",
    sortable: true,
    className: styles.nameColumn,
    render: (student) => (
      <div className={styles.wrapper}>
        {student.active ? (
          <StudentStatusTrue styles={styles} />
        ) : (
          <StudentStatusFalse
            styles={styles}
            student={student}
            onRestore={handleRestore}
          />
        )}
      </div>
    ),
  },
];

export const getStudentActions = ({
  styles,
  handleEdit,
  handleDelete,
  handleRestorePassword,
}: {
  styles: Record<string, string>;
  handleEdit: (student: StudentResponseDto) => void;
  handleDelete: (student: StudentResponseDto) => void;
  handleRestorePassword: (student: StudentResponseDto) => void;
}): DataTableAction<StudentResponseDto>[] => [
  {
    label: "Editar",
    icon: <FaEdit />,
    onClick: handleEdit,
    variant: "ghost",
    className: styles.editButton,
    title: "Modificar estudiante",
  },
  {
    label: "Eliminar",
    icon: <FaTrash />,
    onClick: handleDelete,
    variant: "ghost",
    className: styles.deleteButton,
    title: "Eliminar estudiante",
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
