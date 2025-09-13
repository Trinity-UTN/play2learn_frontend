import { motion, type Variants } from "framer-motion";
import styles from "./ActionButtons.module.css";
import { useNavigate } from "react-router-dom";
import { useGameManager } from "../../../../shared/hooks/games/useGameManager";
import type { CurrentActivityInterface } from "../../../types/Activity.type";
interface ActionButtonsProps {
  passed: boolean;
  activity: CurrentActivityInterface;
}

export default function ActionButtons({
  passed,
  activity,
}: ActionButtonsProps) {
  const gameManager = useGameManager(activity?.name);

  const navigate = useNavigate();
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

  const handleFinishActivity = async () => {
    if (!activity) return;
    gameManager?.resetGame();
  };
  const onContinue = () => {
    if (passed) {
      navigate("/dashboard/student/wallet");
    } else {
      navigate("/dashboard/student/actividades/list");
    }
    handleFinishActivity();
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
        {passed ? "Obtener monedas" : "Volver a actividades"}
      </motion.button>

      {/* <div className={styles.secondaryButtons}>
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
      </div> */}
    </motion.div>
  );
}
