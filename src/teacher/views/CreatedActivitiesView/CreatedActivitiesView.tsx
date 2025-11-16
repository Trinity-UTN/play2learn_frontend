import { useState } from "react";
import { motion } from "framer-motion";

import TeacherActivitiesHeader from "../../components/CreatedActivitiesView/TeacherActivitiesHeader/TeacherActivitiesHeader";
import ActivitiesStatsCards from "../../components/CreatedActivitiesView/ActivitiesStatsCards/ActivitiesStatsCards";
import ActivityFilters from "../../components/CreatedActivitiesView/ActivityFilters/ActivityFilters";
import ActivitiesList from "../../components/CreatedActivitiesView/ActivitiesList/ActivitiesList";
import PendingReviewSection from "../../components/CreatedActivitiesView/PendingReviewSection/PendingReviewSection";
import styles from "./CreatedActivitiesView.module.css";
import type {
  PendingReviewActivity,
  TeacherActivity,
} from "../../types/CreatedActivities";
import { useNavigate } from "react-router-dom";

const CreatedActivitiesView = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const navigate = useNavigate();
  // Mock data - En producción vendría de una API
  const activities: TeacherActivity[] = [
    {
      id: "1",
      name: "Verbos Irregulares en Inglés",
      description: "Actividad de ahorcado para practicar verbos irregulares",
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
    },
    {
      id: "2",
      name: "Clasificación de Elementos Químicos",
      description: "Clasificar elementos según sus propiedades",
      status: "PUBLISHED",
      startDate: "2024-03-14T00:00:00Z",
      endDate: "2024-03-19T23:59:59Z",
      subjectName: "Química",
      courseName: "4to B",
      type: "classification",
      totalStudents: 25,
      completedStudents: 18,
      averageScore: 78,
      createdAt: "2024-03-08T00:00:00Z",
    },
    {
      id: "3",
      name: "Secuencia del Sistema Solar",
      description: "Ordenar los planetas según su distancia al Sol",
      status: "EXPIRED",
      startDate: "2024-03-01T00:00:00Z",
      endDate: "2024-03-10T23:59:59Z",
      subjectName: "Ciencias",
      courseName: "2do A",
      type: "sequence",
      totalStudents: 30,
      completedStudents: 30,
      averageScore: 92,
      createdAt: "2024-02-25T00:00:00Z",
    },
    {
      id: "4",
      name: "Ecuaciones Cuadráticas",
      description: "Quiz sobre resolución de ecuaciones de segundo grado",
      status: "PENDING_PUBLICATION",
      startDate: "2024-03-22T00:00:00Z",
      endDate: "2024-03-28T23:59:59Z",
      subjectName: "Matemáticas",
      courseName: "3ro B",
      type: "quiz",
      totalStudents: 27,
      completedStudents: 0,
      averageScore: 0,
      createdAt: "2024-03-18T00:00:00Z",
    },
  ];

  const pendingReviews: PendingReviewActivity[] = [
    {
      id: "pr1",
      activityName: "Ensayo sobre la Revolución Industrial",
      studentName: "Juan Pérez",
      studentId: "st1",
      submittedAt: "2024-03-18T14:30:00Z",
      activityType: "Ensayo",
      courseName: "3ro A",
    },
    {
      id: "pr2",
      activityName: "Trabajo Práctico de Biología",
      studentName: "María García",
      studentId: "st2",
      submittedAt: "2024-03-18T10:15:00Z",
      activityType: "Trabajo Práctico",
      courseName: "4to B",
    },
    {
      id: "pr3",
      activityName: "Informe de Laboratorio",
      studentName: "Carlos Rodríguez",
      studentId: "st3",
      submittedAt: "2024-03-17T16:45:00Z",
      activityType: "Informe",
      courseName: "3ro A",
    },
  ];

  const filteredActivities = activities.filter((activity) => {
    const statusMatch =
      selectedStatus === "all" || activity.status === selectedStatus;
    const subjectMatch =
      selectedSubject === "all" || activity.subjectName === selectedSubject;
    return statusMatch && subjectMatch;
  });

  const handleRepublishActivity = (activityId: string) => {
    console.log("[v0] Republishing activity:", activityId);
    // TODO: Implementar lógica de re-exposición
  };

  const handleViewActivity = (activityId: string) => {
    navigate(`/dashboard/teacher/actividades/created/details/${activityId}`);
  };

  const handleReviewActivity = (reviewId: string) => {
    console.log("[v0] Reviewing activity:", reviewId);
    // TODO: Navegar a panel de revisión
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
      <TeacherActivitiesHeader />

      <ActivitiesStatsCards
        activities={activities}
        pendingReviews={pendingReviews}
      />

      <div className={styles.mainContent}>
        <div className={styles.activitiesSection}>
          <ActivityFilters
            selectedStatus={selectedStatus}
            selectedSubject={selectedSubject}
            onStatusChange={setSelectedStatus}
            onSubjectChange={setSelectedSubject}
            activities={activities}
          />

          <ActivitiesList
            activities={filteredActivities}
            onRepublish={handleRepublishActivity}
            onViewDetails={handleViewActivity}
          />
        </div>

        <div className={styles.reviewSection}>
          <PendingReviewSection
            pendingReviews={pendingReviews}
            onReview={handleReviewActivity}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CreatedActivitiesView;
