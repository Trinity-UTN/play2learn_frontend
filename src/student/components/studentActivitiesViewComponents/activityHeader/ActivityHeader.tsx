import { motion } from "framer-motion";
import { FaGamepad, FaRocket } from "react-icons/fa";
import styles from "./ActivityHeader.module.css";

const ActivityHeader: React.FC = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.header}>
      <div className={styles.titleSection}>
        <div className={styles.iconWrapper}>
          <FaGamepad className={styles.mainIcon} />
          <motion.div
            className={styles.rocketIcon}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <FaRocket />
          </motion.div>
        </div>

        <div className={styles.textContent}>
          <h1 className={styles.title}>
            Mis Actividades
            <motion.span
              className={styles.sparkle}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
              }}
            >
              ✨
            </motion.span>
          </h1>
          <p className={styles.subtitle}>
            ¡Completa tus actividades y gana puntos increíbles! 🎯
          </p>
        </div>
      </div>

      <motion.div
        className={styles.motivationalBadge}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={styles.badgeText}>¡Sigue así, campeón! 🏆</span>
      </motion.div>
    </motion.div>
  );
};

export default ActivityHeader;
