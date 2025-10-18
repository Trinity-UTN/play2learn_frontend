import { motion, type Variants } from "framer-motion";
import { FaGlobe, FaUser, FaHatWizard } from "react-icons/fa";
import styles from "./CategoryTabs.module.css";

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;

  handleFilter: (filter: string[], value: string[]) => void;
}

export const FILTER_TYPES = {
  TYPE: "type",
} as const;

export const FILTER_VALUES = {
  CUERPO: "Cuerpo",
  SOMBRERO: "Sombrero",
  REMERA: "Remera",
} as const;

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,

  handleFilter,
}) => {
  const categories = [
    {
      value: "all",
      label: "Todos",
      icon: FaGlobe,

      color: "#8b5cf6",
      filterValue: null, // No aplica filtro
    },
    {
      value: "cuerpo",
      label: "Cuerpo",
      icon: FaUser,

      color: "#3b82f6",
      filterValue: FILTER_VALUES.CUERPO,
    },
    {
      value: "sombrero",
      label: "Sombreros",
      icon: FaHatWizard,

      color: "#f59e0b",
      filterValue: FILTER_VALUES.SOMBRERO,
    },
    {
      value: "remera",
      label: "Remeras",
      icon: FaHatWizard,

      color: "#f59e0b",
      filterValue: FILTER_VALUES.REMERA,
    },
  ];

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

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
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
