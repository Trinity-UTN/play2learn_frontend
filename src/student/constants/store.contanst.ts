import type { Variants } from "framer-motion";
import { FaGlobe, FaUser, FaHatWizard } from "react-icons/fa";

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// CATEGIRY TABS
export const FILTER_TYPES = {
  TYPE: "type",
} as const;

export const FILTER_VALUES = {
  CUERPO: "Cuerpo",
  SOMBRERO: "Sombrero",
  REMERA: "Remera",
} as const;

export const categories = [
  {
    value: "all",
    label: "Todos",
    icon: FaGlobe,

    color: "#8b5cf6",
    filterValue: null, // No aplica filtro
  },
  {
    value: "cuerpo",
    label: "Cuerpo",
    icon: FaUser,

    color: "#3b82f6",
    filterValue: FILTER_VALUES.CUERPO,
  },
  {
    value: "sombrero",
    label: "Sombreros",
    icon: FaHatWizard,

    color: "#f59e0b",
    filterValue: FILTER_VALUES.SOMBRERO,
  },
  {
    value: "remera",
    label: "Remeras",
    icon: FaHatWizard,

    color: "#f59e0b",
    filterValue: FILTER_VALUES.REMERA,
  },
];

// PURCHASE MODAL
export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalVariants: Variants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
  },
};
