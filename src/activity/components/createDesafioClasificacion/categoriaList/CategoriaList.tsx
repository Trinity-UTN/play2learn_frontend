import { motion, AnimatePresence } from "framer-motion";
import { FaLayerGroup, FaPlus } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import CategoryCard from "../categoriaCard/CategoriaCard";
import styles from "./CategoriaList.module.css";
import { useCreateDesafioClasificacion } from "../../../hooks/useDesafioClasificacion";

const CategoryList = ({}) => {
  const { categories } = useCreateDesafioClasificacion();
  if (categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={styles.emptyState}>
          <div className={styles.emptyContent}>
            <FaLayerGroup className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No hay categorías creadas</h3>
            <p className={styles.emptyDescription}>
              Comienza agregando tu primera categoría usando el formulario de
              arriba. Necesitas al menos 2 categorías para crear la actividad.
            </p>
            <div className={styles.emptyHints}>
              <div className={styles.emptyHint}>
                <FaPlus className={styles.emptyHintIcon} />
                <span>Agrega categorías relacionadas con tu tema</span>
              </div>
              <div className={styles.emptyHint}>
                <FaPlus className={styles.emptyHintIcon} />
                <span>Cada categoría puede tener hasta 10 conceptos</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FaLayerGroup className={styles.titleIcon} />
          Categorías Creadas ({categories.length})
        </h2>
        <p className={styles.description}>
          Gestiona tus categorías y agrega conceptos a cada una
        </p>
      </div>

      <div className={styles.grid}>
        <AnimatePresence>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              layout
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={styles.summary}
        >
          <Card className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Resumen de la Actividad</h3>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.summaryNumber}>
                  {categories.length}
                </span>
                <span className={styles.summaryLabel}>Categorías</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.summaryNumber}>
                  {categories.reduce(
                    (total, cat) => total + cat.concepts.length,
                    0
                  )}
                </span>
                <span className={styles.summaryLabel}>Conceptos Totales</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.summaryNumber}>
                  {Math.round(
                    categories.reduce(
                      (total, cat) => total + cat.concepts.length,
                      0
                    ) / categories.length
                  )}
                </span>
                <span className={styles.summaryLabel}>
                  Promedio por Categoría
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default CategoryList;
