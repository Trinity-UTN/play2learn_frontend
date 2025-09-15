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
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";
import type { FilterOption } from "./ActivityStudentContextUI.type";

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}
interface ProviderProps {
  children: ReactNode;
}

export const ActivityStudentProviderUI: React.FC<ProviderProps> = ({
  children,
}) => {
  const {
    getActivityNotApproved,
    activityNotApproved,
    activityApproved,
    getActivityApproved,
    paginatedActivitiesApproved,
    paginatedActivitiesNotApproved,
    getPaginatedActivitiesApproved,
    getPaginatedActivitiesNotApproved,
  } = useActivityStudent();
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    setPaginationParams,
  } = usePaginationParams();

  // Estados locales

  const [activeFilter, setActiveFilter] = useState<
    "CREATED" | "PUBLISHED" | "EXPIRED" | "APPROVED"
  >("PUBLISHED");
  const [selectedSubject, setSelectedSubject] = useState<FilterOption | null>(
    null
  );
  const difficulties = ["ALL", "FACIL", "MEDIO", "DIFICIL"];
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("PUBLISHED");

  // Fetch inicial para estadisticas
  //Este get se realiza para poder obter las estadisticas, hasta que del back manden direcamente las estadisticas
  useEffect(() => {
    if (activityNotApproved.length <= 0) {
      getActivityApproved();
      getActivityNotApproved();
    }
  }, []);

  const loadActivities = async () => {
    let filters: string[] = [];
    let filtersValues: string[] = [];

    // status filter
    if (activeFilter === "EXPIRED" || activeFilter === "PUBLISHED") {
      filters.push("status");
      filtersValues.push(activeFilter);
    }
    // subject filter
    if (selectedSubject && selectedSubject.name !== "ALL") {
      filters.push("subjectId");
      filtersValues.push(selectedSubject.id);
    }
    // difficulty filter
    if (selectedDifficulty && selectedDifficulty !== "ALL") {
      filters.push("difficulty");
      filtersValues.push(selectedDifficulty);
    }
    // decide qué endpoint llamar
    if (activeFilter === "APPROVED") {
      await getPaginatedActivitiesApproved({
        ...paginationParams,
        filters,
        filtersValues,
      });
    } else {
      await getPaginatedActivitiesNotApproved({
        ...paginationParams,
        filters,
        filtersValues,
      });
    }
  };

  useEffect(() => {
    loadActivities();
  }, [activeFilter, paginationParams, selectedSubject, selectedDifficulty]);

  useEffect(() => {
    setPaginationParams((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [activeFilter, selectedSubject, selectedDifficulty]);

  // Actividades UI
  const getActivitiesUI = (): ActivityUI[] => {
    if (activeFilter === "APPROVED") {
      return (paginatedActivitiesApproved?.results ?? []).map(mapActivityToUI);
    }
    return (paginatedActivitiesNotApproved?.results ?? []).map(mapActivityToUI);
  };
  const filteredActivities = getActivitiesUI();

  //Stats y contadores
  const getCounts = () => {
    const pending = activityNotApproved.filter(
      (a) => a.status === "PUBLISHED"
    ).length;
    const expired = activityNotApproved.filter(
      (a) => a.status === "EXPIRED"
    ).length;
    const approved = activityApproved.filter(
      (a) => a.state === "APPROVED"
    ).length;
    return { pending, expired, approved };
  };

  const {
    pending: pendingCount,
    expired: defeatedCount,
    approved: approvedCount,
  } = getCounts();

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

  //Filtros
  const statusFilters = [
    { key: "PUBLISHED", label: "Disponibles", emoji: "✨" },
    { key: "EXPIRED", label: "Vencidas", emoji: "❌" },
    { key: "APPROVED", label: "Aprobadas", emoji: "✅" },
  ];

  //Acomodar con los filtros del get
  const subjects: FilterOption[] = [
    { id: "ALL", name: "Todas las materias" },
    ...activityNotApproved
      .map((a) => ({ id: a.subjectId.toString(), name: a.subjectName }))
      .filter(
        (value, index, self) =>
          index === self.findIndex((s) => s.id === value.id)
      ),
  ];

  //Iconos
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
    const Icon = icons[Math.floor(Math.random() * icons.length)];
    return <Icon />;
  };

  //Dias
  const getDaysUntilDue = (endDate: string) => {
    const due = new Date(endDate);
    const now = new Date();
    const diffDays = Math.ceil(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays < 0) return "Vencida";
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    return `${diffDays} días`;
  };

  //Status
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "EXPIRED":
        return {
          icon: FiXCircle,
          label: "Vencida",
          buttonText: "Vencida",
          buttonIcon: FiX,
        };
      case "CREATED":
        return {
          icon: FaClock,
          label: "Pronto",
          buttonText: "Próximamente",
          buttonIcon: FaPlay,
        };
      case "PUBLISHED":
        return {
          icon: FaStar,
          label: "Disponible",
          buttonText: "Comenzar",
          buttonIcon: FaPlay,
        };
      case "APPROVED":
        return {
          icon: FaStar,
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

  //Colors
  const colors = [
    "var(--color-stat-1)",
    "var(--color-stat-2)",
    "var(--color-stat-3)",
    "var(--color-stat-4)",
    "var(--color-stat-5)",
  ];
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  //Paginacion
  const getSource = () =>
    activeFilter === "APPROVED"
      ? paginatedActivitiesApproved
      : paginatedActivitiesNotApproved;
  const source = getSource();

  const paginationInfo: PaginationInfo | null = source
    ? {
        currentPage: source.currentPage,
        totalPages: source.totalPages,
        pageSize: source.pageSize,
        totalItems: source.results.length,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }
    : null;

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
        stats,
        statusFilters,
        subjects,
        difficulties,
        getRandomIcon,
        getDaysUntilDue,
        getRandomColor,
        getStatusConfig,
        //paginacion
        paginationInfo,
      }}
    >
      {children}
    </ActivityStudentContextUI.Provider>
  );
};
