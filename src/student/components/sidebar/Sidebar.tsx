import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  FaHome,
  FaWallet,
  FaGamepad,
  FaGift,
  FaStore,
  FaTrophy,
  FaSignOutAlt,
  FaFire,
} from "react-icons/fa";
import type { StudentDashboardView } from "../../types/generalType";
import Button from "../../../shared/components/Button/ButtonComponent";
import Avatar from "../common/Avatar/AvatarComponent";
import { StudentRoutes } from "../../routes/routes";
import { useAuth } from "../../../user/hooks/useAuth";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import styles from "./Sidebar.module.css";
import { useActivityStudentUI } from "../../hooks/useActivityStudentUI";

interface StudentSidebarProps {
  currentView: StudentDashboardView;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType;
  path: string;
  color: string;
  badge: string | number;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ currentView }) => {
  const { logout } = useAuth();
  const { currentStudent } = useCurrentStudent();
  const { activityNotApproved } = useActivityStudentUI();
  const navigate = useNavigate();
  const menuItems: MenuItem[] = [
    {
      title: "Panel Principal",
      icon: FaHome,
      path: StudentRoutes.Overview,
      color: "#3B82F6",
      badge: "",
    },
    {
      title: "Mi Billetera",
      icon: FaWallet,
      path: StudentRoutes.Wallet,
      color: "#10B981",
      badge: String(currentStudent?.wallet.balance) ?? "0",
    },
    {
      title: "Mis Actividades",
      icon: FaGamepad,
      path: StudentRoutes.Activities.list,
      color: "#8B5CF6",
      badge: activityNotApproved.length,
    },
    {
      title: "Mis Beneficios",
      icon: FaGift,
      path: StudentRoutes.Benefit.list,
      color: "#F59E0B",
      badge: 5,
    },
    {
      title: "Tienda",
      icon: FaStore,
      path: StudentRoutes.Store,
      color: "#EF4444",
      badge: "¡Nuevo!",
    },
    {
      title: "Ranking",
      icon: FaTrophy,
      path: StudentRoutes.Ranking,
      color: "#F97316",
      badge: "",
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

  const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const onViewChange = (path: string) => {
    navigate(`/dashboard/${path}`);
  };

  const handleProfileClick = () => {
    navigate(`/dashboard/${StudentRoutes.Profile}`);
  };
  // console.log(currentStudent?.wallet.balance);
  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.sidebar}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.profile}>
          <Avatar
            size="medium"
            showLevel={true}
            onClick={handleProfileClick}
            className={styles.sidebarAvatar}
          />
          <div className={styles.profileInfo}>
            <h2 className={styles.studentName}>
              {currentStudent?.name || "Estudiante"}{" "}
              {currentStudent?.lastname || ""}
            </h2>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <FaFire className={styles.statIcon} />
                <span>10 días</span>
              </div>
              <div className={styles.stat}>
                <FaTrophy className={styles.statIcon} />
                <span>#8</span>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.buttonPerfil} onClick={handleProfileClick}>
          Ver Perfil
        </button>
      </motion.div>

      <div className={styles.content}>
        <motion.div variants={itemVariants} className={styles.section}>
          <ul className={styles.menu}>
            {menuItems.map((item) => (
              <motion.li
                key={item.path}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={`${styles.menuItem} ${
                    currentView === item.path ? styles.active : ""
                  }`}
                  onClick={() => onViewChange(item.path)}
                  style={{ "--item-color": item.color } as React.CSSProperties}
                >
                  <div className={styles.menuItemContent}>
                    <div className={styles.menuItemLeft}>
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <div className={styles.badge}>{item.badge}</div>
                    )}
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
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

export default StudentSidebar;
