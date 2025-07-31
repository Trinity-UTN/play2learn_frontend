import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../App.module.css";

import ProtectedRoute from "../shared/utils/ProtectedRoute";
//PAGES
import TeacherDashboardPage from "../teacher/pages/Dashboard/DashboardTeacher";
//PROVIDERS
import { SubjectProvider } from "../admin/contexts/subjectContext/SubjectProvider";
import { ConfigurationActivityProvider } from "../activity/contexts/configurationActivityContext/ConfigurationActivityProvider";
import { AhorcadoProvider } from "../activity/contexts/ahorcadoContext/AhorcadoProvider";
import { CreateAhorcadoProvider } from "../activity/components/createAhorcado/CreateAhorcadoContext";
import { CompletarOracionProvider } from "../activity/contexts/completarOracionContext/CompletarOracionProvider";
import { PreguntadosProvider } from "../activity/contexts/preguntadosContext/PreguntadosProvider";
//VIEWS
import ActivitiesView from "../teacher/views/ActivitiesView/ActivitiesView";
import BenefitsView from "../teacher/views/benefitsView/BenefitsView";
import BenefitCreateView from "../teacher/views/benefitsView/BenefitsCreateView";
import OverviewView from "../teacher/views/overviewView/Overview";
import ConfigureActivityView from "../activity/views/configurationView/ConfigureActivityView";
import ActivityView from "../activity/views/activityView/ActivityView";

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
                <SubjectProvider>
                  <ConfigurationActivityProvider>
                    <AhorcadoProvider>
                      <CompletarOracionProvider>
                        <PreguntadosProvider>
                          <motion.div
                            key="dashboardTeacher"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <TeacherDashboardPage />
                          </motion.div>
                        </PreguntadosProvider>
                      </CompletarOracionProvider>
                    </AhorcadoProvider>
                  </ConfigurationActivityProvider>
                </SubjectProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewView />} />

            {/* ACTIVIDADES */}
            <Route path="actividades/list" element={<ActivitiesView />} />
            {/* VIEW GENERAL CONFIGURATION */}
            <Route
              path="actividades/configuration/:code_game"
              element={<ConfigureActivityView />}
            />

            {/* VIEW SPECIFIC ACTIVITY */}
            <Route
              path="actividad/configuration/:code_game"
              element={
                <CreateAhorcadoProvider>
                  <ActivityView />
                </CreateAhorcadoProvider>
              }
            />

            {/* BENEFICIOS */}
            <Route path="beneficio/list" element={<BenefitsView />} />
            <Route path="beneficio/create" element={<BenefitCreateView />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

export default TeacherApp;
