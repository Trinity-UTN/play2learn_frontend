import type React from "react";
import { motion } from "framer-motion";
import StudentSidebar from "../../components/sidebar/Sidebar";
import styles from "./Dashboard.module.css";
import { Outlet } from "react-router-dom";

const StudentDashboard: React.FC = () => {
  const currentView = "overview";

  return (
    <div className={styles.dashboard}>
      <StudentSidebar currentView={currentView} />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.content}
      >
        {/* <StudentDashboardContent currentView={currentView} /> */}
        <Outlet />
      </motion.main>
    </div>
  );
};

export default StudentDashboard;
