import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../App.module.css";

import ProtectedRoute from "../shared/utils/ProtectedRoute";
//PAGES
import StudentDashboard from "../student/pages/dashboard/Dashboard";
//PROVIDERS

//VIEWS
import StudentActivitiesView from "../student/views/studentActivitiesView/StudentActivitiesView";
import StudentBenefitsView from "../student/views/studentBenefitsView/StudentBenefitsView";
import StudentOverviewView from "../student/views/studentOverviewView/StudentOverviewView";
import StudentRankingView from "../student/views/studentRankingView/StudentRankingView";
import StudentStoreView from "../student/views/studentStoreView/StudentStoreView";
import StudentWalletView from "../student/views/studentWalletView/StudentWalletView";

const StudentApp = () => {
  return (
    <motion.div
      className={styles.app}
      key="dashboard-student"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/dashboard/student/*"
            element={
              <ProtectedRoute allowedRoles={["ROLE_STUDENT"]}>
                <motion.div
                  key="dashboardStudent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StudentDashboard />
                </motion.div>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<StudentOverviewView />} />
            {/*WALLET */}
            <Route path="wallet" element={<StudentWalletView />} />
            {/* ACTIVIDADES */}
            <Route
              path="actividades/list"
              element={<StudentActivitiesView />}
            />
            {/* BENEFICIOS */}
            <Route path="beneficios/list" element={<StudentBenefitsView />} />
            {/*STORE */}
            <Route path="store" element={<StudentStoreView />} />
            {/* RANKING */}
            <Route path="ranking/list" element={<StudentRankingView />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentApp;
