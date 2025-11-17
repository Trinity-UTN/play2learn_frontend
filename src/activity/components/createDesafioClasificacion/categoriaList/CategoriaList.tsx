import { motion, AnimatePresence } from "framer-motion";
import { FaTag } from "react-icons/fa";
import CategoryCard from "../categoriaCard/CategoriaCard";
import { useCreateDesafioClasificacion } from "../../../hooks/useCreateDesafioClasificacion";
import styles from "./CategoriaList.module.css";

const CategoryList: React.FC = () => {
  const { categories } = useCreateDesafioClasificacion();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (categories.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <FaTag className={styles.emptyIcon} />
          <h3>No hay categorías creadas</h3>
          <p>
            Comienza agregando tu primera categoría. Necesitas al menos 2
            categorías para crear la actividad.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.categoriesList}>
        <AnimatePresence>
          {categories.map((category, index) => (
            <motion.div
              variants={itemVariants}
              key={category.id}
              initial={itemVariants.hidden}
              animate={itemVariants.visible}
              exit={itemVariants.exit}
              transition={{ delay: index * 0.1 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoryList;
