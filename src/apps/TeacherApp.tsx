import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import ProtectedRoute from "../shared/utils/ProtectedRoute";
import styles from "../App.module.css";
import Prueba1 from "../teacher/pages/prueba1";
import ProtectedRoute from "../shared/utils/ProtectedRoute";
const TeacherApp = () => {
  return (
    <motion.div
      className={styles.app}
      key="dashboard-teacher"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/dashboard/teacher/*"
            element={
              <ProtectedRoute allowedRoles={["ROLE_TEACHER"]}>
                <Prueba1 />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

export default TeacherApp;
