import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { Button, Card } from "@/shared";
import {
  BENEFIT_PURCHASE_STATUS_FILTERS,
  type BenefitPurchaseStatus,
} from "../../../../../benefit/constants/benefitPurchase.constants";
import { benefitItemVariants } from "../../../../constants/animations/benefitTeacher.animations";
import styles from "./BenefitPurchaseFilters.module.css";

interface BenefitPurchasesFiltersProps {
  activeFilter: BenefitPurchaseStatus;
  onFilterChange: (filter: BenefitPurchaseStatus) => void;
}

const BenefitPurchaseFilters: React.FC<BenefitPurchasesFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <motion.div
      variants={benefitItemVariants}
      className={styles.filtersContainer}
    >
      <Card className={styles.filtersCard}>
        <div className={styles.filtersHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <FaFilter />
            </div>
            <h3 className={styles.filtersTitle}>Filtros</h3>
          </div>
        </div>

        {/* Estados de Canjes */}
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
                    variant={activeFilter === filter.key ? "primary" : "ghost"}
                    onClick={() =>
                      onFilterChange(filter.key as BenefitPurchaseStatus)
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
      </Card>
    </motion.div>
  );
};

export default BenefitPurchaseFilters;
