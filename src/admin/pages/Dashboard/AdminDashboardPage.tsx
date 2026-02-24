import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./AdminDashboard.module.css";
import { AdminSidebar } from "@/admin/components/Sidebar/Sidebar";

const AdminDashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <AdminSidebar />
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

export default AdminDashboardPage;
