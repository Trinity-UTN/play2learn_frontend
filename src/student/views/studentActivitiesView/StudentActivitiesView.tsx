import { useState } from "react";
import { motion } from "framer-motion";
import type { ConfigurationActivity } from "../../types/Activity.type";
import ActivityHeader from "../../components/studentActivitiesViewComponents/activityHeader/ActivityHeader";
import ActivityStats from "../../components/studentActivitiesViewComponents/activityStats/ActivityStats";
import ActivityFilters from "../../components/studentActivitiesViewComponents/activityFilters/ActivityFilters";
import ActivityGrid from "../../components/studentActivitiesViewComponents/activityGrid/ActivityGrid";
import styles from "./StudentActivitiesView.module.css";

const StudentActivitiesView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "pending" | "completed" | "available"
  >("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  // Mock data - En producción vendría de una API
  const activities: ConfigurationActivity[] = [
    {
      id: "1",
      name: "Ahorcado de Verbos Irregulares",
      description: "Adivina los verbos irregulares en inglés más comunes",
      startDate: "2024-03-15T00:00:00Z",
      endDate: "2024-03-20T23:59:59Z",
      difficulty: "Medio",
      maxTime: 15,
      subjectName: "Inglés",
      attempts: 3,
      type: "Ahorcado",
      status: "pending",
      points: 120,
      icon: "🎯",
      color: "#8B5CF6",
      progress: 0,
    },
    {
      id: "2",
      name: "Secuencia del Sistema Solar",
      description: "Ordena los planetas según su distancia al Sol",
      startDate: "2024-03-16T00:00:00Z",
      endDate: "2024-03-22T23:59:59Z",
      difficulty: "Difícil",
      maxTime: 20,
      subjectName: "Ciencias",
      attempts: 2,
      type: "Secuencia",
      status: "available",
      points: 180,
      icon: "🌟",
      color: "#EF4444",
      progress: 0,
    },
    {
      id: "3",
      name: "Clasificación de Elementos",
      description: "Clasifica los elementos químicos por sus propiedades",
      startDate: "2024-03-14T00:00:00Z",
      endDate: "2024-03-19T23:59:59Z",
      difficulty: "Medio",
      maxTime: 18,
      subjectName: "Química",
      attempts: 4,
      type: "Clasificación",
      status: "completed",
      points: 150,
      icon: "⚗️",
      color: "#10B981",
      completedDate: "2024-03-15T14:30:00Z",
      score: 95,
      progress: 100,
    },
    {
      id: "4",
      name: "Ecuaciones Cuadráticas",
      description: "Resuelve ecuaciones de segundo grado paso a paso",
      startDate: "2024-03-13T00:00:00Z",
      endDate: "2024-03-17T23:59:59Z",
      difficulty: "Difícil",
      maxTime: 25,
      subjectName: "Matemáticas",
      attempts: 3,
      type: "Práctica",
      status: "overdue",
      points: 200,
      icon: "📐",
      color: "#F59E0B",
      progress: 60,
    },
    {
      id: "5",
      name: "Historia de México",
      description: "Ordena cronológicamente los eventos históricos",
      startDate: "2024-03-12T00:00:00Z",
      endDate: "2024-03-18T23:59:59Z",
      difficulty: "Fácil",
      maxTime: 12,
      subjectName: "Historia",
      attempts: 5,
      type: "Secuencia",
      status: "completed",
      points: 100,
      icon: "🏛️",
      color: "#3B82F6",
      completedDate: "2024-03-13T11:30:00Z",
      score: 88,
      progress: 100,
    },
    {
      id: "6",
      name: "Clasificación de Animales",
      description: "Agrupa los animales según su clasificación taxonómica",
      startDate: "2024-03-17T00:00:00Z",
      endDate: "2024-03-25T23:59:59Z",
      difficulty: "Fácil",
      maxTime: 10,
      subjectName: "Biología",
      attempts: 4,
      type: "Clasificación",
      status: "available",
      points: 90,
      icon: "🐾",
      color: "#06B6D4",
      progress: 0,
    },
  ];

  const filteredActivities = activities.filter((activity) => {
    const statusMatch =
      activeFilter === "all" || activity.status === activeFilter;
    const subjectMatch =
      selectedSubject === "all" || activity.subjectName === selectedSubject;
    const difficultyMatch =
      selectedDifficulty === "all" ||
      activity.difficulty === selectedDifficulty;

    return statusMatch && subjectMatch && difficultyMatch;
  });

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
      className={styles.activitiesView}
    >
      <ActivityHeader />

      <ActivityStats activities={activities} />

      <ActivityFilters
        activeFilter={activeFilter}
        selectedSubject={selectedSubject}
        selectedDifficulty={selectedDifficulty}
        onFilterChange={setActiveFilter}
        onSubjectChange={setSelectedSubject}
        onDifficultyChange={setSelectedDifficulty}
        activities={activities}
      />

      <ActivityGrid activities={filteredActivities} />
    </motion.div>
  );
};

export default StudentActivitiesView;
