import React from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaGamepad,
  FaGift,
  FaUsers,
  FaChartLine,
  FaStar,
  FaEye,
} from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import styles from "./Overview.module.css";
import { useStatistics } from "../../hooks/useStatistics";
import { useEffect, useState } from "react";
import { getActivityIcon } from "../../../shared/utils/activityIcons";
import { useNavigate } from "react-router-dom";
export function OverviewView() {
  const { statistics, getStatistics, loading } = useStatistics();
  const [totalCourse, setTotalCourse] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    getStatistics();
  }, []);

  const quickActions = [
    {
      title: "Nueva Actividad",
      description: "Crear actividad para tus cursos",
      icon: FaGamepad,
      color: "#007bff",
      action: "create-activity",
      url: "/dashboard/teacher/actividades/list",
    },
    {
      title: "Nuevo Beneficio",
      description: "Agregar recompensa para estudiantes",
      icon: FaGift,
      color: "#8b5cf6",
      action: "create-benefit",
      url: "/dashboard/teacher/beneficio/create",
    },
  ];

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

  if (!statistics && loading) {
    return <div>Cargando...</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.title}>¡Bienvenido!</h1>
          <p className={styles.subtitle}>
            Aquí tienes un resumen de tus cursos, actividades y el progreso de
            tus estudiantes.
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
      {/* Main Stats */}
      <motion.div variants={itemVariants} className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statHeader}>
            <div
              className={styles.statIcon}
              style={{ backgroundColor: "#007bff" }}
            >
              <FaBook />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>
                {statistics?.totalCourses}
              </span>
              <span className={styles.statLabel}>Cursos Asignados</span>
            </div>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statHeader}>
            <div
              className={styles.statIcon}
              style={{ backgroundColor: "#f59e0b" }}
            >
              <FaGift />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>
                {statistics?.totalBenefits}
              </span>
              <span className={styles.statLabel}>Beneficios Canjeados</span>
            </div>
          </div>
        </Card>
      </motion.div>
      {/* Courses Overview */}
      <motion.div variants={itemVariants} className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Mis Cursos</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTotalCourse(!totalCourse)}
          >
            <FaEye className={styles.buttonIcon} />
            Ver todos
          </Button>
        </div>
        <div className={styles.coursesGrid}>
          {statistics?.subjectsStatistics
            .slice(0, totalCourse ? statistics.subjectsStatistics.length : 4)
            .map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={styles.courseCard}>
                  <div className={styles.courseHeader}>
                    <div
                      className={styles.courseIcon}
                      style={{ backgroundColor: "var(--color-stat-4)" }}
                    >
                      <FaBook />
                    </div>
                    <div className={styles.courseInfo}>
                      <h3 className={styles.courseName}>{course.name}</h3>
                    </div>
                  </div>

                  <div className={styles.courseStats}>
                    <div className={styles.courseStat}>
                      <FaUsers className={styles.courseStatIcon} />
                      <span>{course.totalStudents} estudiantes</span>
                    </div>
                    <div className={styles.courseStat}>
                      <FaGamepad className={styles.courseStatIcon} />
                      <span>{course.totalActivities} actividades</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
        </div>
      </motion.div>
      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* Recent Activities */}
        <motion.div variants={itemVariants}>
          <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <FaGamepad className={styles.cardIcon} />
                Actividades Recientes
              </h3>
            </div>
            <div className={styles.activitiesList}>
              {statistics?.activitiesStatistics.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={styles.activityItem}
                >
                  <div
                    className={styles.activityIcon}
                    style={{ backgroundColor: "var(--color-stat-2)" }}
                  >
                    {React.createElement(getActivityIcon(activity.name))}
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityHeader}>
                      <h4 className={styles.activityName}>{activity.name}</h4>
                    </div>
                    <p className={styles.activityMeta}>
                      {activity.createdDayAgo}
                    </p>
                    <div className={styles.activityProgress}>
                      <div className={styles.activityProgressBar}>
                        <div
                          className={styles.activityProgressFill}
                          style={{
                            width: `${activity.totalRealizations * 100}%`,
                            backgroundColor: "#10b981",
                          }}
                        />
                      </div>
                      <span className={styles.activityProgressText}>
                        {activity.totalRealizations} completaron
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <FaStar className={styles.cardIcon} />
                Acciones Rápidas
              </h3>
            </div>
            <div className={styles.actionsGrid}>
              {quickActions.map((action) => (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.actionButton}
                  style={{ backgroundColor: `${action.color}15` }}
                  onClick={() => navigate(action.url)}
                >
                  <action.icon
                    className={styles.actionIcon}
                    style={{ color: action.color }}
                  />
                  <div className={styles.actionContent}>
                    <span className={styles.actionTitle}>{action.title}</span>
                    <span className={styles.actionDescription}>
                      {action.description}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default OverviewView;
