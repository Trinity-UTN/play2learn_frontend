import { FaPlay, FaCheck, FaClock } from "react-icons/fa";
import { FiX, FiXCircle } from "react-icons/fi";
import type { IconType } from "react-icons";
import {
  ACTIVITY_RANDOM_ICONS,
  ACTIVITY_COLORS,
} from "../constants/activities.constants";

/**
 * Obtiene un icono aleatorio del pool de iconos de actividades
 */
export const getRandomActivityIcon = (): IconType => {
  return ACTIVITY_RANDOM_ICONS[
    Math.floor(Math.random() * ACTIVITY_RANDOM_ICONS.length)
  ];
};

/**
 * Obtiene un color aleatorio del pool de colores
 */
export const getRandomActivityColor = (): string => {
  return ACTIVITY_COLORS[Math.floor(Math.random() * ACTIVITY_COLORS.length)];
};

/**
 * Calcula los días restantes hasta una fecha límite
 */
export const getDaysUntilDue = (endDate: string): string => {
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

/**
 * Obtiene la configuración de un estado de actividad
 */
export const getActivityStatusConfig = (status: string) => {
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
        icon: FaClock,
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

/**
 * Extrae las materias únicas de las actividades
 */
export const extractUniqueSubjects = (
  notApprovedActivities: any[],
  approvedActivities: any[]
) => {
  const allActivities = [...notApprovedActivities, ...approvedActivities];

  const subjectsMap = new Map(
    allActivities.map((a) => [
      a.subjectId.toString(),
      { id: a.subjectId.toString(), name: a.subjectName },
    ])
  );

  return [
    { id: "ALL", name: "Todas las materias" },
    ...Array.from(subjectsMap.values()),
  ];
};
