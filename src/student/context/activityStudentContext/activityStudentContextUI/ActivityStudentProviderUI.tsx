import React, { useState, useEffect, type ReactNode } from "react";
import {
  FaPlay,
  FaCheck,
  FaClock,
  FaStar,
  FaTrophy,
  FaGamepad,
  FaDice,
  FaRocket,
  FaMedal,
  FaFlagCheckered,
} from "react-icons/fa";
import { ActivityStudentContextUI } from "./ActivityStudentContextUI";
import { useActivityStudent } from "../../../hooks/useActivityStudentAPI";
import { mapActivityToUI } from "../../../adapters/activityAdapter";
import { FiX, FiXCircle } from "react-icons/fi";
import type { ActivityUI } from "../../../types/Activity.type";

interface ProviderProps {
  children: ReactNode;
}

export const ActivityStudentProviderUI: React.FC<ProviderProps> = ({
  children,
}) => {
  const [activeFilter, setActiveFilter] = useState<
    "CREATED" | "PUBLISHED" | "FINISHED" | "APPROVED" | "ALL"
  >("ALL");

  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");

  const {
    getActivityNotApproved,
    activityNotApproved,
    activityApproved,
    getActivityApproved,
  } = useActivityStudent();

  useEffect(() => {
    if (activityNotApproved.length <= 0) {
      getActivityNotApproved();
      getActivityApproved();
    }
  }, []);

  const activitiesUI: ActivityUI[] = [
    ...activityNotApproved.map(mapActivityToUI),
    ...activityApproved.map(mapActivityToUI),
  ];

  const filteredActivities = activitiesUI.filter((activity) => {
    const statusMatch =
      activeFilter === "ALL" || activity.status === activeFilter;
    const subjectMatch =
      selectedSubject === "ALL" || activity.subjectName === selectedSubject;
    const difficultyMatch =
      selectedDifficulty === "ALL" ||
      activity.difficulty === selectedDifficulty;

    return statusMatch && subjectMatch && difficultyMatch;
  });

  const pendingCount = activityNotApproved.filter(
    (a) => a.status === "PUBLISHED"
  ).length;
  const defeatedCount = activityNotApproved.filter(
    (a) => a.status === "FINISHED" //VENCIDA
  ).length;
  const availableCount = activityNotApproved.filter(
    (a) => a.status === "PUBLISHED"
  ).length;
  const approvedCount = activityApproved.filter(
    (a) => a.state === "APPROVED"
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
      label: "Vencida",
      value: defeatedCount,
      icon: FiX,
      color: "#b92110ff",
      bgColor: "#fadad1ff",
    },
    {
      label: "Aprobadas",
      value: approvedCount,
      icon: FaCheck,
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
    },
  ];

  const statusFilters = [
    { key: "ALL", label: "Todas", emoji: "🎯" },
    { key: "PUBLISHED", label: "Disponibles", emoji: "✨" },
    { key: "FINISHED", label: "Vencidas", emoji: "❌" },
    { key: "APPROVED", label: "Aprobadas", emoji: "✅" },
  ];

  const subjects = [
    "ALL",
    ...new Set(activityNotApproved.map((a) => a.subjectName)),
  ];
  const difficulties = [
    "ALL",
    ...new Set(activityNotApproved.map((a) => a.difficulty)),
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
          icon: FiXCircle,
          color: "#b91810ff",
          bgColor: "#D1FAE5",
          label: "Vencida",
          buttonText: "Vencida",
          buttonIcon: FiX,
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
      case "APPROVED":
        return {
          icon: FaStar,
          color: "#8B5CF6",
          bgColor: "#EDE9FE",
          label: "Aprobada",
          buttonText: "Ver Resultados",
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
        activeFilter,
        setActiveFilter,
        selectedSubject,
        setSelectedSubject,
        selectedDifficulty,
        setSelectedDifficulty,
        filteredActivities,
        pendingCount,
        defeatedCount,
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
