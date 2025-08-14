import type React from "react";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaGamepad,
//   FaCheck,
//   FaClock,
//   FaExclamationTriangle,
//   FaPlay,
//   FaStar,
//   FaCalendarAlt,
// } from "react-icons/fa";
// import Card from "../../../shared/components/Card/CardComponent";
// import Button from "../../../shared/components/Button/ButtonComponent";
// import Badge from "../../../shared/components/Badge/BadgeComponent";
// import type { StudentActivity } from "../../types/walletType";
// import styles from "./StudentActivitiesView.module.css";
import ComingSoon from "../../../shared/components/comingSoon/ComingSoon";

const StudentActivitiesView: React.FC = () => {
  // const [activeTab, setActiveTab] = useState<"pending" | "completed">(
  //   "pending"
  // );

  // const pendingActivities: StudentActivity[] = [
  //   {
  //     id: "1",
  //     name: "Ahorcado de Verbos en Inglés",
  //     type: "Ahorcado",
  //     subject: "Inglés",
  //     difficulty: "Medio",
  //     points: 100,
  //     duration: "15 min",
  //     dueDate: "2024-03-16T23:59:59Z",
  //     status: "pending",
  //     icon: "🎯",
  //     color: "#8B5CF6",
  //   },
  //   {
  //     id: "2",
  //     name: "Secuencia del Sistema Solar",
  //     type: "Secuencia",
  //     subject: "Ciencias",
  //     difficulty: "Difícil",
  //     points: 150,
  //     duration: "20 min",
  //     dueDate: "2024-03-18T23:59:59Z",
  //     status: "pending",
  //     icon: "🌟",
  //     color: "#EF4444",
  //   },
  //   {
  //     id: "3",
  //     name: "Clasificación de Elementos Químicos",
  //     type: "Clasificación",
  //     subject: "Química",
  //     difficulty: "Medio",
  //     points: 120,
  //     duration: "18 min",
  //     dueDate: "2024-03-20T23:59:59Z",
  //     status: "pending",
  //     icon: "⚗️",
  //     color: "#10B981",
  //   },
  //   {
  //     id: "4",
  //     name: "Ecuaciones de Segundo Grado",
  //     type: "Práctica",
  //     subject: "Matemáticas",
  //     difficulty: "Difícil",
  //     points: 180,
  //     duration: "25 min",
  //     dueDate: "2024-03-17T23:59:59Z",
  //     status: "overdue",
  //     icon: "📐",
  //     color: "#F59E0B",
  //   },
  // ];

  // const completedActivities: StudentActivity[] = [
  //   {
  //     id: "5",
  //     name: "Clasificación de Animales",
  //     type: "Clasificación",
  //     subject: "Biología",
  //     difficulty: "Fácil",
  //     points: 85,
  //     duration: "12 min",
  //     completedDate: "2024-03-15T14:30:00Z",
  //     score: 95,
  //     status: "completed",
  //     icon: "🐾",
  //     color: "#10B981",
  //   },
  //   {
  //     id: "6",
  //     name: "Ecuaciones Cuadráticas",
  //     type: "Práctica",
  //     subject: "Matemáticas",
  //     difficulty: "Medio",
  //     points: 120,
  //     duration: "18 min",
  //     completedDate: "2024-03-14T16:45:00Z",
  //     score: 88,
  //     status: "completed",
  //     icon: "📊",
  //     color: "#3B82F6",
  //   },
  //   {
  //     id: "7",
  //     name: "Historia de México",
  //     type: "Secuencia",
  //     subject: "Historia",
  //     difficulty: "Medio",
  //     points: 75,
  //     duration: "15 min",
  //     completedDate: "2024-03-13T11:30:00Z",
  //     score: 92,
  //     status: "completed",
  //     icon: "🏛️",
  //     color: "#F59E0B",
  //   },
  //   {
  //     id: "8",
  //     name: "Verbos Irregulares",
  //     type: "Ahorcado",
  //     subject: "Inglés",
  //     difficulty: "Fácil",
  //     points: 60,
  //     duration: "10 min",
  //     completedDate: "2024-03-12T09:15:00Z",
  //     score: 85,
  //     status: "completed",
  //     icon: "📝",
  //     color: "#8B5CF6",
  //   },
  // ];

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //     },
  //   },
  // };

  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: { y: 0, opacity: 1 },
  // };

  // const getDaysUntilDue = (dueDate: string) => {
  //   const due = new Date(dueDate);
  //   const now = new Date();
  //   const diffTime = due.getTime() - now.getTime();
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays < 0) return "Vencida";
  //   if (diffDays === 0) return "Hoy";
  //   if (diffDays === 1) return "Mañana";
  //   return `En ${diffDays} días`;
  // };

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case "completed":
  //       return <FaCheck />;
  //     case "overdue":
  //       return <FaExclamationTriangle />;
  //     default:
  //       return <FaClock />;
  //   }
  // };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "completed":
  //       return "#10B981";
  //     case "overdue":
  //       return "#EF4444";
  //     default:
  //       return "#F59E0B";
  //   }
  // };

  // const getDifficultyColor = (difficulty: string) => {
  //   switch (difficulty) {
  //     case "Fácil":
  //       return "#10B981";
  //     case "Medio":
  //       return "#F59E0B";
  //     case "Difícil":
  //       return "#EF4444";
  //     default:
  //       return "#6B7280";
  //   }
  // };

  return (
    <ComingSoon />
    // <motion.div
    //   variants={containerVariants}
    //   initial="hidden"
    //   animate="visible"
    //   className={styles.activities}
    // >
    //   <motion.div variants={itemVariants} className={styles.header}>
    //     <div className={styles.titleSection}>
    //       <h1 className={styles.title}>
    //         <FaGamepad className={styles.titleIcon} />
    //         Mis Actividades
    //       </h1>
    //       <p className={styles.subtitle}>
    //         Gestiona tus actividades pendientes y revisa las completadas
    //       </p>
    //     </div>
    //   </motion.div>

    //   <motion.div variants={itemVariants} className={styles.tabs}>
    //     <div className={styles.tabButtons}>
    //       <Button
    //         variant={activeTab === "pending" ? "primary" : "ghost"}
    //         onClick={() => setActiveTab("pending")}
    //         className={styles.tabButton}
    //       >
    //         <FaClock className={styles.tabIcon} />
    //         Pendientes ({pendingActivities.length})
    //       </Button>
    //       <Button
    //         variant={activeTab === "completed" ? "primary" : "ghost"}
    //         onClick={() => setActiveTab("completed")}
    //         className={styles.tabButton}
    //       >
    //         <FaCheck className={styles.tabIcon} />
    //         Completadas ({completedActivities.length})
    //       </Button>
    //     </div>
    //   </motion.div>

    //   <motion.div variants={itemVariants} className={styles.content}>
    //     {activeTab === "pending" && (
    //       <div className={styles.activitiesGrid}>
    //         {pendingActivities.map((activity, index) => (
    //           <motion.div
    //             key={activity.id}
    //             initial={{ opacity: 0, y: 20 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ delay: index * 0.1 }}
    //             whileHover={{ y: -5, scale: 1.02 }}
    //           >
    //             <Card
    //               className={`${styles.activityCard} ${
    //                 activity.status === "overdue" ? styles.overdue : ""
    //               }`}
    //             >
    //               <div className={styles.cardHeader}>
    //                 <div
    //                   className={styles.activityIcon}
    //                   style={{
    //                     backgroundColor: `${activity.color}20`,
    //                     color: activity.color,
    //                   }}
    //                 >
    //                   {activity.icon}
    //                 </div>
    //                 <div className={styles.activityMeta}>
    //                   <Badge
    //                     variant={
    //                       activity.status === "overdue" ? "danger" : "warning"
    //                     }
    //                     className={styles.statusBadge}
    //                   >
    //                     {getStatusIcon(activity.status)}
    //                     {activity.status === "overdue"
    //                       ? "Vencida"
    //                       : "Pendiente"}
    //                   </Badge>
    //                 </div>
    //               </div>

    //               <div className={styles.cardContent}>
    //                 <h3 className={styles.activityName}>{activity.name}</h3>
    //                 <p className={styles.activitySubject}>
    //                   {activity.subject} • {activity.type}
    //                 </p>

    //                 <div className={styles.activityDetails}>
    //                   <div className={styles.detail}>
    //                     <FaStar className={styles.detailIcon} />
    //                     <span>{activity.points} puntos</span>
    //                   </div>
    //                   <div className={styles.detail}>
    //                     <FaClock className={styles.detailIcon} />
    //                     <span>{activity.duration}</span>
    //                   </div>
    //                   <div className={styles.detail}>
    //                     <FaCalendarAlt className={styles.detailIcon} />
    //                     <span>{getDaysUntilDue(activity.dueDate!)}</span>
    //                   </div>
    //                 </div>

    //                 <div className={styles.difficultyBadge}>
    //                   <Badge
    //                     style={{
    //                       backgroundColor: `${getDifficultyColor(
    //                         activity.difficulty
    //                       )}20`,
    //                       color: getDifficultyColor(activity.difficulty),
    //                     }}
    //                   >
    //                     {activity.difficulty}
    //                   </Badge>
    //                 </div>
    //               </div>

    //               <div className={styles.cardFooter}>
    //                 <Button
    //                   variant="primary"
    //                   fullWidth
    //                   className={styles.playButton}
    //                 >
    //                   <FaPlay className={styles.playIcon} />
    //                   Comenzar Actividad
    //                 </Button>
    //               </div>
    //             </Card>
    //           </motion.div>
    //         ))}
    //       </div>
    //     )}

    //     {activeTab === "completed" && (
    //       <div className={styles.activitiesGrid}>
    //         {completedActivities.map((activity, index) => (
    //           <motion.div
    //             key={activity.id}
    //             initial={{ opacity: 0, y: 20 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ delay: index * 0.1 }}
    //             whileHover={{ y: -5, scale: 1.02 }}
    //           >
    //             <Card className={styles.activityCard}>
    //               <div className={styles.cardHeader}>
    //                 <div
    //                   className={styles.activityIcon}
    //                   style={{
    //                     backgroundColor: `${activity.color}20`,
    //                     color: activity.color,
    //                   }}
    //                 >
    //                   {activity.icon}
    //                 </div>
    //                 <div className={styles.activityMeta}>
    //                   <Badge variant="success" className={styles.statusBadge}>
    //                     <FaCheck />
    //                     Completada
    //                   </Badge>
    //                 </div>
    //               </div>

    //               <div className={styles.cardContent}>
    //                 <h3 className={styles.activityName}>{activity.name}</h3>
    //                 <p className={styles.activitySubject}>
    //                   {activity.subject} • {activity.type}
    //                 </p>

    //                 <div className={styles.completedStats}>
    //                   <div className={styles.scoreSection}>
    //                     <div className={styles.scoreCircle}>
    //                       <span className={styles.scoreValue}>
    //                         {activity.score}%
    //                       </span>
    //                     </div>
    //                     <div className={styles.scoreInfo}>
    //                       <span className={styles.pointsEarned}>
    //                         +{activity.points} puntos
    //                       </span>
    //                       <span className={styles.completedDate}>
    //                         {new Date(
    //                           activity.completedDate!
    //                         ).toLocaleDateString("es-ES")}
    //                       </span>
    //                     </div>
    //                   </div>
    //                 </div>

    //                 <div className={styles.difficultyBadge}>
    //                   <Badge
    //                     style={{
    //                       backgroundColor: `${getDifficultyColor(
    //                         activity.difficulty
    //                       )}20`,
    //                       color: getDifficultyColor(activity.difficulty),
    //                     }}
    //                   >
    //                     {activity.difficulty}
    //                   </Badge>
    //                 </div>
    //               </div>

    //               <div className={styles.cardFooter}>
    //                 <Button
    //                   variant="ghost"
    //                   fullWidth
    //                   className={styles.reviewButton}
    //                 >
    //                   Ver Detalles
    //                 </Button>
    //               </div>
    //             </Card>
    //           </motion.div>
    //         ))}
    //       </div>
    //     )}
    //   </motion.div>
    // </motion.div>
  );
};

export default StudentActivitiesView;
