import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "../shared/utils/ProtectedRoute";

// PROVIDERS
import {
  CourseProvider,
  StudentProvider,
  SubjectProvider,
  TeacherProvider,
  YearProvider,
  StatisticsProvider,
} from "@/admin";

// PAGES
import AdminDashboard from "../admin/pages/Dashboard/AdminDashboardPage";

// VIEWS
import {
  OverviewView,
  ListCourseView,
  ListStudentView,
  ListSubjectView,
  ListTeacherView,
  ListYearView,
  CreateCourseView,
  CreateStudentView,
  CreateSubjectView,
  CreateTeacherView,
  CreateYearView,
} from "@/admin";

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
                <SubjectProvider>
                  <TeacherProvider>
                    <YearProvider>
                      <CourseProvider>
                        <StatisticsProvider>
                          <motion.div
                            key="dashboard"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <AdminDashboard />
                          </motion.div>
                        </StatisticsProvider>
                      </CourseProvider>
                    </YearProvider>
                  </TeacherProvider>
                </SubjectProvider>
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

          {/* Estudiantes */}
          <Route path="students/create" element={<CreateStudentView />} />
          <Route path="students/edit/:id" element={<CreateStudentView />} />
          <Route path="students/list" element={<ListStudentView />} />

          {/* Materias */}
          <Route path="subjects/create" element={<CreateSubjectView />} />
          <Route path="subjects/edit/:id" element={<CreateSubjectView />} />
          <Route path="subjects/list" element={<ListSubjectView />} />

          {/* Docentes */}
          <Route path="teachers/create" element={<CreateTeacherView />} />
          <Route path="teachers/edit/:id" element={<CreateTeacherView />} />
          <Route path="teachers/list" element={<ListTeacherView />} />

          {/* Años */}
          <Route path="years/create" element={<CreateYearView />} />
          <Route path="years/edit/:id" element={<CreateYearView />} />
          <Route path="years/list" element={<ListYearView />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AdminApp;
