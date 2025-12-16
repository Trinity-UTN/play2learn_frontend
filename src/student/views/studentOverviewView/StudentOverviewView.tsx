import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import styles from "./StudentOverviewView.module.css";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import QuickStats from "../../components/studentOverviewViewComponents/QuickStats/QuickStats";
import LastRealizationsComponents from "../../components/studentOverviewViewComponents/LastRealizations/LastRealizationsComponent";
import { LoadingSpinnerComponent } from "@/shared";

const StudentOverviewView: React.FC = () => {
  const { currentStudent, getStatisticsStudent, statistics } =
    useCurrentStudent();

  useEffect(() => {
    getStatisticsStudent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  {
    if (!statistics)
      return (
        <div className={styles.contLoading}>
          <LoadingSpinnerComponent colorText="white" />
        </div>
      );
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.overview}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>¡Hola {currentStudent?.name}!</h1>
          <p className={styles.subtitle}>
            Aquí tienes un resumen de tu progreso académico
          </p>
        </div>
        <div className={styles.dateInfo}>
          <FaCalendarAlt className={styles.dateIcon} />
          <span>
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </motion.div>

      <QuickStats statistics={statistics!} />

      <LastRealizationsComponents
        lastRealizations={statistics.lastRealizations}
      />
    </motion.div>
  );
};

export default StudentOverviewView;
