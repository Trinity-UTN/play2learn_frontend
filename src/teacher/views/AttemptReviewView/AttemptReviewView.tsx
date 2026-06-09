import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import AttemptReviewHeader from "../../components/attemptReview/attemptReviewHeader/AttemptReviewHeader";
import AttemptReviewContent from "../../components/attemptReview/attemptReviewContent/AttemptReviewContent";
import AttemptReviewForm from "../../components/attemptReview/attemptReviewForm/AttemptReviewForm";
import { useNoLudicaReviewData } from "../../hooks/activities/noLudicaReview/useNoLudicaReviewData";
import { useNoLudicaReviewActions } from "../../hooks/activities/noLudicaReview/useNoLudicaReviewActions";
import { reviewContainerVariants } from "../../constants/activity/noLudicaReview.constants";
import styles from "./AttemptReviewView.module.css";
import { LoadingSpinnerComponent } from "@/shared";

const AttemptReviewView: React.FC = () => {
  const { activityCompletedId } = useParams<{ activityCompletedId: string }>();

  const { loading, attemptData, storedData } =
    useNoLudicaReviewData(activityCompletedId);

  const {
    score,
    comment,
    calculatedState,
    isSubmitting,
    setScore,
    setComment,
    handleSubmitReview,
    handleGoBack,
  } = useNoLudicaReviewActions();
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinnerComponent />
      </div>
    );
  }
  // Error state - no stored data
  if (!loading && !storedData) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <FaExclamationTriangle className={styles.errorIcon} />
          <p>
            No se encontraron datos del intento. Por favor, acceda desde la
            lista de actividades.
          </p>
          <button onClick={handleGoBack} className={styles.backButton}>
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={reviewContainerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <AttemptReviewHeader storedData={storedData} onBack={handleGoBack} />

      <AttemptReviewContent attemptData={attemptData} loading={loading} />

      <AttemptReviewForm
        score={score}
        comment={comment}
        calculatedState={calculatedState}
        isSubmitting={isSubmitting}
        onScoreChange={setScore}
        onCommentChange={setComment}
        onSubmit={handleSubmitReview}
      />
    </motion.div>
  );
};

export default AttemptReviewView;
