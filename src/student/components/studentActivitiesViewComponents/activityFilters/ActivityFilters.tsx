import { motion } from "framer-motion";
import { FaFilter, FaBook, FaSignal } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import type { ConfigurationActivity } from "../../../types/Activity.type";
import styles from "./ActivityFilters.module.css";

interface ActivityFiltersProps {
  activeFilter: "all" | "pending" | "completed" | "available";
  selectedSubject: string;
  selectedDifficulty: string;
  onFilterChange: (
    filter: "all" | "pending" | "completed" | "available"
  ) => void;
  onSubjectChange: (subject: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  activities: ConfigurationActivity[];
}

const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  activeFilter,
  selectedSubject,
  selectedDifficulty,
  onFilterChange,
  onSubjectChange,
  onDifficultyChange,
  activities,
}) => {
  const statusFilters = [
    { key: "all", label: "Todas", emoji: "🎯" },
    { key: "pending", label: "Pendientes", emoji: "⏰" },
    { key: "available", label: "Disponibles", emoji: "✨" },
    { key: "completed", label: "Completadas", emoji: "✅" },
  ];

  const subjects = ["all", ...new Set(activities.map((a) => a.subjectName))];
  const difficulties = ["all", ...new Set(activities.map((a) => a.difficulty))];

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
              value={selectedSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className={styles.select}
            >
              <option value="all">Todas las materias</option>
              {subjects
                .filter((s) => s !== "all")
                .map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
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
              <option value="all">Todas las dificultades</option>
              {difficulties
                .filter((d) => d !== "all")
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
