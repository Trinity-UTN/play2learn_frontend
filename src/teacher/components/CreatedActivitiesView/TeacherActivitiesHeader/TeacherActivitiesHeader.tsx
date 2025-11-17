import { motion } from "framer-motion";
import { FaClipboardList, FaChartLine } from "react-icons/fa";
import styles from "./TeacherActivitiesHeader.module.css";

const TeacherActivitiesHeader = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.header}>
      <div className={styles.titleSection}>
        <div className={styles.iconWrapper}>
          <FaClipboardList className={styles.mainIcon} />
          <motion.div
            className={styles.chartIcon}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <FaChartLine />
          </motion.div>
        </div>

        <div className={styles.textContent}>
          <h1 className={styles.title}>Gestión de Actividades</h1>
          <p className={styles.subtitle}>
            Administra y monitorea el progreso de tus actividades
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherActivitiesHeader;
