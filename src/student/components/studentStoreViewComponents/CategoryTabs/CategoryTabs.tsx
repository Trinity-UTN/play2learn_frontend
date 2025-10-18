import { motion, type Variants } from "framer-motion";
import { FaGlobe, FaUser, FaHatWizard } from "react-icons/fa";
import styles from "./CategoryTabs.module.css";

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  avatarCount: number;
  hatCount: number;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  avatarCount,
  hatCount,
}) => {
  const categories = [
    {
      value: "all",
      label: "Todos",
      icon: FaGlobe,
      count: avatarCount + hatCount,
      color: "#8b5cf6",
    },
    {
      value: "avatar",
      label: "Avatares",
      icon: FaUser,
      count: avatarCount,
      color: "#3b82f6",
    },
    {
      value: "sombrero",
      label: "Sombreros",
      icon: FaHatWizard,
      count: hatCount,
      color: "#f59e0b",
    },
  ];

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
            onClick={() => onSelectCategory(category.value)}
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
            <span
              className={styles.tabCount}
              style={
                selectedCategory === category.value
                  ? { color: category.color }
                  : {}
              }
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryTabs;
