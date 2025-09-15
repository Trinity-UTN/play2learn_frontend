import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../App.module.css";
import ProtectedRoute from "../shared/utils/ProtectedRoute";
//PAGES
import TeacherDashboardPage from "../teacher/pages/Dashboard/DashboardTeacher";
//PROVIDERS
import { SubjectProvider } from "../admin/contexts/subjectContext/SubjectProvider";
import { ActivityStudentProvider } from "../student/context/activityStudentContext/activityStudentContextAPI/ActivityStudentProviderAPI";
import { ConfigurationActivityProvider } from "../activity/contexts/configurationActivityContext/ConfigurationActivityProvider";
import { AhorcadoProvider } from "../activity/contexts/ahorcadoContext/AhorcadoProvider";
import { AhorcadoGameProvider } from "../shared/contexts/gamesContext/ahorcadoGameContext/AhorcadoGameProvider";
import { OrdenarSecuenciaProvider } from "../activity/contexts/ordenarSecuenciaContext/OrdenarSecuenciaProvider";
import { CompletarOracionProvider } from "../activity/contexts/completarOracionContext/CompletarOracionProvider";
import { PreguntadosProvider } from "../activity/contexts/preguntadosContext/PreguntadosProvider";
import { PreguntadosGameProvider } from "../shared/contexts/gamesContext/preguntadosGameContext/PreguntadosGameProvider";
import { DesafioClasificacionProvider } from "../activity/contexts/desafioClasificacionContext/DesafioClasificacionProvider";
import { DesafioClasificacionGameProvider } from "../shared/contexts/gamesContext/desafioClasificacionGameContext/DesafioClasificacionGameProvider";
import { MemoramaProvider } from "../activity/contexts/memoramaContext/MemoramaProvider";
import { NoLudicaProvider } from "../activity/contexts/noLudicaContext/NoLudicaProvider";
import { BenefitAPIProvider } from "../teacher/contexts/benefitsAPIContext/BenefitAPIProvider";
import { BenefitUIProvider } from "../teacher/contexts/benefitsUIContext/BenefitUIProvider";
import { ArbolDecisionProvider } from "../activity/contexts/arbolDecisionContext/ArbolDecisionProvider";
//VIEWS
import ActivitiesView from "../teacher/views/ActivitiesView/ActivitiesView";
import BenefitsListView from "../teacher/views/benefitsView/benefitsViewList/BenefitsListView";
import BenefitCreateView from "../teacher/views/benefitsView/benefitCreateView/BenefitsCreateView";
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
                  <ActivityStudentProvider>
                    <ConfigurationActivityProvider>
                      <AhorcadoProvider>
                        <AhorcadoGameProvider>
                          <CompletarOracionProvider>
                            <PreguntadosProvider>
                              <PreguntadosGameProvider>
                                <OrdenarSecuenciaProvider>
                                  <DesafioClasificacionProvider>
                                    <DesafioClasificacionGameProvider>
                                      <MemoramaProvider>
                                        <NoLudicaProvider>
                                          <ArbolDecisionProvider>
                                            <BenefitAPIProvider>
                                              <BenefitUIProvider>
                                                <motion.div
                                                  key="dashboardTeacher"
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  exit={{ opacity: 0 }}
                                                  transition={{ duration: 0.3 }}
                                                >
                                                  <TeacherDashboardPage />
                                                </motion.div>
                                              </BenefitUIProvider>
                                            </BenefitAPIProvider>
                                          </ArbolDecisionProvider>
                                        </NoLudicaProvider>
                                      </MemoramaProvider>
                                    </DesafioClasificacionGameProvider>
                                  </DesafioClasificacionProvider>
                                </OrdenarSecuenciaProvider>
                              </PreguntadosGameProvider>
                            </PreguntadosProvider>
                          </CompletarOracionProvider>
                        </AhorcadoGameProvider>
                      </AhorcadoProvider>
                    </ConfigurationActivityProvider>
                  </ActivityStudentProvider>
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
              element={<ActivityView />}
            />

            {/* BENEFICIOS */}
            <Route path="beneficio/list" element={<BenefitsListView />} />
            <Route path="beneficio/create" element={<BenefitCreateView />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

export default TeacherApp;
