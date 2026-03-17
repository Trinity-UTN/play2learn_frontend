import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import NotificationBell from "../../../notifications/components/NotificationBell/NotificationBell";
import { TeacherSidebar } from "../../components/sidebar/Sidebar";
import { ErrorBoundary, useScrollToTopRef } from "@/shared";
import styles from "./DashboardTeacher.module.css";

const TeacherDashboardPage: React.FC = () => {
  const contentRef = useScrollToTopRef<HTMLElement>();

  return (
    <div className={styles.dashboard}>
      <TeacherSidebar />
      <motion.main
        ref={contentRef}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.content}
      >
        <div className={styles.notifications}>
          <NotificationBell variant="teacher" />
        </div>
        <ErrorBoundary variant="teacher">
          <Outlet />
        </ErrorBoundary>
      </motion.main>
    </div>
  );
};

export default TeacherDashboardPage;
