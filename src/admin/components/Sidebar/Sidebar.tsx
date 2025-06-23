import type React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  FaHome,
  FaBook,
  FaPlus,
  FaCalendarAlt,
  FaGraduationCap,
  FaUserTie,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../../user/hooks/useAuth";
import Button from "../../../shared/components/Button/ButtonComponent";
import styles from "./Sidebar.module.css";
import { AdminRoutes } from "../../routes";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === `/dashboard/${path}`;
  };

  const menuItems = [
    {
      title: "Panel Principal",
      items: [{ title: "Resumen", icon: FaHome, path: "overview" }],
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
  ];

  const containerVariants: Variants = {
    hidden: { x: -250 },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.sidebar}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.logo}>
          <FaGraduationCap className={styles.logoIcon} />
          <div>
            <h2 className={styles.logoTitle}>Sistema Escolar</h2>
            <p className={styles.logoSubtitle}>Panel de Admin</p>
          </div>
        </div>
      </motion.div>

      <div className={styles.content}>
        {menuItems.map((section) => (
          <motion.div
            key={section.title}
            variants={itemVariants}
            className={styles.section}
          >
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <ul className={styles.menu}>
              {section.items.map((item) => (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => navigate(`/dashboard/${item.path}`)}
                    className={`${styles.menuItem} ${
                      isActive(item.path) ? styles.active : ""
                    }`}
                  >
                    <item.icon className={styles.menuIcon} />
                    <span>{item.title}</span>
                  </Button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className={styles.footer}>
        <Button
          variant="ghost"
          fullWidth
          onClick={logout}
          className={styles.logoutButton}
        >
          <FaSignOutAlt className={styles.logoutIcon} />
          Cerrar Sesión
        </Button>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
