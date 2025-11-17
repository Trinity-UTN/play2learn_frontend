import { useState } from "react";
import { motion } from "framer-motion";
import { FaSort, FaCoins } from "react-icons/fa";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import ActivityDetailsFilters from "../activityDetailsFilters/ActivityDetailsFilters";
import type { ActivityStudentGetDto } from "../../../types/TeacherActivity.type";
import type { StudentActivityState } from "../../../constants/activity/activityDetailsTeacher.constants";
import { getStudentStateConfig } from "../../../utils/activity/activityDetailsTeacher.utils";
import styles from "./ActivityDetailsTable.module.css";

interface ActivityDetailsTableProps {
  students: ActivityStudentGetDto[];
}

const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.01 },
};

const ActivityDetailsTable = ({ students }: ActivityDetailsTableProps) => {
  const [sortField, setSortField] = useState<
    keyof ActivityStudentGetDto | null
  >(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
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

  const handleSort = (field: keyof ActivityStudentGetDto) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Card className={styles.tableContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Estudiantes</h2>
        <ActivityDetailsFilters
          onSearch={handleSearch}
          studentsCount={students.length}
          filteredCount={filteredStudents.length}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No se encontraron estudiantes</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th
                  className={`${styles.tableHeader} ${styles.sortable}`}
                  onClick={() => handleSort("studentName")}
                >
                  Nombre y Apellido
                  <FaSort className={styles.sortIcon} />
                </th>
                <th
                  className={`${styles.tableHeader} ${styles.sortable}`}
                  onClick={() => handleSort("state")}
                >
                  Estado
                  <FaSort className={styles.sortIcon} />
                </th>
                <th
                  className={`${styles.tableHeader} ${styles.sortable}`}
                  onClick={() => handleSort("attempts")}
                >
                  Intentos
                  <FaSort className={styles.sortIcon} />
                </th>
                <th className={styles.tableHeader}>Recompensa</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {sortedStudents.map((student, index) => {
                const stateConfig = getStudentStateConfig(
                  student.state as StudentActivityState
                );

                return (
                  <motion.tr
                    key={index}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: index * 0.05 }}
                    className={styles.tableRow}
                  >
                    {/* Nombre */}
                    <td
                      className={`${styles.tableCell} ${styles.centeredCell}`}
                    >
                      <span className={styles.studentName}>
                        {student.studentName}
                      </span>
                    </td>

                    {/* Estado */}
                    <td
                      className={`${styles.tableCell} ${styles.centeredCell}`}
                    >
                      <div
                        className={styles.stateBadge}
                        style={{
                          background: stateConfig.bgColor,
                          color: stateConfig.color,
                        }}
                      >
                        <Badge
                          variant="custom"
                          size="md"
                          customColor={{
                            bg: "transparent",
                            text: stateConfig.color,
                          }}
                        >
                          {stateConfig.label}
                        </Badge>
                      </div>
                    </td>

                    {/* Intentos */}
                    <td
                      className={`${styles.tableCell} ${styles.centeredCell}`}
                    >
                      {student.attempts}
                    </td>

                    {/* Recompensa */}
                    <td
                      className={`${styles.tableCell} ${styles.centeredCell}`}
                    >
                      <div className={styles.rewardSection}>
                        {student.reward > 0 && (
                          <FaCoins className={styles.coinIcon} />
                        )}
                        <span className={styles.rewardValue}>
                          {student.reward > 0 ? student.reward.toFixed(2) : "-"}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default ActivityDetailsTable;
