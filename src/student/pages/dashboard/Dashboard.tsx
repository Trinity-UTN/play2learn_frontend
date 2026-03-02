import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import NotificationBell from "../../../notifications/components/NotificationBell/NotificationBell";
import StudentSidebar from "../../components/sidebar/Sidebar";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import { useBenefitStudent } from "../../hooks/useBenefitStudent";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";
import styles from "./Dashboard.module.css";

const StudentDashboard: React.FC = () => {
  const { loading } = useCurrentStudent();
  const { getBenefitStudentStats } = useBenefitStudent();
  const { getActivityStudentStats } = useActivityStudent();
  const currentView = "overview";

  useEffect(() => {
    const loadDashboardStats = async () => {
      await getActivityStudentStats();
      await getBenefitStudentStats();
    };

    loadDashboardStats();
  }, [getBenefitStudentStats]);

  return (
    <div className={styles.dashboard}>
      <StudentSidebar currentView={currentView} isLoading={loading} />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.content}
      >
        <div
          className={styles.notifications}
        >
          <NotificationBell variant="student" />
        </div>
        <Outlet />
      </motion.main>
    </div>
  );
};

export default StudentDashboard;
