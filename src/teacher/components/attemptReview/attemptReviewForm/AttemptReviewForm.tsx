import { motion } from "framer-motion";
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
          <div className={styles.scoreSection}>
            <label className={styles.label}>Puntaje (0-100)</label>
            <div className={styles.scoreInputRow}>
              <Input
                type="number"
                value={score === 0 ? "" : score}
                onChange={handleScoreChange}
                placeholder="0"
                min={0}
                max={100}
                className={styles.scoreInput}
              />
              {hasScore && (
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
              )}
            </div>
            <span className={styles.scoreHint}>
              Mínimo para aprobar: {PASSING_SCORE}
            </span>
          </div>

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
