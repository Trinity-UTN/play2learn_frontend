import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import type { DataTableColumn, DataTableAction } from "@/shared";
import { type SubjectResponseDto } from "@/admin";
import { Link } from "react-router-dom";

const SubjectStatusTrue = ({ styles }: { styles: Record<string, string> }) => {
  return (
    <div className={styles.status} style={{ backgroundColor: "#059669" }}>
      Activo
    </div>
  );
};
const SubjectStatusFalse = ({
  styles,
  subject,
  onRestore,
}: {
  styles: Record<string, string>;
  subject: SubjectResponseDto;
  onRestore: (subject: SubjectResponseDto) => void;
}) => {
  return (
    <button
      className={styles.btnStatus}
      style={{ backgroundColor: "#dc2626" }}
      onClick={() => onRestore(subject)}
    >
      De baja
    </button>
  );
};

export const getSubjectColumns = ({
  styles,
  handleRestore,
}: {
  styles: Record<string, string>;
  handleRestore: (subject: SubjectResponseDto) => void;
}): DataTableColumn<SubjectResponseDto>[] => [
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
    key: "course.year.name",
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
  {
    key: "optional",
    label: "Opcional",
    sortable: true,
    className: styles.nameColumn,
    render: (subject) => (
      <div className={styles.nameCell}>
        <div className={styles.nameWrapper}>
          {subject.optional ? (
            <Link
              to={`/dashboard/students/list/assing/${subject.id}`}
              state={{ subject }}
              className={styles.assignButton}
            >
              Asignar Estudiantes
            </Link>
          ) : (
            <span>No</span>
          )}
        </div>
      </div>
    ),
  },

  {
    key: "active",
    label: "Estado",
    sortable: true,
    className: styles.nameColumn,
    render: (subject) => (
      <div className={styles.wrapper}>
        {subject.active ? (
          <SubjectStatusTrue styles={styles} />
        ) : (
          <SubjectStatusFalse
            styles={styles}
            subject={subject}
            onRestore={handleRestore}
          />
        )}
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
