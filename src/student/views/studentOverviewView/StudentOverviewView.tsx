import type React from "react";
import { motion } from "framer-motion";
import {
  FaFire,
  FaTrophy,
  FaGamepad,
  FaStar,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import { useStudentAuth } from "../../context/contextProvisorio";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import styles from "./StudentOverviewView.module.css";

const StudentOverviewView: React.FC = () => {
  const { student } = useStudentAuth();

  const quickStats = [
    {
      title: "Puntos Totales",
      value: "2,450",
      icon: FaStar,
      color: "#F59E0B",
      change: "+125 esta semana",
    },
    {
      title: "Racha Actual",
      value: "7 días",
      icon: FaFire,
      color: "#EF4444",
      change: "¡Sigue así!",
    },
    {
      title: "Ranking",
      value: "#3",
      icon: FaTrophy,
      color: "#8B5CF6",
      change: "↑ Subiste 2 posiciones",
    },
    {
      title: "Actividades",
      value: "12/15",
      icon: FaGamepad,
      color: "#10B981",
      change: "3 pendientes",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      name: "Clasificación de Animales",
      subject: "Biología",
      points: 85,
      completedDate: "Hace 2 horas",
      score: 95,
      color: "#10B981",
    },
    {
      id: "2",
      name: "Ecuaciones Cuadráticas",
      subject: "Matemáticas",
      points: 120,
      completedDate: "Ayer",
      score: 88,
      color: "#3B82F6",
    },
    {
      id: "3",
      name: "Historia de México",
      subject: "Historia",
      points: 75,
      completedDate: "Hace 2 días",
      score: 92,
      color: "#F59E0B",
    },
  ];

  const upcomingActivities = [
    {
      id: "4",
      name: "Ahorcado de Verbos",
      subject: "Inglés",
      dueDate: "Mañana",
      difficulty: "Medio",
      points: 100,
      color: "#8B5CF6",
    },
    {
      id: "5",
      name: "Secuencia de ADN",
      subject: "Biología",
      dueDate: "En 3 días",
      difficulty: "Difícil",
      points: 150,
      color: "#EF4444",
    },
  ];

  const achievements =
    student?.achievements.filter((a) => a.isUnlocked).slice(0, 3) || [];

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
      className={styles.overview}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>
            ¡Hola, {student?.name?.split(" ")[0]}! 👋
          </h1>
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

      <motion.div variants={itemVariants} className={styles.statsGrid}>
        {quickStats.map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={styles.statCard}>
              <div className={styles.statContent}>
                <div
                  className={styles.statIcon}
                  style={{
                    backgroundColor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  <stat.icon />
                </div>
                <div className={styles.statInfo}>
                  <h3 className={styles.statValue}>{stat.value}</h3>
                  <p className={styles.statTitle}>{stat.title}</p>
                  <span className={styles.statChange}>{stat.change}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <motion.div variants={itemVariants}>
            <Card className={styles.activitiesCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <FaGamepad className={styles.cardIcon} />
                  Actividades Recientes
                </h2>
                <Button variant="ghost" size="sm">
                  Ver todas
                </Button>
              </div>
              <div className={styles.activitiesList}>
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className={styles.activityItem}
                    whileHover={{ x: 5 }}
                  >
                    <div className={styles.activityLeft}>
                      <div
                        className={styles.activityDot}
                        style={{ backgroundColor: activity.color }}
                      />
                      <div className={styles.activityInfo}>
                        <h4 className={styles.activityName}>{activity.name}</h4>
                        <p className={styles.activitySubject}>
                          {activity.subject}
                        </p>
                      </div>
                    </div>
                    <div className={styles.activityRight}>
                      <div className={styles.activityScore}>
                        <span className={styles.scoreValue}>
                          {activity.score}%
                        </span>
                        <span className={styles.pointsEarned}>
                          +{activity.points} pts
                        </span>
                      </div>
                      <span className={styles.activityDate}>
                        {activity.completedDate}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className={styles.upcomingCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <FaCalendarAlt className={styles.cardIcon} />
                  Próximas Actividades
                </h2>
              </div>
              <div className={styles.upcomingList}>
                {upcomingActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className={styles.upcomingItem}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={styles.upcomingLeft}>
                      <div
                        className={styles.upcomingDot}
                        style={{ backgroundColor: activity.color }}
                      />
                      <div className={styles.upcomingInfo}>
                        <h4 className={styles.upcomingName}>{activity.name}</h4>
                        <p className={styles.upcomingSubject}>
                          {activity.subject}
                        </p>
                      </div>
                    </div>
                    <div className={styles.upcomingRight}>
                      <div className={styles.upcomingMeta}>
                        <span className={styles.upcomingDue}>
                          {activity.dueDate}
                        </span>
                        <span className={styles.upcomingPoints}>
                          {activity.points} pts
                        </span>
                      </div>
                      <span
                        className={`${styles.difficultyBadge} ${
                          styles[activity.difficulty.toLowerCase()]
                        }`}
                      >
                        {activity.difficulty}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className={styles.rightColumn}>
          <motion.div variants={itemVariants}>
            <Card className={styles.achievementsCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <FaTrophy className={styles.cardIcon} />
                  Logros Recientes
                </h2>
              </div>
              <div className={styles.achievementsList}>
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className={styles.achievementItem}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={styles.achievementIcon}>
                      {achievement.icon}
                    </div>
                    <div className={styles.achievementInfo}>
                      <h4 className={styles.achievementName}>
                        {achievement.name}
                      </h4>
                      <p className={styles.achievementDesc}>
                        {achievement.description}
                      </p>
                      <span className={styles.achievementDate}>
                        Desbloqueado:{" "}
                        {new Date(achievement.unlockedDate!).toLocaleDateString(
                          "es-ES"
                        )}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className={styles.progressCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>
                  <FaChartLine className={styles.cardIcon} />
                  Progreso Semanal
                </h2>
              </div>
              <div className={styles.progressContent}>
                <div className={styles.progressStats}>
                  <div className={styles.progressStat}>
                    <span className={styles.progressLabel}>Actividades</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: "80%" }}
                      />
                    </div>
                    <span className={styles.progressValue}>12/15</span>
                  </div>
                  <div className={styles.progressStat}>
                    <span className={styles.progressLabel}>Puntos</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: "65%" }}
                      />
                    </div>
                    <span className={styles.progressValue}>650/1000</span>
                  </div>
                  <div className={styles.progressStat}>
                    <span className={styles.progressLabel}>Racha</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: "70%" }}
                      />
                    </div>
                    <span className={styles.progressValue}>7/10 días</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentOverviewView;
