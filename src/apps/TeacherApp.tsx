"use client";

import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "../shared/utils/ProtectedRoute";
//PAGES
import TeacherDashboardPage from "../teacher/pages/Dashboard/DashboardTeacher";
//PROVIDERS
import { SubjectProvider } from "../admin/contexts/subjectContext/SubjectProvider";
import { ActivityStudentProvider } from "../student/context/activityStudentContext/activityStudentContextAPI/ActivityStudentProviderAPI";
import { CurrentStudentProvider } from "../student/context/currentStudent/CurrentStudentProvider";
import { ConfigurationActivityProvider } from "../activity/contexts/configurationActivityContext/ConfigurationActivityProvider";
import { ActivityTeacherProvider } from "../teacher/contexts/activityTeacherContext/ActivityTeacherProvider";
import { AhorcadoProvider } from "../activity/contexts/ahorcadoContext/AhorcadoProvider";
import { AhorcadoGameProvider } from "../shared/contexts/gamesContext/ahorcadoGameContext/AhorcadoGameProvider";
import { OrdenarSecuenciaProvider } from "../activity/contexts/ordenarSecuenciaContext/OrdenarSecuenciaProvider";
import { CompletarOracionProvider } from "../activity/contexts/completarOracionContext/CompletarOracionProvider";
import { CompletarOracionGameProvider } from "../shared/contexts/gamesContext/completarOracionGameContext/CompletarOracionGameProvider";
import { DesafioClasificacionProvider } from "../activity/contexts/desafioClasificacionContext/DesafioClasificacionProvider";
import { DesafioClasificacionGameProvider } from "../shared/contexts/gamesContext/desafioClasificacionGameContext/DesafioClasificacionGameProvider";
import { PreguntadosProvider } from "../activity/contexts/preguntadosContext/PreguntadosProvider";
import { PreguntadosGameProvider } from "../shared/contexts/gamesContext/preguntadosGameContext/PreguntadosGameProvider";
import { MemoramaProvider } from "../activity/contexts/memoramaContext/MemoramaProvider";
import { NoLudicaProvider } from "../activity/contexts/noLudicaContext/NoLudicaProvider";
import { BenefitAPIProvider } from "../teacher/contexts/benefitsAPIContext/BenefitAPIProvider";
import { ArbolDecisionProvider } from "../activity/contexts/arbolDecisionContext/ArbolDecisionProvider";
import { StatisticsProvider } from "../teacher/contexts/statisticsContext/StatisticsProvider";
import { NoLudicaGameProvider } from "../shared/contexts/gamesContext/noLudicaGameContext/NoLudicaGameProvider";
import { NotificationProvider } from "../notifications/contexts/NotificationsProvider";
//VIEWS
import ActivitiesCreatedView from "../teacher/views/ActivitiesCreatedView/ActivitiesCreatedView";
import ActivitiesView from "../teacher/views/ActivitiesView/ActivitiesView";
import BenefitsListView from "../teacher/views/benefitsView/benefitsViewList/BenefitsListView";
import BenefitCreateView from "../teacher/views/benefitsView/benefitCreateView/BenefitsCreateView";
import BenefitPurchasesView from "../teacher/views/benefitsView/benefitPurchaseView/BenefitPurchasesView";
import OverviewView from "../teacher/views/overviewView/Overview";
import ConfigureActivityView from "../activity/views/configurationView/ConfigureActivityView";
import ActivityView from "../activity/views/activityView/ActivityView";
import ActivityDetailsView from "../teacher/views/ActivityDetailsView/ActivityDetailsView";
import { ChangePasswordPage } from "../user";
import styles from "../App.module.css";

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
                <NotificationProvider>
                  <SubjectProvider>
                    <CurrentStudentProvider>
                      <ActivityStudentProvider>
                        <ConfigurationActivityProvider>
                          <ActivityTeacherProvider>
                            <AhorcadoProvider>
                              <AhorcadoGameProvider>
                                <CompletarOracionProvider>
                                  <CompletarOracionGameProvider>
                                    <PreguntadosProvider>
                                      <PreguntadosGameProvider>
                                        <OrdenarSecuenciaProvider>
                                          <DesafioClasificacionProvider>
                                            <DesafioClasificacionGameProvider>
                                              <MemoramaProvider>
                                                <NoLudicaProvider>
                                                  <NoLudicaGameProvider mode="preview">
                                                    <ArbolDecisionProvider>
                                                      <BenefitAPIProvider>
                                                        <StatisticsProvider>
                                                          <motion.div
                                                            key="dashboardTeacher"
                                                            initial={{
                                                              opacity: 0,
                                                            }}
                                                            animate={{
                                                              opacity: 1,
                                                            }}
                                                            exit={{
                                                              opacity: 0,
                                                            }}
                                                            transition={{
                                                              duration: 0.3,
                                                            }}
                                                          >
                                                            <TeacherDashboardPage />
                                                          </motion.div>
                                                        </StatisticsProvider>
                                                      </BenefitAPIProvider>
                                                    </ArbolDecisionProvider>
                                                  </NoLudicaGameProvider>
                                                </NoLudicaProvider>
                                              </MemoramaProvider>
                                            </DesafioClasificacionGameProvider>
                                          </DesafioClasificacionProvider>
                                        </OrdenarSecuenciaProvider>
                                      </PreguntadosGameProvider>
                                    </PreguntadosProvider>
                                  </CompletarOracionGameProvider>
                                </CompletarOracionProvider>
                              </AhorcadoGameProvider>
                            </AhorcadoProvider>
                          </ActivityTeacherProvider>
                        </ConfigurationActivityProvider>
                      </ActivityStudentProvider>
                    </CurrentStudentProvider>
                  </SubjectProvider>
                </NotificationProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewView />} />

            {/* ACTIVIDADES */}
            <Route path="actividades/list" element={<ActivitiesView />} />
            <Route
              path="actividades/created/list"
              element={<ActivitiesCreatedView />}
            />
            <Route
              path="actividades/created/details/:activityId/*"
              element={<ActivityDetailsView />}
            />

            {/* VIEW GENERAL CONFIGURATION */}
            <Route
              path="actividades/configuration/:code_game/*"
              element={<ConfigureActivityView />}
            />

            {/* VIEW SPECIFIC ACTIVITY */}
            <Route
              path="actividad/configuration/:code_game/*"
              element={<ActivityView />}
            />

            {/* BENEFICIOS */}
            <Route path="beneficio/list" element={<BenefitsListView />} />
            <Route path="beneficio/create" element={<BenefitCreateView />} />
            <Route
              path="beneficio/list/:id/*"
              element={<BenefitPurchasesView />}
            />
            {/* Cambio de contraseña */}
            <Route path="change-password" element={<ChangePasswordPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

export default TeacherApp;
