import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaPlus,
  FaGraduationCap,
  FaUserTie,
  FaGamepad,
} from "react-icons/fa";
import { Button, Sidebar } from "@/shared";
import styles from "./Sidebar.module.css";
import TeacherRoutes from "../../routes/routes";

export const TeacherSidebar: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === `/dashboard/teacher/${path}`;
  };

  const menuItems = [
    {
      title: "Panel Principal",
      items: [{ title: "Resumen", icon: FaHome, path: TeacherRoutes.Overview }],
    },
    {
      title: "Gestion de Actividades",
      items: [
        {
          title: "Crear Actividades",
          icon: FaGamepad,
          path: TeacherRoutes.Actividades.List,
        },
        {
          title: "Ver Actividades",
          icon: FaGamepad,
          path: TeacherRoutes.Actividades.CreatedList,
        },
      ],
    },
    {
      title: "Gestion de Beneficios",
      items: [
        {
          title: "Crear Beneficio",
          icon: FaPlus,
          path: TeacherRoutes.Beneficios.Create,
        },
        {
          title: "Ver Beneficios",
          icon: FaUserTie,
          path: TeacherRoutes.Beneficios.List,
        },
      ],
    },
    {
      title: "Gestion de Contraseña",
      items: [
        {
          title: "Cambiar Contraseña",
          icon: FaPlus,
          path: TeacherRoutes.Contraseña.Change,
        },
      ],
    },
  ];


  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <Sidebar
      isLoading={false}
      handleNavegacion={() => isActive}
      colorBtnMenu="#333333"
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.logo}>
          <FaGraduationCap className={styles.logoIcon} />
          <div>
            <h2 className={styles.logoTitle}>Sistema Escolar</h2>
            <p className={styles.logoSubtitle}>Panel Docente</p>
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
                    onClick={() => navigate(`/dashboard/teacher/${item.path}`)}
                    className={`${styles.menuItem} ${isActive(item.path) ? styles.active : ""
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

    </Sidebar>
  );
};


