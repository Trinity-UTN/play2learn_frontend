import type { Role } from "../../shared/utils/ProtectedRoute";

export const roleLandingRoutes: Record<Role, string> = {
  ROLE_ADMIN: "/dashboard",
  ROLE_TEACHER: "/dashboard/teacher",
  ROLE_STUDENT: "/dashboard/student",
};
