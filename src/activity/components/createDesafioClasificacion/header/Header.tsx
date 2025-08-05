import { motion } from "framer-motion";
import styles from "./Header.module.css";
import { FaLayerGroup } from "react-icons/fa";
import { useCreateDesafioClasificacion } from "../../../hooks/useDesafioClasificacion";
const Header = () => {
  const { categories, totalConcepts } = useCreateDesafioClasificacion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.header}
    >
      <div className={styles.titleSection}>
        <FaLayerGroup className={styles.titleIcon} />
        <div>
          <h1 className={styles.title}>Crear Actividad de Clasificación</h1>
          <p className={styles.subtitle}>
            Crea una actividad donde los estudiantes clasifiquen conceptos en
            categorías
          </p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{categories.length}</span>
          <span className={styles.statLabel}>Categorías</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>{totalConcepts}</span>
          <span className={styles.statLabel}>Conceptos</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
