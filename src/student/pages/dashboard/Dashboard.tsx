import { useEffect } from "react";
import { motion } from "framer-motion";
import StudentSidebar from "../../components/sidebar/Sidebar";
import styles from "./Dashboard.module.css";
import { Outlet } from "react-router-dom";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import { useBenefitStudent } from "../../hooks/useBenefitStudent";
import { useActivityStudent } from "../../hooks/useActivityStudentAPI";

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
      <div className={styles.contSidebar}>
        <StudentSidebar currentView={currentView} isLoading={loading} />
      </div>
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.content}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default StudentDashboard;
