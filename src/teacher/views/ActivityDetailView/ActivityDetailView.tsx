import { useState } from "react";
import { motion } from "framer-motion";

import ActivityDetailHeader from "../../components/ActivityDetailsView/ActivityDetailHeader/ActivityDetailHeader";
import ActivitySummary from "../../components/ActivityDetailsView/ActivitySummary/ActivitySummary";
import ActivityMetrics from "../../components/ActivityDetailsView/ActivityMetrics/ActivityMetrics";
import StudentsTable from "../../components/ActivityDetailsView/StudentsTable/StudentsTable";
import FinishActivityModal from "../../components/ActivityDetailsView/FinishActivityModal/FinishActivityModal";
import styles from "./ActivityDetailView.module.css";
import type { ActivityDetail } from "../../types/CreatedActivities";
import { useParams } from "react-router-dom";

interface ActivityDetailViewProps {
  onBack?: () => void;
}

const ActivityDetailView = ({ onBack }: ActivityDetailViewProps) => {
  const [showFinishModal, setShowFinishModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  const activityId = id || "0";

  // Mock data - En producción vendría de una API
  const activityDetail: ActivityDetail = {
    id: activityId,
    name: "Verbos Irregulares en Inglés",
    description:
      "Actividad de ahorcado para practicar verbos irregulares en pasado simple y participio",
    status: "PUBLISHED",
    startDate: "2024-03-15T00:00:00Z",
    endDate: "2024-03-20T23:59:59Z",
    subjectName: "Inglés",
    courseName: "3ro A",
    type: "ahorcado",
    totalStudents: 28,
    completedStudents: 22,
    averageScore: 85,
    createdAt: "2024-03-10T00:00:00Z",
    maxAttempts: 3,
    metrics: {
      totalStudents: 28,
      studentsCompleted: 22,
      studentsApproved: 18,
      participationPercentage: 78.57,
      averageTime: 480,
      successPercentage: 81.82,
      averageScore: 85,
    },
    students: [
      {
        id: "1",
        studentId: "st1",
        studentName: "Juan",
        studentLastName: "Pérez",
        status: "APPROVED",
        attemptsUsed: 2,
        score: 95,
        timeSpent: 420,
        lastAttempt: "2024-03-16T10:30:00Z",
        completedAt: "2024-03-16T10:30:00Z",
      },
      {
        id: "2",
        studentId: "st2",
        studentName: "María",
        studentLastName: "García",
        status: "APPROVED",
        attemptsUsed: 1,
        score: 100,
        timeSpent: 360,
        lastAttempt: "2024-03-15T14:20:00Z",
        completedAt: "2024-03-15T14:20:00Z",
      },
      {
        id: "3",
        studentId: "st3",
        studentName: "Carlos",
        studentLastName: "Rodríguez",
        status: "FAILED",
        attemptsUsed: 3,
        score: 45,
        timeSpent: 540,
        lastAttempt: "2024-03-17T16:15:00Z",
        completedAt: "2024-03-17T16:15:00Z",
      },
      {
        id: "4",
        studentId: "st4",
        studentName: "Ana",
        studentLastName: "Martínez",
        status: "IN_PROGRESS",
        attemptsUsed: 1,
        lastAttempt: "2024-03-18T09:00:00Z",
      },
      {
        id: "5",
        studentId: "st5",
        studentName: "Pedro",
        studentLastName: "López",
        status: "NOT_STARTED",
        attemptsUsed: 0,
      },
      {
        id: "6",
        studentId: "st6",
        studentName: "Laura",
        studentLastName: "Fernández",
        status: "APPROVED",
        attemptsUsed: 1,
        score: 90,
        timeSpent: 390,
        lastAttempt: "2024-03-16T11:45:00Z",
        completedAt: "2024-03-16T11:45:00Z",
      },
    ],
  };

  const handleFinishActivity = () => {
    console.log("[v0] Finishing activity:", activityId);
    // TODO: Implementar lógica de finalización
    setShowFinishModal(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <ActivityDetailHeader
        activity={activityDetail}
        onBack={onBack}
        onFinish={() => setShowFinishModal(true)}
      />

      <div className={styles.content}>
        <ActivitySummary activity={activityDetail} />

        <ActivityMetrics metrics={activityDetail.metrics} />

        <StudentsTable
          students={activityDetail.students}
          maxAttempts={activityDetail.maxAttempts}
        />
      </div>

      {showFinishModal && (
        <FinishActivityModal
          activityName={activityDetail.name}
          onConfirm={handleFinishActivity}
          onCancel={() => setShowFinishModal(false)}
        />
      )}
    </motion.div>
  );
};

export default ActivityDetailView;
