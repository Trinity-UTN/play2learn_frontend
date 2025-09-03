import React, { useState, useEffect, type ReactNode } from "react";
import {
  FaPlay,
  FaCheck,
  FaClock,
  FaStar,
  // FaCalendarAlt,
  // FaStopwatch,
  // FaRedo,
  FaTrophy,
  FaGamepad,
  FaDice,
  FaRocket,
  FaMedal,
  FaFlagCheckered,
} from "react-icons/fa";
import { ActivityStudentContextUI } from "./ActivityStudentContextUI";
import { useActivityStudent } from "../../../hooks/useActivityStudentAPI";

interface ProviderProps {
  children: ReactNode;
}

export const ActivityStudentProviderUI: React.FC<ProviderProps> = ({
  children,
}) => {
  const [activeFilter, setActiveFilter] = useState<
    "CREATED" | "PUBLISHED" | "FINISHED" | "ALL"
  >("ALL");
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");

  const { getActivityNotApproved, activityNotApproved } = useActivityStudent();

  useEffect(() => {
    if (activityNotApproved.length <= 0) {
      getActivityNotApproved();
    }
  }, []);

  const filteredActivities = activityNotApproved.filter((activity) => {
    const statusMatch =
      activeFilter === "ALL" || activity.status === activeFilter;
    const subjectMatch =
      selectedSubject === "ALL" || activity.subjectName === selectedSubject;
    const difficultyMatch =
      selectedDifficulty === "ALL" || activity.dificulty === selectedDifficulty;

    return statusMatch && subjectMatch && difficultyMatch;
  });

  const pendingCount = activityNotApproved.filter(
    (a) => a.status === "PUBLISHED"
  ).length;
  const completedCount = activityNotApproved.filter(
    (a) => a.status === "FINISHED"
  ).length;
  const availableCount = activityNotApproved.filter(
    (a) => a.status === "PUBLISHED"
  ).length;

  const stats = [
    {
      label: "Pendientes",
      value: pendingCount,
      icon: FaClock,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },
    {
      label: "Completadas",
      value: completedCount,
      icon: FaCheck,
      color: "#10B981",
      bgColor: "#D1FAE5",
    },
    {
      label: "Disponibles",
      value: availableCount,
      icon: FaStar,
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
    },
  ];

  const statusFilters = [
    { key: "ALL", label: "Todas", emoji: "🎯" },
    { key: "PUBLISHED", label: "Disponibles", emoji: "✨" },
    { key: "FINISHED", label: "Completadas", emoji: "✅" },
  ];

  const subjects = [
    "ALL",
    ...new Set(activityNotApproved.map((a) => a.subjectName)),
  ];
  const difficulties = [
    "ALL",
    ...new Set(activityNotApproved.map((a) => a.dificulty)),
  ];

  const icons = [
    FaPlay,
    FaGamepad,
    FaDice,
    FaRocket,
    FaTrophy,
    FaStar,
    FaMedal,
    FaFlagCheckered,
  ];
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    const Icon = icons[randomIndex];
    return <Icon />;
  };

  const getDaysUntilDue = (endDate: string) => {
    const due = new Date(endDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Vencida";
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    return `${diffDays} días`;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "FINISHED":
        return {
          icon: FaCheck,
          color: "#10B981",
          bgColor: "#D1FAE5",
          label: "Completada",
          buttonText: "Ver Resultados",
          buttonIcon: FaTrophy,
        };
      case "CREATED":
        return {
          icon: FaClock,
          color: "#F59E0B",
          bgColor: "#FEF3C7",
          label: "Pronto",
          buttonText: "Proximamente",
          buttonIcon: FaPlay,
        };
      case "PUBLISHED":
        return {
          icon: FaStar,
          color: "#8B5CF6",
          bgColor: "#EDE9FE",
          label: "Disponible",
          buttonText: "Comenzar",
          buttonIcon: FaPlay,
        };
      default:
        return {
          icon: FaClock,
          color: "#6B7280",
          bgColor: "#F3F4F6",
          label: "Desconocido",
          buttonText: "Ver",
          buttonIcon: FaPlay,
        };
    }
  };

  const colors = [
    "var(--color-stat-1)",
    "var(--color-stat-2)",
    "var(--color-stat-3)",
    "var(--color-stat-4)",
    "var(--color-stat-5)",
  ];
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  return (
    <ActivityStudentContextUI.Provider
      value={{
        activityNotApproved,
        activeFilter,
        setActiveFilter,
        selectedSubject,
        setSelectedSubject,
        selectedDifficulty,
        setSelectedDifficulty,
        filteredActivities,
        pendingCount,
        completedCount,
        availableCount,
        stats,
        statusFilters,
        subjects,
        difficulties,
        getRandomIcon,
        getDaysUntilDue,
        getRandomColor,
        getStatusConfig,
      }}
    >
      {children}
    </ActivityStudentContextUI.Provider>
  );
};
