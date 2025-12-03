import type {
  NotificationType,
  NotificationConfig,
} from "../types/notification.types";
import {
  FaGamepad,
  FaClock,
  FaCheckCircle,
  FaGift,
  FaTshirt,
  FaTrophy,
  FaCrown,
  FaUserCheck,
  FaUsers,
  FaShoppingCart,
  FaHandPaper,
  FaChartLine,
} from "react-icons/fa";

export const NOTIFICATION_CONFIG: Record<NotificationType, NotificationConfig> =
  {
    // Notificaciones de Estudiante
    NEW_ACTIVITY_PUBLISHED: {
      icon: FaGamepad,
      color: "#8B5CF6",
      actionLabel: "Ver actividad",
      actionPath: "/dashboard/student/actividades/list",
    },
    ACTIVITY_ABOUT_TO_EXPIRE: {
      icon: FaClock,
      color: "#8B5CF6",
      actionLabel: "Ver actividad",
      actionPath: "/dashboard/student/actividades/list",
    },
    CORRECTED_ACTIVITY: {
      icon: FaCheckCircle,
      color: "#8B5CF6",
      actionLabel: "Ver corrección",
      actionPath: "/dashboard/student/actividades/list",
    },
    NEW_BENEFIT: {
      icon: FaGift,
      color: "#F59E0B",
      actionLabel: "Ver beneficios",
      actionPath: "/dashboard/student/beneficios/list",
    },
    NEW_SKINS: {
      icon: FaTshirt,
      color: "#EF4444",
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
      color: "#F97316",
      actionLabel: "Ver ranking",
      actionPath: "/dashboard/student/ranking/list",
    },
    BENEFIT_USE_ACCEPTED: {
      icon: FaGift,
      color: "#F59E0B",
      actionLabel: "Ver beneficios",
      actionPath: "/dashboard/student/beneficios/list",
    },
    STOCK_ORDER_EXECUTED: {
      icon: FaChartLine,
      color: "#4df50b9c",
      actionLabel: "Ver inversiones",
      actionPath: "/dashboard/student/actions/list",
    },
    FIXED_TERM_DEPOSIT_ENDED: {
      icon: FaClock,
      color: "#4df50b9c",
      actionLabel: "Ver plazo fijo",
      actionPath: "/dashboard/student/plazo-fijo/list",
    },

    // Notificaciones de Docente
    STUDENT_COMPLETE_ACTIVITY: {
      icon: FaUserCheck,
      color: "#4CAF50",
      actionLabel: "Ver actividades",
      actionPath: "/dashboard/teacher/actividades/created/list",
    },
    ALL_STUDENTS_APPROVE_ACTIVITY: {
      icon: FaUsers,
      color: "#4CAF50",
      actionLabel: "Ver actividades",
      actionPath: "/dashboard/teacher/actividades/created/list",
    },
    BENEFIT_PURCHASED: {
      icon: FaShoppingCart,
      color: "#9C27B0",
      actionLabel: "Ver beneficios",
      actionPath: "/dashboard/teacher/beneficio/list",
    },
    BENEFIT_USE_REQUESTED: {
      icon: FaHandPaper,
      color: "#FF9800",
      actionLabel: "Ver solicitudes",
      actionPath: "/dashboard/teacher/beneficio/list",
    },
  } as const;

export const NOTIFICATION_EXPIRATION_DAYS = 30;
