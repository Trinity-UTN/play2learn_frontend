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
          <h1 className={styles.title}>Mis Actividades</h1>
          <p className={styles.subtitle}>
            ¡Completa tus actividades y gana monedas!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityHeader;
