import { motion } from "framer-motion";
import StudentSidebar from "../../components/sidebar/Sidebar";
import styles from "./Dashboard.module.css";
import { Outlet } from "react-router-dom";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";

const StudentDashboard: React.FC = () => {
  const { loading } = useCurrentStudent();
  const currentView = "overview";

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
