import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { UserProvider } from "./user/contexts/userContext/UserProvider";
import {
  ConfirmationProvider,
  ToasterProvider,
  ScrollToTop,
  Unauthorized,
} from "@/shared";
import { PasswordProvider } from "./user";
import AppShell from "./AppShell";
import LoginPage from "./user/pages/Login/LoginPage";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <Router>
      <ToasterProvider>
        <UserProvider>
          <ConfirmationProvider>
            <PasswordProvider>
              <div className={styles.app}>
                <ScrollToTop />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/*" element={<AppShell />} />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
              </div>
            </PasswordProvider>
          </ConfirmationProvider>
        </UserProvider>
      </ToasterProvider>
    </Router>
  );
};

export default App;
