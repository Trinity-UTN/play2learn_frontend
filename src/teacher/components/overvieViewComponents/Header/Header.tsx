import { motion } from "framer-motion";
import styles from "./Header.module.css";
import { FaGamepad, FaUsers } from "react-icons/fa";
import type { StatisticsResponse } from "../../../types/Statistics.type";

type HeaderProps = {
  statistics: StatisticsResponse;
};
const Header = ({ statistics }: HeaderProps) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.header}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.title}>¡Bienvenido!</h1>
        <p className={styles.subtitle}>
          Aquí tienes un resumen de tus cursos, actividades y el progreso de tus
          estudiantes.
        </p>
      </div>

      <div className={styles.headerStats}>
        <div className={styles.headerStat}>
          <FaUsers className={styles.headerStatIcon} />
          <div>
            <span className={styles.headerStatNumber}>
              {statistics?.totalStudents}
            </span>
            <span className={styles.headerStatLabel}>Estudiantes</span>
          </div>
        </div>
        <div className={styles.headerStat}>
          <FaGamepad className={styles.headerStatIcon} />
          <div>
            <span className={styles.headerStatNumber}>
              {statistics?.totalActivities}
            </span>
            <span className={styles.headerStatLabel}>Actividades</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
