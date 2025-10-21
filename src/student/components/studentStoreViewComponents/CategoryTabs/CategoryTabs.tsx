import { motion } from "framer-motion";
import styles from "./CategoryTabs.module.css";
import {
  FILTER_TYPES,
  categories,
  itemVariants,
} from "../../../constants/store.contanst";

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  handleFilter: (filter: string[], value: string[]) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  handleFilter,
}) => {
  const handleCategoryClick = (category: (typeof categories)[0]) => {
    onSelectCategory(category.value);
    if (category.filterValue === null) {
      // Si es "Todos", limpiar filtros
      handleFilter([], []);
    } else {
      // Aplicar filtro específico
      handleFilter([FILTER_TYPES.TYPE], [category.filterValue]);
    }
  };

  return (
    <motion.div variants={itemVariants} className={styles.categoryTabs}>
      <div className={styles.tabsContainer}>
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryClick(category)}
            className={`${styles.tab} ${
              selectedCategory === category.value ? styles.tabActive : ""
            }`}
            style={
              selectedCategory === category.value
                ? {
                    background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)`,
                    borderColor: category.color,
                  }
                : {}
            }
          >
            <category.icon
              className={styles.tabIcon}
              style={
                selectedCategory === category.value
                  ? { color: category.color }
                  : {}
              }
            />
            <span className={styles.tabLabel}>{category.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryTabs;
