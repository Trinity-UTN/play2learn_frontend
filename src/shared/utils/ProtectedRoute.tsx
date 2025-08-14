import { Navigate } from "react-router-dom";
import { useAuth } from "../../user/hooks/useAuth";

export type Role = "ROLE_ADMIN" | "ROLE_TEACHER" | "ROLE_STUDENT";

const ProtectedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: Role[];
  children: React.ReactNode;
}) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(role!))
    return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};
export default ProtectedRoute;
