import { useLocation, useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  FaWallet,
  FaGamepad,
  FaGift,
  FaStore,
  FaTrophy,
  FaStar,
} from "react-icons/fa";
import type { StudentDashboardView } from "../../types/generalType";
import { Sidebar } from "@/shared";
import Avatar from "../common/Avatar/AvatarComponent";
import { StudentRoutes } from "../../routes/routes";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import { useBenefitStudent } from "../../hooks/useBenefitStudent";
import styles from "./Sidebar.module.css";
import { formatPriceWithNoDecimals } from "@/shared/utils/formatPrice";

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
  isLoading = false,
}) => {
  const { wallet, currentStudent } = useCurrentStudent();
  const { activityStudentStats } = useActivityStudent();
  const { benefitStats } = useBenefitStudent();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === `/dashboard/${path}`;
  };
  const availableActivityCount = activityStudentStats?.available ?? 0;
  const availableBenefitCount = benefitStats?.available ?? 0;

  const menuItems: MenuItem[] = [
    {
      title: "Mi Billetera",
      icon: FaWallet,
      path: StudentRoutes.Wallet,
      color: "#10B981",
      badge: isLoading
        ? "..."
        : (formatPriceWithNoDecimals(wallet?.totalBalance) ?? "0"),
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
      title: "Rankings",
      icon: FaTrophy,
      path: StudentRoutes.Ranking,
      color: "#F97316",
      badge: "",
    },
  ];

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
    <Sidebar isLoading={isLoading} handleNavegacion={handleProfileClick}>
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
            Panel Principal
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
                      isActive(item.path) ? styles.active : ""
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
    </Sidebar>
  );
};

export default StudentSidebar;
