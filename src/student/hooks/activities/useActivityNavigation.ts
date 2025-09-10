import { useNavigate, useParams } from "react-router-dom";

export const useActivityNavigation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const goBackToActivityView = () => {
    if (id) {
      navigate(`/dashboard/student/actividades/${id}/view`);
    }
  };

  const goToReview = () => {
    if (id) {
      navigate(`/dashboard/student/actividades/${id}/review`);
    }
  };

  return {
    goBackToActivityView,
    goToReview,
  };
};
