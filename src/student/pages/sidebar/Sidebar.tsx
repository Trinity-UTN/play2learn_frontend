"use client";

import type React from "react";
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
  FaStar,
} from "react-icons/fa";
import { useStudentAuth } from "../../context/contextProvisorio";
import type { StudentDashboardView } from "../../types/walletType";
import Button from "../../../shared/components/Button/ButtonComponent";
import styles from "./Sidebar.module.css";

interface StudentSidebarProps {
  currentView: StudentDashboardView;
  onViewChange: (view: StudentDashboardView) => void;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType;
  view: StudentDashboardView;
  color: string;
  badge?: string | number;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({
  currentView,
  onViewChange,
}) => {
  const { logout, student } = useStudentAuth();

  const menuItems: MenuItem[] = [
    {
      title: "Panel Principal",
      icon: FaHome,
      view: "overview",
      color: "#3B82F6",
    },
    {
      title: "Mi Billetera",
      icon: FaWallet,
      view: "wallet",
      color: "#10B981",
      badge: "2,450",
    },
    {
      title: "Mis Actividades",
      icon: FaGamepad,
      view: "activities",
      color: "#8B5CF6",
      badge: 3,
    },
    {
      title: "Mis Beneficios",
      icon: FaGift,
      view: "benefits",
      color: "#F59E0B",
      badge: 5,
    },
    {
      title: "Tienda",
      icon: FaStore,
      view: "store",
      color: "#EF4444",
      badge: "¡Nuevo!",
    },
    { title: "Ranking", icon: FaTrophy, view: "ranking", color: "#F97316" },
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

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.sidebar}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.avatarContainer}>
            <img
              src={student?.avatar || "/placeholder.svg"}
              alt="Avatar"
              className={styles.avatar}
            />
            <div className={styles.levelBadge}>
              <FaStar className={styles.levelIcon} />
              <span>{student?.level}</span>
            </div>
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.studentName}>{student?.name}</h2>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <FaFire className={styles.statIcon} />
                <span>{student?.streak} días</span>
              </div>
              <div className={styles.stat}>
                <FaTrophy className={styles.statIcon} />
                <span>#{student?.rank}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className={styles.content}>
        <motion.div variants={itemVariants} className={styles.section}>
          <ul className={styles.menu}>
            {menuItems.map((item) => (
              <motion.li
                key={item.view}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={`${styles.menuItem} ${
                    currentView === item.view ? styles.active : ""
                  }`}
                  onClick={() => onViewChange(item.view)}
                  style={{ "--item-color": item.color } as React.CSSProperties}
                >
                  <div className={styles.menuItemContent}>
                    <div className={styles.menuItemLeft}>
                      {/* <item.icon className={styles.menuIcon} /> */}
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
