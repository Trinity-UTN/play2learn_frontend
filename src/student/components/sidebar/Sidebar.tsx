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
  FaStar,
} from "react-icons/fa";
import type { StudentDashboardView } from "../../types/generalType";
import { Button, formatPrice } from "@/shared";
import Avatar from "../common/Avatar/AvatarComponent";
import { StudentRoutes } from "../../routes/routes";
import { useAuth } from "../../../user/hooks/useAuth";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import { useBenefitStudent } from "../../hooks/useBenefitStudent";
import styles from "./Sidebar.module.css";

interface StudentSidebarProps {
  currentView: StudentDashboardView;
  isLoading?: boolean;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType;
  path: string;
  color: string;
  badge: string | number;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({
  currentView,
  isLoading = false,
}) => {
  const { logout } = useAuth();
  const { wallet, currentStudent } = useCurrentStudent();
  const { activityStudentStats } = useActivityStudent();
  const { benefitStats } = useBenefitStudent();
  const navigate = useNavigate();

  const availableActivityCount = activityStudentStats?.available ?? 0;
  const availableBenefitCount = benefitStats?.available ?? 0;

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
      badge: isLoading ? "..." : (formatPrice(wallet?.totalBalance) ?? "0"),
    },
    {
      title: "Mis Actividades",
      icon: FaGamepad,
      path: StudentRoutes.Activities.list,
      color: "#8B5CF6",
      badge: isLoading ? "..." : availableActivityCount,
    },
    {
      title: "Mis Beneficios",
      icon: FaGift,
      path: StudentRoutes.Benefit.list,
      color: "#F59E0B",
      badge: isLoading ? "..." : availableBenefitCount,
    },
    {
      title: "Inversiones",
      icon: FaGift,
      path: StudentRoutes.Investments,
      color: "#4df50b9c",
      badge: "¡Nuevo!",
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

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${styles.sidebar} ${isLoading ? styles.loading : ""}`}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.profile}>
          {isLoading ? (
            <div className={styles.avatarSkeleton}></div>
          ) : (
            <Avatar
              size="medium"
              showLevel={true}
              studentLevel={currentStudent?.profile.level}
              onClick={handleProfileClick}
              className={styles.sidebarAvatar}
            />
          )}
          <div className={styles.profileInfo}>
            {isLoading ? (
              <>
                <div className={styles.nameSkeleton}></div>
                <div className={styles.statsSkeleton}>
                  <div className={styles.statSkeleton}></div>
                  <div className={styles.statSkeleton}></div>
                </div>
              </>
            ) : (
              <>
                <h2 className={styles.studentName}>
                  {currentStudent?.name || "Estudiante"}{" "}
                  {currentStudent?.lastname || ""}
                </h2>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <FaStar className={styles.statIcon} />
                    Nivel
                    <span>{currentStudent?.profile.level}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className={styles.buttonSkeleton}></div>
        ) : (
          <button className={styles.buttonPerfil} onClick={handleProfileClick}>
            Ver Perfil
          </button>
        )}
      </motion.div>

      <div className={styles.content}>
        <motion.div variants={itemVariants} className={styles.section}>
          <ul className={styles.menu}>
            {menuItems.map((item) => (
              <motion.li
                key={item.path}
                variants={itemVariants}
                whileHover={{ x: isLoading ? 0 : 5 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
              >
                {isLoading ? (
                  <div className={styles.menuItemSkeleton}>
                    <div className={styles.menuItemSkeletonContent}>
                      <div className={styles.menuItemSkeletonLeft}>
                        <div className={styles.iconSkeleton}></div>
                        <div className={styles.textSkeleton}></div>
                      </div>
                      <div className={styles.badgeSkeleton}></div>
                    </div>
                  </div>
                ) : (
                  <button
                    className={`${styles.menuItem} ${
                      currentView === item.path ? styles.active : ""
                    }`}
                    onClick={() => onViewChange(item.path)}
                    style={
                      { "--item-color": item.color } as React.CSSProperties
                    }
                  >
                    <div className={styles.menuItemContent}>
                      <div className={styles.menuItemLeft}>
                        <span>{item.title}</span>
                      </div>
                      {item.badge != null && item.badge !== "" && (
                        <div className={styles.badge}>{item.badge}</div>
                      )}
                    </div>
                  </button>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className={styles.footer}>
        {isLoading ? (
          <div className={styles.logoutSkeleton}></div>
        ) : (
          <Button
            variant="ghost"
            fullWidth
            onClick={logout}
            className={styles.logoutButton}
          >
            <FaSignOutAlt className={styles.logoutIcon} />
            Cerrar Sesión
          </Button>
        )}
      </motion.div>
    </motion.aside>
  );
};

export default StudentSidebar;
