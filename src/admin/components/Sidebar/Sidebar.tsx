import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap, } from "react-icons/fa";
import { Button, Sidebar, itemVariants } from "@/shared";
import { menuItems } from "@/admin/constants/sidebar.constants";
import styles from "./Sidebar.module.css";

export const AdminSidebar: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === `/dashboard/${path}`;
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
            <p className={styles.logoSubtitle}>Panel de Administrador</p>
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
                    variant="primary"
                    fullWidth
                    onClick={() => navigate(`/dashboard/${item.path}`)}
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

