import { useAuth } from "./user/hooks/useAuth";
import AdminApp from "./apps/AdminApp";
import TeacherApp from "./apps/TeacherApp";
import StudentApp from "./apps/StudentApp";
import { Navigate } from "react-router-dom";

const AppShell: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (role) {
    case "ROLE_ADMIN":
      return <AdminApp />;
    case "ROLE_TEACHER":
      return <TeacherApp />;
    case "ROLE_STUDENT":
      return <StudentApp />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default AppShell;
