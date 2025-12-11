import { motion, type Variants } from "framer-motion";
import { FaSearch, FaSortAmountDown } from "react-icons/fa";
import { Card, Input } from "@/shared";
import styles from "./ActivitiesFilter.module.css";

interface ActivitiesFilterProps {
  itemVariants: Variants;
  searchTerm: string;
  searchPlaceholder: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const ActivitiesFilter: React.FC<ActivitiesFilterProps> = ({
  itemVariants,
  searchTerm,
  searchPlaceholder,
  sortBy,
  onSearchChange,
  onSortChange,
}) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className={styles.filtersCard}>
        <div className={styles.filtersContent}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <FaSortAmountDown className={styles.filterIcon} />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="name">Ordenar por nombre</option>
                <option value="popular">Ordenar por popularidad</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivitiesFilter;
