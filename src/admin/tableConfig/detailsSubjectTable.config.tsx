import { FaEdit } from "react-icons/fa";
import type {
  DataTableColumn,
  DataTableAction,
} from "@/shared/components/DataTable";
import type { StudentResponseDto } from "@/admin";

// const StudentStatusTrue = ({ styles }: { styles: Record<string, string> }) => {
//   return (
//     <div className={styles.status} style={{ backgroundColor: "#059669" }}>
//       Activo
//     </div>
//   );
// };

export const getStudentAssignColumns = ({
  styles,
}: {
  styles: Record<string, string>;
}): DataTableColumn<StudentResponseDto>[] => [
  {
    key: "id",
    label: "ID",
    sortable: true,
    width: "100px",
    className: styles.idColumn,
    render: (student) => <span className={styles.idBadge}>{student.id}</span>,
  },
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
];

export const getStudentAssignActions = ({
  styles,
  handleAssing,
}: {
  styles: Record<string, string>;
  handleAssing: (student: StudentResponseDto) => void;
}): DataTableAction<StudentResponseDto>[] => [
  {
    label: "Asignar",
    icon: <FaEdit />,
    onClick: handleAssing,
    variant: "ghost",
    className: styles.editButton,
    title: "Asignar estudiante",
  },
];
