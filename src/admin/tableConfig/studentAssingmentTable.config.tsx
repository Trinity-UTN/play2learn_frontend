import type { DataTableColumn } from "@/shared/components/DataTable";
import type { StudentAssingmentResponse } from "../types/subject.types";
import { CgAdd, CgCloseO } from "react-icons/cg";

export const getStudentAssignColumns = ({
  styles,
  handleAssign,
  handleUnassign,
}: {
  styles: Record<string, string>;
  handleAssign: (student: StudentAssingmentResponse) => void;
  handleUnassign: (student: StudentAssingmentResponse) => void;
}): DataTableColumn<StudentAssingmentResponse>[] => [
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
      <div className={styles.wrapper}>
        <span>{student.dni}</span>
      </div>
    ),
  },
  {
    key: "registered",
    label: "Acciones",
    sortable: true,
    className: styles.nameActions,
    render: (student) => (
      <div className={styles.centeredWrapper}>
        {!student.registered ? (
          <button
            className={styles.buttonAction}
            onClick={() => handleAssign(student)}
            title="Asignar estudiante a la materia"
          >
            <CgAdd className={styles.buttonAssign} />
            {student.registered}
          </button>
        ) : (
          <button
            className={styles.buttonAction}
            onClick={() => handleUnassign(student)}
            title="Desasignar estudiante a la materia"
          >
            <CgCloseO className={styles.buttonUnassign} />
          </button>
        )}
      </div>
    ),
  },
];
