"use client";
import { motion } from "framer-motion";
import {
  FaBook,
  FaGamepad,
  FaGift,
  FaUsers,
  FaChartLine,
  FaClock,
  FaCalendarAlt,
  FaStar,
  FaPlus,
  FaEye,
  FaTrophy,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Badge from "../../../shared/components/Badge/BadgeComponent";
import styles from "./Overview.module.css";

export function OverviewView() {
  // Datos simulados del docente
  const teacherData = {
    name: "Prof. María García",
    courses: [
      {
        id: 1,
        name: "Matemáticas Básicas",
        code: "MAT101",
        year: "1er Año",
        students: 32,
        activities: 8,
        completionRate: 78,
        color: "#007bff",
      },
      {
        id: 2,
        name: "Álgebra Avanzada",
        code: "MAT201",
        year: "2do Año",
        students: 24,
        activities: 12,
        completionRate: 85,
        color: "#10b981",
      },
      {
        id: 3,
        name: "Cálculo I",
        code: "MAT301",
        year: "3er Año",
        students: 18,
        activities: 6,
        completionRate: 92,
        color: "#f59e0b",
      },
    ],
    totalStudents: 74,
    totalActivities: 26,
    totalBenefitsUsed: 45,
    averageCompletion: 85,
  };

  const recentActivities = [
    {
      id: 1,
      name: "Ecuaciones Cuadráticas",
      type: "Preguntados",
      course: "MAT101",
      completions: 28,
      totalStudents: 32,
      createdAt: "Hace 2 días",
      difficulty: "Medio",
      color: "#007bff",
    },
    {
      id: 2,
      name: "Factorización",
      type: "Completar Oraciones",
      course: "MAT201",
      completions: 22,
      totalStudents: 24,
      createdAt: "Hace 4 días",
      difficulty: "Difícil",
      color: "#10b981",
    },
    {
      id: 3,
      name: "Límites Básicos",
      type: "Ordenar Secuencias",
      course: "MAT301",
      completions: 16,
      totalStudents: 18,
      createdAt: "Hace 1 semana",
      difficulty: "Fácil",
      color: "#f59e0b",
    },
  ];

  const topBenefits = [
    {
      name: "Extensión de Plazo",
      uses: 12,
      course: "MAT101",
      icon: FaClock,
      color: "#ff6f3c",
    },
    {
      name: "Falta Justificada",
      uses: 8,
      course: "MAT201",
      icon: FaCalendarAlt,
      color: "#10b981",
    },
    {
      name: "Consulta Privada",
      uses: 6,
      course: "MAT301",
      icon: FaUsers,
      color: "#8b5cf6",
    },
  ];

  const upcomingEvents = [
    {
      title: "Parcial MAT101",
      date: "15 Ene",
      type: "Examen",
      course: "Matemáticas Básicas",
      color: "#dc2626",
    },
    {
      title: "Entrega TP MAT201",
      date: "18 Ene",
      type: "Trabajo",
      course: "Álgebra Avanzada",
      color: "#f59e0b",
    },
    {
      title: "Clase Especial MAT301",
      date: "22 Ene",
      type: "Clase",
      course: "Cálculo I",
      color: "#10b981",
    },
  ];

  const quickActions = [
    {
      title: "Nueva Actividad",
      description: "Crear actividad para tus cursos",
      icon: FaGamepad,
      color: "#007bff",
      action: "create-activity",
    },
    {
      title: "Nuevo Beneficio",
      description: "Agregar recompensa para estudiantes",
      icon: FaGift,
      color: "#8b5cf6",
      action: "create-benefit",
    },
    {
      title: "Ver Estadísticas",
      description: "Analizar progreso de estudiantes",
      icon: FaChartLine,
      color: "#10b981",
      action: "view-stats",
    },
    {
      title: "Gestionar Cursos",
      description: "Administrar tus cursos asignados",
      icon: FaBook,
      color: "#ff6f3c",
      action: "view-courses",
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.title}>¡Bienvenido, {teacherData.name}!</h1>
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
                {teacherData.totalStudents}
              </span>
              <span className={styles.headerStatLabel}>Estudiantes</span>
            </div>
          </div>
          <div className={styles.headerStat}>
            <FaGamepad className={styles.headerStatIcon} />
            <div>
              <span className={styles.headerStatNumber}>
                {teacherData.totalActivities}
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
                {teacherData.courses.length}
              </span>
              <span className={styles.statLabel}>Cursos Asignados</span>
            </div>
          </div>
          <div className={styles.statProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "100%", backgroundColor: "#007bff" }}
              />
            </div>
            <span className={styles.progressText}>Todos activos</span>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statHeader}>
            <div
              className={styles.statIcon}
              style={{ backgroundColor: "#10b981" }}
            >
              <FaCheckCircle />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>
                {teacherData.averageCompletion}%
              </span>
              <span className={styles.statLabel}>Promedio Completado</span>
            </div>
          </div>
          <div className={styles.statProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${teacherData.averageCompletion}%`,
                  backgroundColor: "#10b981",
                }}
              />
            </div>
            <span className={styles.progressText}>Excelente participación</span>
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
                {teacherData.totalBenefitsUsed}
              </span>
              <span className={styles.statLabel}>Beneficios Canjeados</span>
            </div>
          </div>
          <div className={styles.statProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "75%", backgroundColor: "#f59e0b" }}
              />
            </div>
            <span className={styles.progressText}>Alta motivación</span>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statHeader}>
            <div
              className={styles.statIcon}
              style={{ backgroundColor: "#8b5cf6" }}
            >
              <FaTrophy />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>A+</span>
              <span className={styles.statLabel}>Calificación Docente</span>
            </div>
          </div>
          <div className={styles.statProgress}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "95%", backgroundColor: "#8b5cf6" }}
              />
            </div>
            <span className={styles.progressText}>Evaluación estudiantes</span>
          </div>
        </Card>
      </motion.div>

      {/* Courses Overview */}
      <motion.div variants={itemVariants} className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Mis Cursos</h2>
          <Button variant="ghost" size="sm">
            <FaEye className={styles.buttonIcon} />
            Ver todos
          </Button>
        </div>
        <div className={styles.coursesGrid}>
          {teacherData.courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={styles.courseCard}>
                <div className={styles.courseHeader}>
                  <div
                    className={styles.courseIcon}
                    style={{ backgroundColor: course.color }}
                  >
                    <FaBook />
                  </div>
                  <div className={styles.courseInfo}>
                    <h3 className={styles.courseName}>{course.name}</h3>
                    <p className={styles.courseCode}>
                      {course.code} - {course.year}
                    </p>
                  </div>
                </div>

                <div className={styles.courseStats}>
                  <div className={styles.courseStat}>
                    <FaUsers className={styles.courseStatIcon} />
                    <span>{course.students} estudiantes</span>
                  </div>
                  <div className={styles.courseStat}>
                    <FaGamepad className={styles.courseStatIcon} />
                    <span>{course.activities} actividades</span>
                  </div>
                </div>

                <div className={styles.courseProgress}>
                  <div className={styles.courseProgressHeader}>
                    <span className={styles.courseProgressLabel}>
                      Completado
                    </span>
                    <span className={styles.courseProgressValue}>
                      {course.completionRate}%
                    </span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${course.completionRate}%`,
                        backgroundColor: course.color,
                      }}
                    />
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
              <Button variant="ghost" size="sm">
                <FaPlus className={styles.buttonIcon} />
                Nueva
              </Button>
            </div>
            <div className={styles.activitiesList}>
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={styles.activityItem}
                >
                  <div
                    className={styles.activityIcon}
                    style={{ backgroundColor: activity.color }}
                  >
                    <FaGamepad />
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityHeader}>
                      <h4 className={styles.activityName}>{activity.name}</h4>
                      <Badge
                        variant={
                          activity.difficulty === "Fácil"
                            ? "success"
                            : activity.difficulty === "Medio"
                            ? "warning"
                            : "danger"
                        }
                        className={styles.difficultyBadge}
                      >
                        {activity.difficulty}
                      </Badge>
                    </div>
                    <p className={styles.activityMeta}>
                      {activity.type} • {activity.course} • {activity.createdAt}
                    </p>
                    <div className={styles.activityProgress}>
                      <div className={styles.activityProgressBar}>
                        <div
                          className={styles.activityProgressFill}
                          style={{
                            width: `${
                              (activity.completions / activity.totalStudents) *
                              100
                            }%`,
                            backgroundColor: activity.color,
                          }}
                        />
                      </div>
                      <span className={styles.activityProgressText}>
                        {activity.completions}/{activity.totalStudents}{" "}
                        completaron
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Benefits Usage */}
        <motion.div variants={itemVariants}>
          <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <FaGift className={styles.cardIcon} />
                Beneficios Más Usados
              </h3>
              <Button variant="ghost" size="sm">
                <FaEye className={styles.buttonIcon} />
                Ver todos
              </Button>
            </div>
            <div className={styles.benefitsList}>
              {topBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={styles.benefitItem}
                >
                  <div
                    className={styles.benefitIcon}
                    style={{ backgroundColor: benefit.color }}
                  >
                    <benefit.icon />
                  </div>
                  <div className={styles.benefitContent}>
                    <h4 className={styles.benefitName}>{benefit.name}</h4>
                    <p className={styles.benefitCourse}>{benefit.course}</p>
                  </div>
                  <div className={styles.benefitUsage}>
                    <span className={styles.benefitUsageNumber}>
                      {benefit.uses}
                    </span>
                    <span className={styles.benefitUsageLabel}>usos</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={itemVariants}>
          <Card className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <FaCalendarAlt className={styles.cardIcon} />
                Próximos Eventos
              </h3>
              <Button variant="ghost" size="sm">
                <FaBell className={styles.buttonIcon} />
                Recordatorios
              </Button>
            </div>
            <div className={styles.eventsList}>
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={styles.eventItem}
                >
                  <div className={styles.eventDate}>
                    <span className={styles.eventDateText}>{event.date}</span>
                  </div>
                  <div className={styles.eventContent}>
                    <h4 className={styles.eventTitle}>{event.title}</h4>
                    <p className={styles.eventCourse}>{event.course}</p>
                  </div>
                  <Badge
                    variant={
                      event.type === "Examen"
                        ? "danger"
                        : event.type === "Trabajo"
                        ? "warning"
                        : "success"
                    }
                    className={styles.eventBadge}
                  >
                    {event.type}
                  </Badge>
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
