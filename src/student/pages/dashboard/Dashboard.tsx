import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import NotificationBell from "../../../notifications/components/NotificationBell/NotificationBell";
import StudentSidebar from "../../components/sidebar/Sidebar";
import { shouldShowNotifications } from "@/notifications/utils/notification.utils";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import { useBenefitStudent } from "../../hooks/useBenefitStudent";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import { ErrorBoundary, useScrollToTopRef } from "@/shared";
import styles from "./Dashboard.module.css";

const StudentDashboard: React.FC = () => {
  const contentRef = useScrollToTopRef<HTMLElement>();
  const { loading } = useCurrentStudent();
  const { getBenefitStudentStats, benefitStats } = useBenefitStudent();
  const { getActivityStudentStats } = useActivityStudent();
  const location = useLocation();
  const showNotifications = shouldShowNotifications(location.pathname);
  const currentView = "overview";

  useEffect(() => {
    const loadDashboardStats = async () => {
      if (!benefitStats) await getActivityStudentStats();
    };

    loadDashboardStats();
  }, [getBenefitStudentStats]);

  return (
    <div className={styles.dashboard}>
      <StudentSidebar currentView={currentView} isLoading={loading} />
      <motion.main
        ref={contentRef}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.content}
      >
        {showNotifications && (
          <div className={styles.notifications}>
            <NotificationBell variant="student" />
          </div>
        )}
        <ErrorBoundary variant="student">
          <Outlet />
        </ErrorBoundary>
      </motion.main>
    </div>
  );
};

export default StudentDashboard;
