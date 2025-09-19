import { motion, type Variants } from "framer-motion";
import styles from "./ActivitiesHeader.module.css";

interface ActivitiesHeaderProps {
  itemVariants: Variants;
}

const ActivitiesHeader: React.FC<ActivitiesHeaderProps> = ({
  itemVariants,
}) => {
  return (
    <motion.div variants={itemVariants} className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Actividades Educativas</h1>
          <p className={styles.subtitle}>
            Selecciona el tipo de actividad que deseas crear para tus
            estudiantes
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivitiesHeader;
