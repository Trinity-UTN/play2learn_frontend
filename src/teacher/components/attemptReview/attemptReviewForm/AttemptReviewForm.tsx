import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button, Card, Input } from "@/shared";
import {
  reviewItemVariants,
  PASSING_SCORE,
} from "../../../constants/activity/noLudicaReview.constants";
import { getReviewStateConfig } from "../../../utils/activity/noLudicaReview.utils";
import styles from "./AttemptReviewForm.module.css";

interface AttemptReviewFormProps {
  score: number | "";
  comment: string;
  calculatedState: "APPROVED" | "DISAPPROVED";
  isSubmitting: boolean;
  onScoreChange: (score: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
}

const AttemptReviewForm: React.FC<AttemptReviewFormProps> = ({
  score,
  comment,
  calculatedState,
  isSubmitting,
  onScoreChange,
  onCommentChange,
  onSubmit,
}) => {
  const stateConfig = getReviewStateConfig(calculatedState);
  const StateIcon = stateConfig.icon;
  const hasScore = score !== "" && score > 0;

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      onScoreChange(0);
    } else {
      onScoreChange(Number(value));
    }
  };

  return (
    <motion.div variants={reviewItemVariants}>
      <Card className={styles.formCard}>
        <h2 className={styles.sectionTitle}>Formulario de corrección</h2>

        <div className={styles.formContent}>
          {/* Score Row - Horizontal layout */}
          <div className={styles.scoreRow}>
            <div className={styles.scoreSection}>
              <label className={styles.label}>Puntaje (0-100)</label>
              <div className={styles.scoreInputWrapper}>
                <Input
                  type="number"
                  value={score === 0 ? "" : score}
                  onChange={handleScoreChange}
                  placeholder="0"
                  min={0}
                  max={100}
                  className={styles.scoreInput}
                />
                <span className={styles.scoreHint}>
                  Mínimo para aprobar: {PASSING_SCORE}
                </span>
              </div>
            </div>

            {/* State and Result Preview - Only show when score > 0 */}
            {hasScore && (
              <div className={styles.resultSection}>
                <div className={styles.statePreview}>
                  <div
                    className={styles.stateBadge}
                    style={{
                      backgroundColor: stateConfig.bgColor,
                      color: stateConfig.color,
                    }}
                  >
                    <StateIcon className={styles.stateIcon} />
                    <span>{stateConfig.label}</span>
                  </div>
                </div>
                <div
                  className={styles.resultPreview}
                  style={{
                    borderColor: stateConfig.color,
                    backgroundColor: stateConfig.bgColor,
                  }}
                >
                  <div className={styles.resultIcon}>
                    {calculatedState === "APPROVED" ? (
                      <FaCheck style={{ color: stateConfig.color }} />
                    ) : (
                      <FaTimes style={{ color: stateConfig.color }} />
                    )}
                  </div>
                  <div className={styles.resultText}>
                    <strong style={{ color: stateConfig.color }}>
                      {calculatedState === "APPROVED"
                        ? "El estudiante aprobará"
                        : "El estudiante desaprobará"}
                    </strong>
                    <span>
                      con <strong>{score}/100</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comment Textarea */}
          <div className={styles.commentSection}>
            <label className={styles.label}>
              Comentario para el estudiante (opcional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Escribe un comentario o retroalimentación..."
              className={styles.commentTextarea}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className={styles.submitSection}>
            <Button
              variant="primary"
              onClick={onSubmit}
              disabled={isSubmitting || !hasScore}
              className={styles.submitButton}
            >
              {isSubmitting ? "Enviando..." : "Finalizar revisión"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AttemptReviewForm;
