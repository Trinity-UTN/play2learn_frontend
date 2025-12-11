import {
  FaHome,
  FaBook,
  FaPlus,
  FaCalendarAlt,
  FaGraduationCap,
  FaUserTie,
} from "react-icons/fa";
import { AdminRoutes } from "../routes/routes";

export const menuItems = [
  {
    title: "Panel Principal",
    items: [{ title: "Resumen", icon: FaHome, path: "overview" }],
  },
  {
    title: "Gestión de Estudiantes",
    items: [
      {
        title: "Crear Estudiante",
        icon: FaPlus,
        path: AdminRoutes.Students.Create,
      },
      {
        title: "Ver Estudiantes",
        icon: FaGraduationCap,
        path: AdminRoutes.Students.List,
      },
    ],
  },
  {
    title: "Gestión de Docentes",
    items: [
      {
        title: "Crear Docente",
        icon: FaPlus,
        path: AdminRoutes.Teachers.Create,
      },
      {
        title: "Ver Docentes",
        icon: FaUserTie,
        path: AdminRoutes.Teachers.List,
      },
    ],
  },
  {
    title: "Gestión de Materias",
    items: [
      {
        title: "Crear Materia",
        icon: FaPlus,
        path: AdminRoutes.Subjects.Create,
      },
      {
        title: "Ver Materias",
        icon: FaUserTie,
        path: AdminRoutes.Subjects.List,
      },
    ],
  },
  {
    title: "Gestión de Cursos",
    items: [
      {
        title: "Crear Curso",
        icon: FaPlus,
        path: AdminRoutes.Courses.Create,
      },
      { title: "Ver Cursos", icon: FaBook, path: AdminRoutes.Courses.List },
    ],
  },
  {
    title: "Gestión de Años",
    items: [
      { title: "Crear Año", icon: FaPlus, path: AdminRoutes.Years.Create },
      {
        title: "Ver Años",
        icon: FaCalendarAlt,
        path: AdminRoutes.Years.List,
      },
    ],
  },
];
