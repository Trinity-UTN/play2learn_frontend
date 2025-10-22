import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../App.module.css";

import ProtectedRoute from "../shared/utils/ProtectedRoute";
//PAGES
import StudentDashboard from "../student/pages/dashboard/Dashboard";
//PROVIDERS
import { SubjectProvider } from "../admin/contexts/subjectContext/SubjectProvider";
import { CurrentStudentProvider } from "../student/context/currentStudent/CurrentStudentProvider";
import { ProfileAvatarProvider } from "../student/context/profileAvatarContext/ProfileAvatarProvider";
import { ActivityStudentProvider } from "../student/context/activityStudentContext/activityStudentContextAPI/ActivityStudentProviderAPI";
import { ActivityStudentProviderUI } from "../student/context/activityStudentContext/activityStudentContextUI/ActivityStudentProviderUI";
import { AhorcadoProvider } from "../activity/contexts/ahorcadoContext/AhorcadoProvider";
import { AhorcadoGameProvider } from "../shared/contexts/gamesContext/ahorcadoGameContext/AhorcadoGameProvider";
import { ConfigurationActivityProvider } from "../activity/contexts/configurationActivityContext/ConfigurationActivityProvider";
import { CompletarOracionProvider } from "../activity/contexts/completarOracionContext/CompletarOracionProvider";
import { CompletarOracionGameProvider } from "../shared/contexts/gamesContext/completarOracionGameContext/CompletarOracionGameProvider";
import { DesafioClasificacionProvider } from "../activity/contexts/desafioClasificacionContext/DesafioClasificacionProvider";
import { DesafioClasificacionGameProvider } from "../shared/contexts/gamesContext/desafioClasificacionGameContext/DesafioClasificacionGameProvider";
import { NoLudicaGameProvider } from "../shared/contexts/gamesContext/noLudicaGameContext/NoLudicaGameProvider";
import { NoLudicaProvider } from "../activity/contexts/noLudicaContext/NoLudicaProvider";
import { PreguntadosProvider } from "../activity/contexts/preguntadosContext/PreguntadosProvider";
import { PreguntadosGameProvider } from "../shared/contexts/gamesContext/preguntadosGameContext/PreguntadosGameProvider";
import { WalletStudentProvider } from "../student/context/walletStudentContext/WalletStudentProvider";
import { StoreProvider } from "../student/context/storeStudentContext/StoreStudentProvider";
import { InvestmentsProvider } from "../investments/contexts/investmentContext/InvestmentStudentProvider";
//VIEWS
import StudentActivitiesView from "../student/views/studentActivitiesView/StudentActivitiesView";
import StudentActivityView from "../student/views/studentActivityView/StudentActivityView";
import StudentCompletedActivityView from "../student/views/studentCompletedActivityView/StudentCompletedActivityView";
import StudentPlayActivityView from "../student/views/studentPlayActivityView/StudentPlayActivityView";
import StudentBenefitsView from "../student/views/studentBenefitsView/StudentBenefitsView";
import StudentOverviewView from "../student/views/studentOverviewView/StudentOverviewView";
import StudentProfileAvatarView from "../student/views/studentProfileAvatarView/StudentProfileAvatarView";
import StudentProfileView from "../student/views/studentProfileView/StudentProfileView";
import StudentRankingView from "../student/views/studentRankingView/StudentRankingView";
import StudentStoreView from "../student/views/studentStoreView/StudentStoreView";
import StudentWalletView from "../student/views/studentWalletView/StudentWalletView";
import StudentFinancialEducationView from "../student/views/studentFinancialEducationView/StudentFinancialEducationView";
import InvestmentDetailView from "../investments/views/investmentsDetailView/InvestmentsDetailView";
import InvestmentsView from "../investments/views/investments/InvestmentsView";

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
                <SubjectProvider>
                  <CurrentStudentProvider>
                    <ProfileAvatarProvider>
                      <ActivityStudentProvider>
                        <ActivityStudentProviderUI>
                          <ConfigurationActivityProvider>
                            <NoLudicaProvider>
                              <NoLudicaGameProvider mode="student">
                                <AhorcadoProvider>
                                  <AhorcadoGameProvider mode="student">
                                    <CompletarOracionProvider>
                                      <CompletarOracionGameProvider mode="student">
                                        <DesafioClasificacionProvider>
                                          <DesafioClasificacionGameProvider mode="student">
                                            <PreguntadosProvider>
                                              <PreguntadosGameProvider mode="student">
                                                <WalletStudentProvider>
                                                  <StoreProvider>
                                                    <InvestmentsProvider>
                                                      <motion.div
                                                        key="dashboardStudent"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{
                                                          duration: 0.3,
                                                        }}
                                                      >
                                                        <StudentDashboard />
                                                      </motion.div>
                                                    </InvestmentsProvider>
                                                  </StoreProvider>
                                                </WalletStudentProvider>
                                              </PreguntadosGameProvider>
                                            </PreguntadosProvider>
                                          </DesafioClasificacionGameProvider>
                                        </DesafioClasificacionProvider>
                                      </CompletarOracionGameProvider>
                                    </CompletarOracionProvider>
                                  </AhorcadoGameProvider>
                                </AhorcadoProvider>
                              </NoLudicaGameProvider>
                            </NoLudicaProvider>
                          </ConfigurationActivityProvider>
                        </ActivityStudentProviderUI>
                      </ActivityStudentProvider>
                    </ProfileAvatarProvider>
                  </CurrentStudentProvider>
                </SubjectProvider>
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<StudentProfileView />} />
            <Route
              path="profile/avatar"
              element={<StudentProfileAvatarView />}
            />
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<StudentOverviewView />} />
            {/*WALLET */}
            <Route path="wallet" element={<StudentWalletView />} />
            {/* ACTIVIDADES */}
            <Route
              path="actividades/list"
              element={<StudentActivitiesView />}
            />
            <Route
              path="actividades/:id/view"
              element={<StudentActivityView />}
            />
            <Route
              path="actividades/:id/play"
              element={<StudentPlayActivityView />}
            />
            <Route
              path="actividades/:id/review"
              element={<StudentCompletedActivityView />}
            />
            {/* BENEFICIOS */}
            <Route path="beneficios/list" element={<StudentBenefitsView />} />
            {/*STORE */}
            <Route path="store" element={<StudentStoreView />} />
            {/* RANKING */}
            <Route path="ranking/list" element={<StudentRankingView />} />
            {/* EDUCACION FINANCIERA */}
            <Route
              path="wallet/financial-education"
              element={<StudentFinancialEducationView />}
            />

            {/* INVERSIONES */}
            <Route path="investments/list" element={<InvestmentsView />} />
            <Route
              path="investments/details"
              element={<InvestmentDetailView />}
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentApp;
