import { motion } from "framer-motion";
import { FaFilter, FaBook, FaTags } from "react-icons/fa";
import type { FilterOption } from "../../../../shared/types/Filter.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import {
  BENEFIT_PURCHASE_STATUS_FILTERS,
  type BenefitPurchaseStatus,
} from "../../../../benefit/constants/benefitPurchase.constants";
import { BENEFIT_CATEGORIES } from "../../../../benefit/constants/benefit.constants";
import styles from "./BenefitFilters.module.css";

interface BenefitFiltersProps {
  activeStatusFilter: BenefitPurchaseStatus;
  selectedCategory: string;
  selectedSubject: FilterOption | null;
  subjects: FilterOption[];
  onStatusFilterChange: (filter: BenefitPurchaseStatus) => void;
  onCategoryChange: (category: string) => void;
  onSubjectChange: (subject: FilterOption | null) => void;
}

const BenefitFilters: React.FC<BenefitFiltersProps> = ({
  activeStatusFilter,
  selectedCategory,
  selectedSubject,
  subjects,
  onStatusFilterChange,
  onCategoryChange,
  onSubjectChange,
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
            {BENEFIT_PURCHASE_STATUS_FILTERS.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <motion.div
                  key={filter.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={
                      activeStatusFilter === filter.key ? "primary" : "ghost"
                    }
                    onClick={() =>
                      onStatusFilterChange(filter.key as BenefitPurchaseStatus)
                    }
                    className={`${styles.filterButton} ${
                      activeStatusFilter === filter.key ? styles.active : ""
                    }`}
                  >
                    <span className={styles.filterEmoji}>
                      <IconComponent />
                    </span>
                    <span>{filter.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Category and Subject Filters */}
        <div className={styles.selectFilters}>
          <div className={styles.selectGroup}>
            <div className={styles.selectLabel}>
              <FaTags className={styles.selectIcon} />
              <span>Categoría</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={styles.select}
            >
              <option value="ALL">Todas las categorías</option>
              {BENEFIT_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selectGroup}>
            <div className={styles.selectLabel}>
              <FaBook className={styles.selectIcon} />
              <span>Materia</span>
            </div>
            <select
              value={selectedSubject?.id || "ALL"}
              onChange={(e) => {
                const subjectId = e.target.value;
                if (subjectId === "ALL") {
                  onSubjectChange({ id: "ALL", name: "Todas las materias" });
                } else {
                  const subject = subjects.find((s) => s.id === subjectId);
                  if (subject) onSubjectChange(subject);
                }
              }}
              className={styles.select}
            >
              <option value="ALL">Todas las materias</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BenefitFilters;
