import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";
import styles from "./RankingHeader.module.css";

export const RankingHeader = () => {
  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.iconContainer}>
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <FaTrophy className={styles.mainIcon} />
        </motion.div>
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Tabla de Posiciones</h1>
        <p className={styles.subtitle}>
          Compite con tus compañeros y alcanza el primer puesto
        </p>
      </div>

      <div className={styles.decorativeIcons}>
        <FaMedal className={styles.decorIcon} />
        <FaAward className={styles.decorIcon} />
      </div>
    </motion.div>
  );
};
