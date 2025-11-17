import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinnerComponent";
import { useAuth } from "../../user/hooks/useAuth";

export type Role = "ROLE_ADMIN" | "ROLE_TEACHER" | "ROLE_STUDENT";

const ProtectedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: Role[];
  children: React.ReactNode;
}) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(role!))
    return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
