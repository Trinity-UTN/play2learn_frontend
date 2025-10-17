import { useState, useEffect, type ReactNode } from "react";
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
  FaBan,
} from "react-icons/fa";
import { FiX, FiXCircle } from "react-icons/fi";
import { ActivityStudentContextUI } from "./ActivityStudentContextUI";
import type { FilterOption } from "./ActivityStudentContextUI.type";
import type { ActivityUI } from "../../../types/Activity.type";
import { mapActivityToUI } from "../../../adapters/activityAdapter";
import { useActivityStudent } from "../../../hooks/useActivityStudentAPI";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";

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
    "CREATED" | "PUBLISHED" | "EXPIRED" | "APPROVED" | "DISAPPROVED"
  >("PUBLISHED");

  const [selectedSubject, setSelectedSubject] = useState<FilterOption | null>(
    null
  );

  const difficulties = ["ALL", "FACIL", "MEDIO", "DIFICIL"];
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");

  // Fetch inicial para estadisticas
  useEffect(() => {
    if (activityNotApproved.length <= 0) {
      getActivityApproved();
      getActivityNotApproved();
    }
  }, []);

  const loadActivities = async () => {
    const filters: string[] = [];
    const filtersValues: string[] = [];

    // Actividades aprobadas
    if (activeFilter === "APPROVED") {
      await getPaginatedActivitiesApproved({
        ...paginationParams,
        filters:
          selectedSubject && selectedSubject.name !== "ALL"
            ? ["subjectId"]
            : [],
        filtersValues:
          selectedSubject && selectedSubject.name !== "ALL"
            ? [selectedSubject.id]
            : [],
      });
      return;
    }

    // Actividades no aprobadas
    if (activeFilter === "DISAPPROVED") {
      // Desaprobadas: remainingAttempts === 0
      filters.push("disapproved");
      filtersValues.push("true");
    } else {
      // PUBLISHED, EXPIRED, CREATED
      filters.push("status");
      filtersValues.push(activeFilter);

      // No agregar DISAPPROVED
      filters.push("disapproved");
      filtersValues.push("false");
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

    await getPaginatedActivitiesNotApproved({
      ...paginationParams,
      filters,
      filtersValues,
    });
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

  // Stats y contadores
  const getCounts = () => {
    // Disponibles: PUBLISHED con intentos restantes y NO desaprobadas
    const pending = activityNotApproved.filter(
      (a) => a.status === "PUBLISHED" && a.remainingAttempts > 0
    ).length;

    // Vencidas: EXPIRED con intentos restantes y NO desaprobadas
    const expired = activityNotApproved.filter(
      (a) => a.status === "EXPIRED" && a.remainingAttempts > 0
    ).length;

    // Aprobadas
    const approved = activityApproved.filter(
      (a) => a.state === "APPROVED"
    ).length;

    // Desaprobadas: sin intentos restantes (independiente del status)
    const disapproved = activityNotApproved.filter(
      (a) => a.remainingAttempts === 0
    ).length;

    return { pending, expired, approved, disapproved };
  };

  const {
    pending: pendingCount,
    expired: defeatedCount,
    approved: approvedCount,
    disapproved: disapprovedCount,
  } = getCounts();

  const stats = [
    {
      label: "Disponibles",
      value: pendingCount,
      icon: FaClock,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },
    {
      label: "Aprobadas",
      value: approvedCount,
      icon: FaCheck,
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
    },
    {
      label: "Desaprobadas",
      value: disapprovedCount,
      icon: FaBan,
      color: "#DC2626",
      bgColor: "#FEE2E2",
    },
    {
      label: "Vencidas",
      value: defeatedCount,
      icon: FiX,
      color: "#b92110ff",
      bgColor: "#fadad1ff",
    },
  ];

  // Filtros de status
  const statusFilters = [
    { key: "PUBLISHED", label: "Disponibles", emoji: <FaStar /> },
    { key: "APPROVED", label: "Aprobadas", emoji: <FaCheck /> },
    { key: "DISAPPROVED", label: "Desaprobadas", emoji: <FaBan /> },
    { key: "EXPIRED", label: "Vencidas", emoji: <FiXCircle /> },
  ];

  // Materias
  const subjects: FilterOption[] = [
    { id: "ALL", name: "Todas las materias" },
    ...Array.from(
      new Map(
        [...activityNotApproved, ...activityApproved].map((a) => [
          a.subjectId.toString(),
          { id: a.subjectId.toString(), name: a.subjectName },
        ])
      ).values()
    ),
  ];

  // Iconos
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

  // Dias
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

  // Status
  const getStatusConfig = (status: string) => {
    switch (status) {
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
          icon: FaCheck,
          label: "Aprobada",
          buttonText: "Ver Resultados",
          buttonIcon: FaPlay,
        };
      case "EXPIRED":
        return {
          icon: FiXCircle,
          label: "Vencida",
          buttonText: "Vencida",
          buttonIcon: FiX,
        };
      default:
        return {
          icon: FaClock,
          label: "Desconocido",
          buttonText: "Ver",
          buttonIcon: FaPlay,
        };
    }
  };

  // Colors
  const colors = [
    "var(--color-stat-1)",
    "var(--color-stat-2)",
    "var(--color-stat-3)",
    "var(--color-stat-4)",
    "var(--color-stat-5)",
  ];
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  // Paginacion
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
        paginationInfo,
      }}
    >
      {children}
    </ActivityStudentContextUI.Provider>
  );
};
