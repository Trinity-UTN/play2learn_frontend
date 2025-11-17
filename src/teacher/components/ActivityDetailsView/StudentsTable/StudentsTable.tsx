import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCircle,
  FaSort,
} from "react-icons/fa";

import styles from "./StudentsTable.module.css";
import type { StudentActivityProgress } from "../../../types/CreatedActivities";

interface StudentsTableProps {
  students: StudentActivityProgress[];
  maxAttempts: number;
}

const StudentsTable = ({ students, maxAttempts }: StudentsTableProps) => {
  const [sortField, setSortField] = useState<
    keyof StudentActivityProgress | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "APPROVED":
        return { icon: FaCheckCircle, label: "Aprobada", color: "#10b981" };
      case "FAILED":
        return { icon: FaTimesCircle, label: "Desaprobada", color: "#ef4444" };
      case "IN_PROGRESS":
        return { icon: FaClock, label: "En Curso", color: "#f59e0b" };
      case "NOT_STARTED":
        return { icon: FaCircle, label: "No Realizada", color: "#6b7280" };
      default:
        return { icon: FaCircle, label: "Desconocido", color: "#6b7280" };
    }
  };

  const handleSort = (field: keyof StudentActivityProgress) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    if (aValue === undefined) aValue = 0;
    if (bValue === undefined) bValue = 0;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Estudiantes ({students.length})</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                onClick={() => handleSort("studentName")}
                className={styles.sortable}
              >
                Nombre y Apellido
                <FaSort className={styles.sortIcon} />
              </th>
              <th
                onClick={() => handleSort("status")}
                className={styles.sortable}
              >
                Estado
                <FaSort className={styles.sortIcon} />
              </th>
              <th
                onClick={() => handleSort("attemptsUsed")}
                className={styles.sortable}
              >
                Intentos
                <FaSort className={styles.sortIcon} />
              </th>
              <th
                onClick={() => handleSort("score")}
                className={styles.sortable}
              >
                Puntaje
                <FaSort className={styles.sortIcon} />
              </th>
              <th
                onClick={() => handleSort("timeSpent")}
                className={styles.sortable}
              >
                Tiempo
                <FaSort className={styles.sortIcon} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student, index) => {
              const statusConfig = getStatusConfig(student.status);
              return (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <td className={styles.nameCell}>
                    {student.studentName} {student.studentLastName}
                  </td>
                  <td>
                    <div
                      className={styles.statusBadge}
                      style={{ backgroundColor: `${statusConfig.color}20` }}
                    >
                      <statusConfig.icon
                        style={{ color: statusConfig.color }}
                      />
                      <span style={{ color: statusConfig.color }}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </td>
                  <td className={styles.centerCell}>
                    {student.attemptsUsed}/{maxAttempts}
                  </td>
                  <td className={styles.centerCell}>
                    {student.score !== undefined ? `${student.score}%` : "-"}
                  </td>
                  <td className={styles.centerCell}>
                    {student.timeSpent !== undefined
                      ? `${Math.floor(student.timeSpent / 60)}m ${
                          student.timeSpent % 60
                        }s`
                      : "-"}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
