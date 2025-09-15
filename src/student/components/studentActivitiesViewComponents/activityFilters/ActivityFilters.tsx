import { motion } from "framer-motion";
import { FaFilter, FaBook, FaSignal } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import styles from "./ActivityFilters.module.css";
import { useActivityStudentUI } from "../../../hooks/useActivityStudentUI";
import type { FilterOption } from "../../../context/activityStudentContext/activityStudentContextUI/ActivityStudentContextUI.type";
interface ActivityFiltersProps {
  activeFilter: "CREATED" | "PUBLISHED" | "EXPIRED" | "APPROVED";
  selectedSubject: FilterOption | null;
  selectedDifficulty: string;
  onFilterChange: (
    filter: "CREATED" | "PUBLISHED" | "EXPIRED" | "APPROVED"
  ) => void;
  onSubjectChange: (subject: FilterOption | null) => void;
  onDifficultyChange: (difficulty: string) => void;
}

const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  activeFilter,
  selectedSubject,
  selectedDifficulty,
  onFilterChange,
  onSubjectChange,
  onDifficultyChange,
}) => {
  const { statusFilters, subjects, difficulties } = useActivityStudentUI();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.filtersContainer}>
      <Card className={styles.filtersCard}>
        <div className={styles.filtersHeader}>
          <div className={styles.headerIcon}>
            <FaFilter />
          </div>
          <h3 className={styles.filtersTitle}>Filtros</h3>
        </div>

        {/* Status Filters */}
        <div className={styles.filterSection}>
          <div className={styles.filterButtons}>
            {statusFilters.map((filter) => (
              <motion.div
                key={filter.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={activeFilter === filter.key ? "primary" : "ghost"}
                  onClick={() => onFilterChange(filter.key as any)}
                  className={`${styles.filterButton} ${
                    activeFilter === filter.key ? styles.active : ""
                  }`}
                >
                  <span className={styles.filterEmoji}>{filter.emoji}</span>
                  {filter.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subject and Difficulty Filters */}
        <div className={styles.selectFilters}>
          <div className={styles.selectGroup}>
            <div className={styles.selectLabel}>
              <FaBook className={styles.selectIcon} />
              Materia
            </div>
            <select
              value={selectedSubject?.id}
              onChange={(e) => {
                const subject = subjects.find((s) => s.id === e.target.value);
                if (subject) onSubjectChange(subject);
              }}
              className={styles.select}
            >
              {subjects
                .filter((s) => s.name !== "ALL")
                .map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.selectGroup}>
            <div className={styles.selectLabel}>
              <FaSignal className={styles.selectIcon} />
              Dificultad
            </div>
            <select
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className={styles.select}
            >
              <option value="ALL">Todas las dificultades</option>
              {difficulties
                .filter((d) => d !== "ALL")
                .map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityFilters;
