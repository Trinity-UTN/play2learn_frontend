import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaMedal,
  FaFire,
  FaStar,
  FaChartLine,
  FaCrown,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import type { RankingStudent } from "../../types/generalType";
import styles from "./StudentRankingView.module.css";
import ComingSoon from "../../../shared/components/comingSoon/ComingSoon";

const StudentRankingView: React.FC = () => {
  // const [selectedPeriod, setSelectedPeriod] = useState<
  //   "week" | "month" | "all"
  // >("week");

  // const currentStudent = {
  //   id: "current",
  //   name: "Ana García",
  //   avatar: "/placeholder.svg?height=100&width=100",
  //   points: 2450,
  //   level: 12,
  //   rank: 3,
  //   badge: "🌟",
  //   streak: 7,
  //   activitiesCompleted: 24,
  // };

  // const topStudents: RankingStudent[] = [
  //   {
  //     id: "1",
  //     name: "Carlos Mendoza",
  //     avatar: "/placeholder.svg?height=100&width=100",
  //     points: 3250,
  //     level: 15,
  //     rank: 1,
  //     badge: "👑",
  //     streak: 12,
  //     activitiesCompleted: 32,
  //   },
  //   {
  //     id: "2",
  //     name: "María López",
  //     avatar: "/placeholder.svg?height=100&width=100",
  //     points: 2890,
  //     level: 14,
  //     rank: 2,
  //     badge: "🥈",
  //     streak: 9,
  //     activitiesCompleted: 28,
  //   },
  //   {
  //     id: "3",
  //     name: "Ana García",
  //     avatar: "/placeholder.svg?height=100&width=100",
  //     points: 2450,
  //     level: 12,
  //     rank: 3,
  //     badge: "🥉",
  //     streak: 7,
  //     activitiesCompleted: 24,
  //   },
  //   {
  //     id: "4",
  //     name: "Diego Ruiz",
  //     avatar: "/placeholder.svg?height=100&width=100",
  //     points: 2180,
  //     level: 11,
  //     rank: 4,
  //     badge: "⭐",
  //     streak: 5,
  //     activitiesCompleted: 21,
  //   },
  //   {
  //     id: "5",
  //     name: "Sofia Chen",
  //     avatar: "/placeholder.svg?height=100&width=100",
  //     points: 1950,
  //     level: 10,
  //     rank: 5,
  //     badge: "🌟",
  //     streak: 8,
  //     activitiesCompleted: 19,
  //   },
  //   {
  //     id: "6",
  //     name: "Alejandro Torres",
  //     avatar: "/placeholder.svg?height=100&width=100",
  //     points: 1720,
  //     level: 9,
  //     rank: 6,
  //     badge: "✨",
  //     streak: 3,
  //     activitiesCompleted: 17,
  //   },
  //   {
  //     id: "7",
  //     name: "Isabella Morales",
  //     avatar: "/placeholder.svg?height=100&width=100",
  //     points: 1580,
  //     level: 9,
  //     rank: 7,
  //     badge: "💫",
  //     streak: 6,
  //     activitiesCompleted: 16,
  //   },
  //   {
  //     id: "8",
  //     name: "Mateo Silva",
  //     avatar: "/placeholder.svg?height=100&width=100",
  //     points: 1420,
  //     level: 8,
  //     rank: 8,
  //     badge: "🎯",
  //     streak: 4,
  //     activitiesCompleted: 14,
  //   },
  // ];

  // const periods = [
  //   { value: "week", label: "Esta Semana" },
  //   { value: "month", label: "Este Mes" },
  //   { value: "all", label: "Todo el Tiempo" },
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

  // const getRankIcon = (rank: number) => {
  //   switch (rank) {
  //     case 1:
  //       return <FaCrown className={styles.crownIcon} />;
  //     case 2:
  //       return <FaMedal className={styles.silverIcon} />;
  //     case 3:
  //       return <FaMedal className={styles.bronzeIcon} />;
  //     default:
  //       return <span className={styles.rankNumber}>#{rank}</span>;
  //   }
  // };

  // const getRankColor = (rank: number) => {
  //   switch (rank) {
  //     case 1:
  //       return "#f59e0b";
  //     case 2:
  //       return "#6b7280";
  //     case 3:
  //       return "#cd7c2f";
  //     default:
  //       return "#3b82f6";
  //   }
  // };

  // const getChangeIcon = (rank: number) => {
  //   // Simulamos cambios en el ranking
  //   const changes = [0, 2, -1, 1, 0, -2, 3, -1];
  //   const change = changes[rank - 1] || 0;

  //   if (change > 0) return <FaArrowUp className={styles.upArrow} />;
  //   if (change < 0) return <FaArrowDown className={styles.downArrow} />;
  //   return null;
  // };

  return (
    <ComingSoon />
    // <motion.div
    //   variants={containerVariants}
    //   initial="hidden"
    //   animate="visible"
    //   className={styles.ranking}
    // >
    //   <motion.div variants={itemVariants} className={styles.header}>
    //     <div className={styles.titleSection}>
    //       <h1 className={styles.title}>
    //         <FaTrophy className={styles.titleIcon} />
    //         Ranking
    //       </h1>
    //       <p className={styles.subtitle}>
    //         Compite con tus compañeros y alcanza la cima
    //       </p>
    //     </div>
    //   </motion.div>

    //   <motion.div variants={itemVariants} className={styles.periods}>
    //     <div className={styles.periodButtons}>
    //       {periods.map((period) => (
    //         <Button
    //           key={period.value}
    //           variant={selectedPeriod === period.value ? "primary" : "ghost"}
    //           //   onClick={() => setSelectedPeriod(period.value)}
    //           className={styles.periodButton}
    //         >
    //           {period.label}
    //         </Button>
    //       ))}
    //     </div>
    //   </motion.div>

    //   <motion.div variants={itemVariants} className={styles.myPosition}>
    //     <Card className={styles.myPositionCard}>
    //       <div className={styles.myPositionContent}>
    //         <div className={styles.myPositionLeft}>
    //           <div className={styles.myAvatar}>
    //             <img
    //               src={currentStudent.avatar || "/placeholder.svg"}
    //               alt="Mi avatar"
    //             />
    //             <div
    //               className={styles.myRankBadge}
    //               style={{ backgroundColor: getRankColor(currentStudent.rank) }}
    //             >
    //               {getRankIcon(currentStudent.rank)}
    //             </div>
    //           </div>
    //           <div className={styles.myInfo}>
    //             <h3 className={styles.myName}>Tu Posición</h3>
    //             <p className={styles.myRank}>
    //               #{currentStudent.rank} en el ranking
    //             </p>
    //           </div>
    //         </div>
    //         <div className={styles.myStats}>
    //           <div className={styles.myStat}>
    //             <FaStar className={styles.myStatIcon} />
    //             <span className={styles.myStatValue}>
    //               {currentStudent.points.toLocaleString()}
    //             </span>
    //             <span className={styles.myStatLabel}>puntos</span>
    //           </div>
    //           <div className={styles.myStat}>
    //             <FaFire className={styles.myStatIcon} />
    //             <span className={styles.myStatValue}>
    //               {currentStudent.streak}
    //             </span>
    //             <span className={styles.myStatLabel}>días</span>
    //           </div>
    //           <div className={styles.myStat}>
    //             <FaChartLine className={styles.myStatIcon} />
    //             <span className={styles.myStatValue}>
    //               {currentStudent.activitiesCompleted}
    //             </span>
    //             <span className={styles.myStatLabel}>actividades</span>
    //           </div>
    //         </div>
    //       </div>
    //     </Card>
    //   </motion.div>

    //   <motion.div variants={itemVariants} className={styles.podium}>
    //     <div className={styles.podiumContainer}>
    //       {topStudents.slice(0, 3).map((student, index) => (
    //         <motion.div
    //           key={student.id}
    //           className={`${styles.podiumPlace} ${
    //             styles[`place${student.rank}`]
    //           }`}
    //           initial={{ opacity: 0, y: 50 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ delay: index * 0.2 }}
    //         >
    //           <div className={styles.podiumStudent}>
    //             <div className={styles.podiumAvatar}>
    //               <img
    //                 src={student.avatar || "/placeholder.svg"}
    //                 alt={student.name}
    //               />
    //               <div
    //                 className={styles.podiumBadge}
    //                 style={{ backgroundColor: getRankColor(student.rank) }}
    //               >
    //                 {getRankIcon(student.rank)}
    //               </div>
    //             </div>
    //             <div className={styles.podiumInfo}>
    //               <h4 className={styles.podiumName}>{student.name}</h4>
    //               <p className={styles.podiumPoints}>
    //                 {student.points.toLocaleString()} pts
    //               </p>
    //               <div className={styles.podiumStats}>
    //                 <span className={styles.podiumLevel}>
    //                   Nivel {student.level}
    //                 </span>
    //                 <span className={styles.podiumStreak}>
    //                   {student.streak} días
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //           <div className={styles.podiumHeight} />
    //         </motion.div>
    //       ))}
    //     </div>
    //   </motion.div>

    //   <motion.div variants={itemVariants} className={styles.leaderboard}>
    //     <Card className={styles.leaderboardCard}>
    //       <div className={styles.cardHeader}>
    //         <h3 className={styles.cardTitle}>
    //           <FaTrophy className={styles.cardIcon} />
    //           Tabla de Posiciones
    //         </h3>
    //       </div>
    //       <div className={styles.leaderboardList}>
    //         {topStudents.map((student, index) => (
    //           <motion.div
    //             key={student.id}
    //             className={`${styles.leaderboardItem} ${
    //               student.id === currentStudent.id ? styles.currentUser : ""
    //             }`}
    //             initial={{ opacity: 0, x: -20 }}
    //             animate={{ opacity: 1, x: 0 }}
    //             transition={{ delay: index * 0.05 }}
    //             whileHover={{ x: 5 }}
    //           >
    //             <div className={styles.studentLeft}>
    //               <div
    //                 className={styles.studentRank}
    //                 style={{ color: getRankColor(student.rank) }}
    //               >
    //                 {getRankIcon(student.rank)}
    //               </div>
    //               <div className={styles.studentAvatar}>
    //                 <img
    //                   src={student.avatar || "/placeholder.svg"}
    //                   alt={student.name}
    //                 />
    //               </div>
    //               <div className={styles.studentInfo}>
    //                 <h4 className={styles.studentName}>{student.name}</h4>
    //                 <div className={styles.studentMeta}>
    //                   <span className={styles.studentLevel}>
    //                     Nivel {student.level}
    //                   </span>
    //                   <span className={styles.studentBadge}>
    //                     {student.badge}
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className={styles.studentRight}>
    //               <div className={styles.studentStats}>
    //                 <div className={styles.studentStat}>
    //                   <FaStar className={styles.statIcon} />
    //                   <span className={styles.statValue}>
    //                     {student.points.toLocaleString()}
    //                   </span>
    //                 </div>
    //                 <div className={styles.studentStat}>
    //                   <FaFire className={styles.statIcon} />
    //                   <span className={styles.statValue}>{student.streak}</span>
    //                 </div>
    //                 <div className={styles.studentStat}>
    //                   <FaChartLine className={styles.statIcon} />
    //                   <span className={styles.statValue}>
    //                     {student.activitiesCompleted}
    //                   </span>
    //                 </div>
    //               </div>
    //               <div className={styles.rankChange}>
    //                 {getChangeIcon(student.rank)}
    //               </div>
    //             </div>
    //           </motion.div>
    //         ))}
    //       </div>
    //     </Card>
    //   </motion.div>
    // </motion.div>
  );
};

export default StudentRankingView;
