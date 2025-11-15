import { motion } from "framer-motion";
import {
  FaFilter,
  FaTimes,
  FaBook,
  FaTh,
  FaList,
  // FaCalendarAlt,
} from "react-icons/fa";
import type { FilterOption } from "../../../../shared/types/Filter.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import Input from "../../../../shared/components/Input/InputComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import {
  ACTIVITY_TEACHER_STATUS_FILTERS,
  type ActivityTeacherStatus,
} from "../../../constants/activity/activityTeacher.constants";
import { activityItemVariants } from "../../../constants/animations/activityTeacher.animations";
import { hasActiveFilters } from "../../../utils/activity/activityTeacher.utils";
import styles from "./ActivitiesCreatedFilters.module.css";

interface ActivitiesCreatedFiltersProps {
  activeFilter: ActivityTeacherStatus;
  searchValue: string;
  subjectValue: string;
  // yearValue: string;
  // courseValue: string;
  selectedSubject: FilterOption | null;
  // selectedYear: FilterOption | null;
  // selectedCourse: FilterOption | null;
  subjects: FilterOption[];
  // years: FilterOption[];
  viewMode: "grid" | "table";
  onFilterChange: (filter: ActivityTeacherStatus) => void;
  onSearchChange: (value: string) => void;
  onSubjectChange: (subject: FilterOption | null) => void;
  // onYearChange: (year: FilterOption | null) => void;
  // onCourseChange: (course: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onViewModeChange: (mode: "grid" | "table") => void;
}

const ActivitiesCreatedFilters: React.FC<ActivitiesCreatedFiltersProps> = ({
  activeFilter,
  searchValue,
  subjectValue,
  // yearValue,
  // courseValue,
  selectedSubject,
  // selectedYear,
  // selectedCourse,
  subjects,
  // years,
  viewMode,
  onFilterChange,
  onSearchChange,
  onSubjectChange,
  // onYearChange,
  // onCourseChange,
  onApplyFilters,
  onClearFilters,
  onViewModeChange,
}) => {
  const showClearButton = hasActiveFilters(
    searchValue,
    subjectValue
    // yearValue,
    // courseValue
  );

  return (
    <motion.div
      variants={activityItemVariants}
      className={styles.filtersContainer}
    >
      <Card className={styles.filtersCard}>
        {/* Header */}
        <div className={styles.filtersHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <FaFilter />
            </div>
            <h3 className={styles.filtersTitle}>Filtros</h3>
          </div>

          <div className={styles.viewToggle}>
            <Tooltip content="Vista en grilla">
              <Button
                variant={viewMode === "grid" ? "primary" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className={
                  viewMode === "grid"
                    ? styles.viewButton
                    : styles.viewButtonInactive
                }
              >
                <FaTh />
              </Button>
            </Tooltip>
            <Tooltip content="Vista en tabla">
              <Button
                variant={viewMode === "table" ? "primary" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("table")}
                className={
                  viewMode === "table"
                    ? styles.viewButton
                    : styles.viewButtonInactive
                }
              >
                <FaList />
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Busqueda */}
        <div className={styles.searchContainer}>
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onApplyFilters()}
            placeholder={"Nombre de actividad"}
            className={styles.searchInput}
          />
          <Button
            variant="primary"
            onClick={onApplyFilters}
            className={styles.searchButton}
          >
            Buscar
          </Button>
          {showClearButton && (
            <Tooltip content="Limpiar filtros">
              <Button
                variant="ghost"
                onClick={onClearFilters}
                className={styles.clearButton}
              >
                <FaTimes />
              </Button>
            </Tooltip>
          )}
        </div>

        {/* Estados */}
        <div className={styles.filterSection}>
          <div className={styles.filterButtons}>
            {ACTIVITY_TEACHER_STATUS_FILTERS.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <motion.div
                  key={filter.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={activeFilter === filter.key ? "primary" : "ghost"}
                    onClick={() =>
                      onFilterChange(filter.key as ActivityTeacherStatus)
                    }
                    className={`${styles.filterButton} ${
                      activeFilter === filter.key ? styles.active : ""
                    }`}
                  >
                    <span className={styles.filterIcon}>
                      <IconComponent />
                    </span>
                    {filter.label}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Filtro de Materia */}
        <div className={styles.selectFilters}>
          {/* Subject */}
          <div className={styles.selectGroup}>
            <div className={styles.selectLabel}>
              <FaBook className={styles.selectIcon} />
              Materia
            </div>
            <select
              value={selectedSubject?.id ?? ""}
              onChange={(e) => {
                const subject = subjects.find((s) => s.id === e.target.value);
                onSubjectChange(subject ?? null);
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

          {/* Year */}
          {/* <div className={styles.selectGroup}>
            <div className={styles.selectLabel}>
              <FaCalendarAlt className={styles.selectIcon} />
              Años
            </div>
            <select
              value={selectedYear?.id ?? ""}
              onChange={(e) => {
                const year = years.find((s) => s.id === e.target.value);
                onYearChange(year ?? null);
              }}
              className={styles.select}
            >
              {years.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivitiesCreatedFilters;
