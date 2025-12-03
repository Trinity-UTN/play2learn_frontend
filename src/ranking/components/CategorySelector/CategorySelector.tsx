import { motion } from "framer-motion";
import { FaCoins, FaGamepad } from "react-icons/fa";
import styles from "./CategorySelector.module.css";

interface CategorySelectorProps {
  selectedCategory: "coins" | "activities";
  onCategoryChange: (category: "coins" | "activities") => void;
}

export const CategorySelector = ({
  selectedCategory,
  onCategoryChange,
}: CategorySelectorProps) => {
  return (
    <div className={styles.container}>
      <motion.button
        className={`${styles.categoryButton} ${
          selectedCategory === "coins" ? styles.active : ""
        }`}
        onClick={() => onCategoryChange("coins")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaCoins className={styles.icon} />
        <span>Monedas</span>
        {selectedCategory === "coins" && (
          <motion.div
            className={styles.activeIndicator}
            layoutId="categoryIndicator"
          />
        )}
      </motion.button>

      <motion.button
        className={`${styles.categoryButton} ${
          selectedCategory === "activities" ? styles.active : ""
        }`}
        onClick={() => onCategoryChange("activities")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGamepad className={styles.icon} />
        <span>Actividades</span>
        {selectedCategory === "activities" && (
          <motion.div
            className={styles.activeIndicator}
            layoutId="categoryIndicator"
          />
        )}
      </motion.button>
    </div>
  );
};
