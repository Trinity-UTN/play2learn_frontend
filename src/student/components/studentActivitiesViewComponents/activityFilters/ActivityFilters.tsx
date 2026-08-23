import { motion } from "framer-motion";
import { FaFilter, FaBook, FaSignal, FaGamepad } from "react-icons/fa";
import {
  type FilterOption,
  Button,
  Card,
  ACTIVITY_NAME_FILTER_OPTIONS,
  ACTIVITY_NAME_ALL,
} from "@/shared";
import {
  ACTIVITY_STATUS_FILTERS,
  ACTIVITY_DIFFICULTY_OPTIONS,
  type ActivityStatus,
} from "../../../constants/activities.constants";
import styles from "./ActivityFilters.module.css";

interface ActivityFiltersProps {
  activeFilter: ActivityStatus;
  selectedSubject: FilterOption | null;
  selectedDifficulty: string;
  selectedActivityName: string;
  subjects: FilterOption[];
  onFilterChange: (filter: ActivityStatus) => void;
  onSubjectChange: (subject: FilterOption | null) => void;
  onDifficultyChange: (difficulty: string) => void;
  onActivityNameChange: (name: string) => void;
}

const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  activeFilter,
  selectedSubject,
  selectedDifficulty,
  selectedActivityName,
  subjects,
  onFilterChange,
  onSubjectChange,
  onDifficultyChange,
  onActivityNameChange,
}) => {
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
            {ACTIVITY_STATUS_FILTERS.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <motion.div
                  key={filter.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={activeFilter === filter.key ? "primary" : "ghost"}
                    onClick={() => onFilterChange(filter.key as ActivityStatus)}
                    className={`${styles.filterButton} ${
                      activeFilter === filter.key ? styles.active : ""
                    }`}
                  >
                    <span className={styles.filterEmoji}>
                      <IconComponent />
                    </span>
                    {filter.label}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Subject and Difficulty Filters */}
        <div className={styles.selectFilters}>
          <div className={styles.selectGroup}>
            <div className={styles.selectLabel}>
              <FaGamepad className={styles.selectIcon} />
              Tipo de actividad
            </div>
            <select
              value={selectedActivityName || ACTIVITY_NAME_ALL}
              onChange={(e) => onActivityNameChange(e.target.value)}
              className={styles.select}
            >
              {ACTIVITY_NAME_FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

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
              {subjects.map((subject) => (
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
              {ACTIVITY_DIFFICULTY_OPTIONS.filter((d) => d !== "ALL").map(
                (difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityFilters;
