import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { UserProvider } from "./user/contexts/userContext/UserProvider";
import { ConfirmationProvider } from "./shared/contexts/confirmationContext/ConfirmationProvider";
import { ToasterProvider } from "./shared/contexts/toasterContext/ToasterProvider";
import AppShell from "./AppShell";
import LoginPage from "./user/pages/Login/LoginPage";
import Unauthorized from "./shared/components/Unauthorized/Unauthorized";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <Router>
      <ToasterProvider>
        <UserProvider>
          <ConfirmationProvider>
            <div className={styles.app}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<AppShell />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
              </Routes>
            </div>
          </ConfirmationProvider>
        </UserProvider>
      </ToasterProvider>
    </Router>
  );
};

export default App;
