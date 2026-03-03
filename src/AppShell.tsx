import { useAuth } from "./user/hooks/useAuth";
import AdminApp from "./apps/AdminApp";
import TeacherApp from "./apps/TeacherApp";
import StudentApp from "./apps/StudentApp";
import { LoadingSpinnerComponent } from "@/shared";
import { Navigate } from "react-router-dom";

const AppShell: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <LoadingSpinnerComponent />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (user?.role) {
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
