"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import StudentSidebar from "../sidebar/Sidebar";
import StudentDashboardContent from "../../routes/Routes";
import type { StudentDashboardView } from "../../types/walletType";
import styles from "./StudentDashboard.module.css";

const StudentDashboard: React.FC = () => {
  const [currentView, setCurrentView] =
    useState<StudentDashboardView>("overview");

  return (
    <div className={styles.dashboard}>
      <StudentSidebar currentView={currentView} onViewChange={setCurrentView} />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.content}
      >
        <StudentDashboardContent currentView={currentView} />
      </motion.main>
    </div>
  );
};

export default StudentDashboard;
