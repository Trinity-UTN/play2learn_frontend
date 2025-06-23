import type React from "react";
import { motion } from "framer-motion";
// import { FaBook, FaCalendarAlt, FaGraduationCap, FaUserTie} from "react-icons/fa";
import { FaTools } from "react-icons/fa";
// import Card from "../../../shared/components/Card/CardComponent";
import styles from "./OverviewView.module.css";

const OverviewView: React.FC = () => {
  // const stats = [
  //   { title: "Total Cursos", value: "24", icon: FaBook, color: "#007bff" },
  //   {
  //     title: "Años Académicos",
  //     value: "3",
  //     icon: FaCalendarAlt,
  //     color: "#ff6f3c",
  //   },
  //   {
  //     title: "Estudiantes",
  //     value: "1,247",
  //     icon: FaGraduationCap,
  //     color: "#b9e769",
  //   },
  //   { title: "Docentes", value: "89", icon: FaUserTie, color: "#007bff" },
  // ];

  // const recentActivity = [
  //   {
  //     text: "Nuevo estudiante registrado",
  //     time: "Hace 2 horas",
  //     color: "#007bff",
  //   },
  //   {
  //     text: "Curso de Matemáticas actualizado",
  //     time: "Hace 4 horas",
  //     color: "#ff6f3c",
  //   },
  //   { text: "Nuevo docente asignado", time: "Hace 1 día", color: "#b9e769" },
  // ];

  // const quickActions = [
  //   { title: "Crear Curso", icon: FaBook, color: "#007bff" },
  //   { title: "Nuevo Estudiante", icon: FaGraduationCap, color: "#ff6f3c" },
  //   { title: "Agregar Docente", icon: FaUserTie, color: "#b9e769" },
  //   { title: "Nuevo Año", icon: FaCalendarAlt, color: "#007bff" },
  // ];

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.constructionBanner}>
          <FaTools className={styles.constructionIcon} />
          <h1 className={styles.title}>
            Panel de Administración - En Construcción
          </h1>
          <p className={styles.subtitle}>Esta página está en desarrollo.</p>
        </div>
      </motion.div>

      {/* <motion.div variants={itemVariants} className={styles.statsGrid}>
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statTitle}>{stat.title}</span>
                <div
                  className={styles.statIcon}
                  style={{ backgroundColor: stat.color }}
                >
                  <stat.icon />
                </div>
              </div>
              <div className={styles.statValue}>{stat.value}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.contentGrid}>
        <motion.div variants={itemVariants}>
          <Card className={styles.activityCard}>
            <h3 className={styles.cardTitle}>Actividad Reciente</h3>
            <div className={styles.activityList}>
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={styles.activityItem}
                >
                  <div
                    className={styles.activityDot}
                    style={{ backgroundColor: activity.color }}
                  />
                  <div className={styles.activityContent}>
                    <p className={styles.activityText}>{activity.text}</p>
                    <p className={styles.activityTime}>{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className={styles.actionsCard}>
            <h3 className={styles.cardTitle}>Acciones Rápidas</h3>
            <div className={styles.actionsGrid}>
              {quickActions.map((action) => (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.actionButton}
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <action.icon
                    className={styles.actionIcon}
                    style={{ color: action.color }}
                  />
                  <span className={styles.actionText}>{action.title}</span>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div> */}
    </motion.div>
  );
};

export default OverviewView;
