import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "../shared/utils/ProtectedRoute";
// PROVIDERS

import { YearProvider } from "../admin/contexts/yearContext/YearProvider";
import { TeacherProvider } from "../admin/contexts/teacherContext/TeacherProvider";
import { CourseProvider } from "../admin/contexts/courseContext/CourseProvider";
import { StudentProvider } from "../admin/contexts/studentContext/StudentProvider";
// PAGES
import AdminDashboard from "../admin/pages/Dashboard/AdminDashboardPage";

// VIEWS
import OverviewView from "../admin/views/Overview/OverviewView";
import ListCourseView from "../admin/views/Course/ListCourseView";
import CreateCourseView from "../admin/views/Course/CreateCourseView";
import ListYearView from "../admin/views/Year/ListYearView";
import CreateYearView from "../admin/views/Year/CreateYearView";
import ListStudentView from "../admin/views/Student/ListStudentView";
import CreateStudentView from "../admin/views/Student/CreateStudentView";
import ListTeacherView from "../admin/views/Teacher/ListTeacherView";
import CreateTeacherView from "../admin/views/Teacher/CreateTeacherView";

const AdminApp = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* ADMIN */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
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
            </ProtectedRoute>
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
      </Routes>
    </AnimatePresence>
  );
};

export default AdminApp;
