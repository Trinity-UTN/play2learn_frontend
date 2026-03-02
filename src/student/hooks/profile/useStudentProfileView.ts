import { useNavigate } from "react-router-dom";
import { useCurrentStudent } from "../useCurrentStudent";

export const useStudentProfileView = () => {
  const navigate = useNavigate();
  const { currentStudent, loading } = useCurrentStudent();

  const isLoading = loading;
  const hasStudent = !!currentStudent;

  const handleEditAvatar = () => {
    navigate("/dashboard/student/profile/avatar");
  };
  const profileProps = {
    currentStudent,
    onEditAvatar: handleEditAvatar,
    avatarSize: "large" as const,
    showLevel: true,
    showRing: true,
  };

  // TODO: Reemplazar con datos reales cuando estén disponibles
  const statsProps = {
    rankingPosition: 8,
    achievementsCount: 12,
  };

  return {
    isLoading,
    hasStudent,
    profileProps,
    statsProps,
  };
};
