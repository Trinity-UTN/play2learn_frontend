import { motion } from "framer-motion";
import { FaFileAlt, FaPaperclip } from "react-icons/fa";
import { Card } from "@/shared";
import PDFViewer from "../PDFViewer/PDFViewer";
import { reviewItemVariants } from "../../../constants/activity/noLudicaReview.constants";
import type { NoLudicaAttemptResponseDto } from "../../../types/NoLudicaReview.type";
import { NO_LUDICA_EMPTY_TEXT_RESPONSE } from "@/shared/constants/games.constants";
import styles from "./AttemptReviewContent.module.css";

interface AttemptReviewContentProps {
  attemptData: NoLudicaAttemptResponseDto | null;
  loading: boolean;
}

const AttemptReviewContent: React.FC<AttemptReviewContentProps> = ({
  attemptData,
  loading,
}) => {
  // Only show loading if we have no data at all
  const showLoading = loading && !attemptData;

  return (
    <motion.div variants={reviewItemVariants}>
      <Card className={styles.contentCard}>
        <h2 className={styles.sectionTitle}>Contenido del intento</h2>

        <div className={styles.contentWrapper}>
          {/* Texto plano (si existe) */}
          {attemptData?.plainText && (
            <div className={styles.textSection}>
              <h3 className={styles.subsectionTitle}>
                Respuesta del estudiante
              </h3>
              <div className={styles.textContent}>
                <p
                  className={
                    attemptData.plainText === NO_LUDICA_EMPTY_TEXT_RESPONSE
                      ? styles.italicText
                      : ""
                  }
                >
                  {attemptData.plainText}
                </p>
              </div>
            </div>
          )}

          {/* Archivo adjunto (si existe) */}
          {attemptData?.hasFile && attemptData.fileData && (
            <div className={styles.fileSection}>
              <h3 className={styles.subsectionTitle}>
                <FaPaperclip className={styles.subsectionIcon} />
                Archivo adjunto
              </h3>
              <PDFViewer
                fileUrl={attemptData.fileData.fileUrl}
                fileName={attemptData.fileData.fileName}
                fileSize={attemptData.fileData.fileSize}
              />
            </div>
          )}

          {/* Loading state */}
          {showLoading && (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p>Cargando contenido...</p>
            </div>
          )}

          {/* Sin contenido */}
          {!loading &&
            attemptData &&
            !attemptData.plainText &&
            !attemptData.hasFile && (
              <div className={styles.emptyState}>
                <FaFileAlt className={styles.emptyIcon} />
                <p>El estudiante no proporcionó contenido para este intento</p>
              </div>
            )}

          {/* Error - no hay datos después de cargar */}
          {!loading && !attemptData && (
            <div className={styles.emptyState}>
              <FaFileAlt className={styles.emptyIcon} />
              <p>No se pudo cargar el contenido del intento</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default AttemptReviewContent;
