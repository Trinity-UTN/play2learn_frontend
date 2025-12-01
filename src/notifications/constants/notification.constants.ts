import type {
  NotificationType,
  NotificationConfig,
} from "../types/notification.types";
import {
  FaBook,
  FaClock,
  FaCheckCircle,
  FaGift,
  FaTshirt,
  FaTrophy,
  FaCrown,
  FaUserCheck,
  FaUsers,
  FaBullhorn,
  FaHourglassEnd,
  FaExclamationCircle,
  FaShoppingCart,
  FaHandPaper,
} from "react-icons/fa";

export const NOTIFICATION_CONFIG: Record<NotificationType, NotificationConfig> =
  {
    // Notificaciones de Estudiante
    NEW_ACTIVITY_PUBLISHED: {
      icon: FaBook,
      color: "#4CAF50",
      actionLabel: "Ver actividad",
      actionPath: "/dashboard/student/actividades/list",
    },
    ACTIVITY_ABOUT_TO_EXPIRE: {
      icon: FaClock,
      color: "#FF9800",
      actionLabel: "Ver actividad",
      actionPath: "/dashboard/student/actividades/list",
    },
    CORRECTED_ACTIVITY: {
      icon: FaCheckCircle,
      color: "#2196F3",
      actionLabel: "Ver corrección",
      actionPath: "/dashboard/student/actividades/list",
    },
    NEW_BENEFIT: {
      icon: FaGift,
      color: "#E91E63",
      actionLabel: "Ver beneficios",
      actionPath: "/dashboard/student/beneficios/list",
    },
    NEW_SKINS: {
      icon: FaTshirt,
      color: "#9C27B0",
      actionLabel: "Ir a tienda",
      actionPath: "/dashboard/student/store",
    },
    NEW_ACHIEVEMENT: {
      icon: FaTrophy,
      color: "#FFC107",
      actionLabel: "Ver logros",
      actionPath: "/dashboard/student/profile",
    },
    RANKING_TOP_1: {
      icon: FaCrown,
      color: "#FFD700",
      actionLabel: "Ver ranking",
      actionPath: "/dashboard/student/ranking/list",
    },

    // Notificaciones de Docente
    STUDENT_COMPLETED_ACTIVITY: {
      icon: FaUserCheck,
      color: "#4CAF50",
      actionLabel: "Ver actividades",
      actionPath: "/dashboard/teacher/actividades/created/list",
    },
    ALL_STUDENTS_COMPLETED_ACTIVITY: {
      icon: FaUsers,
      color: "#4CAF50",
      actionLabel: "Ver actividades",
      actionPath: "/dashboard/teacher/actividades/created/list",
    },
    ACTIVITY_PUBLISHED: {
      icon: FaBullhorn,
      color: "#2196F3",
      actionLabel: "Ver actividades",
      actionPath: "/dashboard/teacher/actividades/created/list",
    },
    ACTIVITY_EXPIRED: {
      icon: FaHourglassEnd,
      color: "#FF5722",
      actionLabel: "Ver actividades",
      actionPath: "/dashboard/teacher/actividades/created/list",
    },
    ACTIVITY_PENDING_CORRECTION: {
      icon: FaExclamationCircle,
      color: "#FF9800",
      actionLabel: "Corregir actividad",
      actionPath: "/dashboard/teacher/actividades/created/list",
    },
    BENEFIT_PURCHASED: {
      icon: FaShoppingCart,
      color: "#9C27B0",
      actionLabel: "Ver beneficios",
      actionPath: "/dashboard/teacher/beneficio/list",
    },
    BENEFIT_REQUEST: {
      icon: FaHandPaper,
      color: "#FF9800",
      actionLabel: "Ver solicitudes",
      actionPath: "/dashboard/teacher/beneficio/list",
    },
  } as const;

export const NOTIFICATION_EXPIRATION_DAYS = 30;
