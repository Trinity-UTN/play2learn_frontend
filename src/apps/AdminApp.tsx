import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "../shared/utils/ProtectedRoute";

// PROVIDERS
import { CourseProvider } from "../admin/contexts/courseContext/CourseProvider";
import { StudentProvider } from "../admin/contexts/studentContext/StudentProvider";
import { SubjectProvider } from "../admin/contexts/subjectContext/SubjectProvider";
import { TeacherProvider } from "../admin/contexts/teacherContext/TeacherProvider";
import { YearProvider } from "../admin/contexts/yearContext/YearProvider";

// PAGES
import AdminDashboard from "../admin/pages/Dashboard/AdminDashboardPage";

// VIEWS
import OverviewView from "../admin/views/Overview/OverviewView";
import ListCourseView from "../admin/views/Course/ListCourseView";
import CreateCourseView from "../admin/views/Course/CreateCourseView";
import ListStudentView from "../admin/views/Student/ListStudentView";
import CreateStudentView from "../admin/views/Student/CreateStudentView";
import ListSubjectView from "../admin/views/Subject/ListSubjectView";
import CreateSubjectView from "../admin/views/Subject/CreateSubjectView";
import ListTeacherView from "../admin/views/Teacher/ListTeacherView";
import CreateTeacherView from "../admin/views/Teacher/CreateTeacherView";
import ListYearView from "../admin/views/Year/ListYearView";
import CreateYearView from "../admin/views/Year/CreateYearView";

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
