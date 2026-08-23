import type React from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaCalendarAlt,
  FaGraduationCap,
  FaUserTie,
} from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import styles from "./OverviewView.module.css";
import { useStatistics } from "../../hooks/useStatistics";
import { useEffect, useMemo } from "react";
import ReserveDisplay from "../../components/overViewViewComponents/ReserveDisplay/ReserveDisplay";
import { MdMenuBook } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCountUp } from "../../../shared/hooks/useCountUp";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import type { IconType } from "react-icons";

// 1. Define configuration outside for maintainability and scalability
interface StatConfig {
  key: keyof NonNullable<ReturnType<typeof useStatistics>["statistics"]>;
  title: string;
  icon: IconType;
  color: string;
}

const STATS_CONFIG: StatConfig[] = [
  {
    key: "totalCourses",
    title: "Total Cursos",
    icon: FaBook,
    color: "#007bff",
  },
  {
    key: "totalYears",
    title: "Años Académicos",
    icon: FaCalendarAlt,
    color: "#ff6f3c",
  },
  {
    key: "totalStudents",
    title: "Estudiantes",
    icon: FaGraduationCap,
    color: "#b9e769",
  },
  {
    key: "totalTeachers",
    title: "Docentes",
    icon: FaUserTie,
    color: "#007bff",
  },
];

const OverviewView: React.FC = () => {
  const { getStatistics, loading, statistics } = useStatistics();
  const navigate = useNavigate();

  // 2. Transform statistics into renderable items, handling nulls gracefully
  const displayStats = useMemo(() => {
    if (!statistics) return [];
    return STATS_CONFIG.map((config) => ({
      ...config,
      value: statistics[config.key] ?? 0, // Fallback for undefined/null
    }));
  }, [statistics]);

  const quickActions = [
    {
      title: "Ver Cursos",
      icon: FaBook,
      color: "#007bff",
      url: "/dashboard/courses/list",
    },
    {
      title: "Ver Estudiantes",
      icon: FaGraduationCap,
      color: "#ff6f3c",
      url: "/dashboard/students/list",
    },
    {
      title: "Ver Docentes",
      icon: FaUserTie,
      color: "#b9e769",
      url: "/dashboard/teachers/list",
    },
    {
      title: "Ver Materias",
      icon: MdMenuBook,
      color: "#8b5cf6",
      url: "/dashboard/subjects/list",
    },
  ];

  useEffect(() => {
    getStatistics();
  }, []);

  const totalBalance = useCountUp(
    statistics?.reserveTotalBalance ? statistics.reserveTotalBalance : 1,
    1,
    {
      steps: 40,
      interval: 50,
    },
  );

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

  if (loading) {
    return <LoadingSpinnerComponent />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.constructionBanner}>
          <h1 className={styles.title}>Panel de Administración</h1>
        </div>
      </motion.div>

      {/* 3. Improved statsGrid rendering */}
      <motion.div variants={itemVariants} className={styles.statsGrid}>
        {displayStats.map((stat) => (
          <motion.div
            key={stat.key}
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
          <Card className={styles.statisticsCard}>
            {statistics && (
              <ReserveDisplay
                reserveTotalBalance={totalBalance}
                reserveTotalBalanceOnCirculation={
                  statistics.reserveTotalBalanceOnCirculation
                }
                reserveTotalBalanceOnReserve={
                  statistics.reserveTotalBalanceOnReserve
                }
              />
            )}
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
                  onClick={() => navigate(`${action.url}`)}
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
      </div>
    </motion.div>
  );
};

export default OverviewView;
