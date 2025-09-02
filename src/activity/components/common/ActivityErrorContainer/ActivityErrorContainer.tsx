import { motion } from "framer-motion";
import styles from "./ActivityErrorContainer.module.css";

interface ActivityErrorContainerProps {
  errors: string[] | { message: string }[];
  itemVariants?: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
}

const ActivityErrorContainer = ({
  errors,
  itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}: ActivityErrorContainerProps) => {
  if (errors.length === 0) return null;

  const getErrorMessage = (error: string | { message: string }) => {
    return typeof error === "string" ? error : error.message;
  };

  return (
    <motion.div variants={itemVariants} className={styles.errorContainer}>
      <div className={styles.errorHeader}>
        <h4>⚠️ Errores encontrados ({errors.length})</h4>
        <p>Debes corregir los siguientes problemas antes de continuar:</p>
      </div>
      {errors.map((error, index) => (
        <div key={index} className={styles.errorMessage}>
          • {getErrorMessage(error)}
        </div>
      ))}
    </motion.div>
  );
};

export default ActivityErrorContainer;
