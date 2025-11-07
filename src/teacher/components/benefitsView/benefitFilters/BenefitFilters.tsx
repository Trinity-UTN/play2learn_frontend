import { motion } from "framer-motion";
import {
  FaFilter,
  FaTimes,
  FaBook,
  FaTags,
  FaTh,
  FaList,
} from "react-icons/fa";
import type { FilterOption } from "../../../../shared/types/Filter.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import Input from "../../../../shared/components/Input/InputComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import {
  BENEFIT_TEACHER_STATUS_FILTERS,
  BENEFIT_CATEGORIES,
  BENEFIT_CATEGORY_OPTIONS,
  type BenefitTeacherStatus,
} from "../../../../benefit/constants/benefit.constants";
import styles from "./BenefitFilters.module.css";

interface BenefitFiltersProps {
  activeFilter: BenefitTeacherStatus;
  searchValue: string;
  subjectValue: string;
  selectedSubject: FilterOption | null;
  selectedCategory: string;
  subjects: FilterOption[];
  benefitIdValue: string;
  availableBenefits?: Array<{ id: number; name: string }>;
  viewMode: "grid" | "table";
  onFilterChange: (filter: BenefitTeacherStatus) => void;
  onSearchChange: (value: string) => void;
  onSubjectChange: (subject: FilterOption | null) => void;
  onCategoryChange: (category: string) => void;
  onBenefitIdChange: (value: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onViewModeChange: (mode: "grid" | "table") => void;
}

const BenefitFilters: React.FC<BenefitFiltersProps> = ({
  activeFilter,
  searchValue,
  subjectValue,
  selectedCategory,
  selectedSubject,
  subjects,
  benefitIdValue,
  availableBenefits,
  viewMode,
  onFilterChange,
  onSearchChange,
  onSubjectChange,
  onCategoryChange,
  onBenefitIdChange,
  onApplyFilters,
  onClearFilters,
  onViewModeChange,
}) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const getCategoryLabel = (value: string): string => {
    if (value === "ALL") return "Todas las categorías";
    const category = BENEFIT_CATEGORIES.find((c) => c.value === value);
    return category?.label || value;
  };

  const hasActiveFilters = searchValue || subjectValue || benefitIdValue;

  const placeholder =
    activeFilter === "USE_REQUESTED"
      ? "Nombre del estudiante"
      : "Nombre del beneficio";

  return (
    <motion.div variants={itemVariants} className={styles.filtersContainer}>
      <Card className={styles.filtersCard}>
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onApplyFilters?.();
              }
            }}
            placeholder={placeholder}
            className={styles.searchInput}
          />
          <Button
            variant="primary"
            onClick={onApplyFilters}
            className={styles.searchButton}
          >
            Buscar
          </Button>
          {hasActiveFilters && (
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
            {BENEFIT_TEACHER_STATUS_FILTERS.map((filter) => {
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
                      onFilterChange(filter.key as BenefitTeacherStatus)
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

        {/* Filtros de Materia y Categoría */}
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
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selectGroup}>
            <div className={styles.selectLabel}>
              <FaTags className={styles.selectIcon} />
              Categoría
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={styles.select}
            >
              {BENEFIT_CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {getCategoryLabel(category)}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por beneficio */}
          {activeFilter === "USE_REQUESTED" && (
            <div className={styles.selectGroup}>
              <div className={styles.selectLabel}>
                <FaTags className={styles.selectIcon} />
                Beneficio
              </div>
              <select
                value={benefitIdValue}
                onChange={(e) => onBenefitIdChange(e.target.value)}
                className={styles.select}
              >
                <option value="">Todos los beneficios</option>
                {availableBenefits?.map((benefit) => (
                  <option key={benefit.id} value={benefit.id}>
                    {benefit.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default BenefitFilters;
