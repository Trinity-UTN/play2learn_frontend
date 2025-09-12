import { motion, type Variants } from "framer-motion";
import styles from "./ActionButtons.module.css";

interface ActionButtonsProps {
  passed: boolean;
  onContinue: () => void;
  onRetry?: () => void;
  onViewDetails?: () => void;
  hasRetryAttempts: boolean;
}

export default function ActionButtons({
  passed,
  onContinue,
  onRetry,
  onViewDetails,
  hasRetryAttempts,
}: ActionButtonsProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className={styles.buttonsContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        className={`${styles.primaryButton} ${
          passed ? styles.success : styles.neutral
        }`}
        variants={buttonVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
      >
        {passed ? "🎯 Continuar" : "📚 Volver al Dashboard"}
      </motion.button>

      <div className={styles.secondaryButtons}>
        {!passed && onRetry && hasRetryAttempts && (
          <motion.button
            className={`${styles.secondaryButton} ${styles.retry}`}
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
          >
            🔄 Reintentar
          </motion.button>
        )}

        {onViewDetails && (
          <motion.button
            className={`${styles.secondaryButton} ${styles.details}`}
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewDetails}
          >
            📊 Ver Detalles
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
