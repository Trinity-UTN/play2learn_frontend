import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// PROVIDERS
import { UserProvider } from "./user/contexts/userContext/UserProvider";
import { YearProvider } from "./admin/contexts/yearContext/YearProvider";
import { TeacherProvider } from "./admin/contexts/teacherContext/TeacherProvider";
import { CourseProvider } from "./admin/contexts/courseContext/CourseProvider";
import { StudentProvider } from "./admin/contexts/studentContext/StudentProvider";
// PAGES
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboardPage";
import { useAuth } from "./user/hooks/useAuth";
import Login from "./user/pages/Login/LoginPage";
import styles from "./App.module.css";
// VIEWS
import OverviewView from "./admin/views/Overview/OverviewView";
import ListCourseView from "./admin/views/Course/ListCourseView";
import CreateCourseView from "./admin/views/Course/CreateCourseView";
import ListYearView from "./admin/views/Year/ListYearView";
import CreateYearView from "./admin/views/Year/CreateYearView";
import ListStudentView from "./admin/views/Student/ListStudentView";
import CreateStudentView from "./admin/views/Student/CreateStudentView";
import ListTeacherView from "./admin/views/Teacher/ListTeacherView";
import CreateTeacherView from "./admin/views/Teacher/CreateTeacherView";

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.app}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Login />
                </motion.div>
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? (
                <StudentProvider>
                  <TeacherProvider>
                    <YearProvider>
                      <CourseProvider>
                        <motion.div
                          key="dashboard"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <AdminDashboard />
                        </motion.div>
                      </CourseProvider>
                    </YearProvider>
                  </TeacherProvider>
                </StudentProvider>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewView />} />

            {/* Cursos */}
            <Route path="courses/create" element={<CreateCourseView />} />
            <Route path="courses/edit/:id" element={<CreateCourseView />} />
            <Route path="courses/list" element={<ListCourseView />} />

            {/* Años */}
            <Route path="years/create" element={<CreateYearView />} />
            <Route path="years/edit/:id" element={<CreateYearView />} />
            <Route path="years/list" element={<ListYearView />} />

            {/* Estudiantes */}
            <Route path="students/create" element={<CreateStudentView />} />
            <Route path="students/edit/:id" element={<CreateStudentView />} />
            <Route path="students/list" element={<ListStudentView />} />

            {/* Docentes */}
            <Route path="teachers/create" element={<CreateTeacherView />} />
            <Route path="teachers/edit/:id" element={<CreateTeacherView />} />
            <Route path="teachers/list" element={<ListTeacherView />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
};

export default App;
