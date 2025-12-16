import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "@/shared";
import styles from "./StudentActivityFooter.module.css";

interface StudentActivityFooterProps {
  // Estado y navegación
  loading?: boolean;
  isFormValid?: boolean;

  // Handlers
  onBack?: () => void;
  onNext?: () => void;

  // Textos personalizables
  showBackToList?: boolean;
  backButtonText?: string;
  showBackButtonIcon?: boolean;
  nextButtonText?: string;
  showNextButtonIcon?: boolean;

  // Otros
  itemVariants?: any;
  className?: string;
}

const StudentActivityFooter: React.FC<StudentActivityFooterProps> = ({
  loading = false,
  isFormValid = true,
  onBack,
  onNext,
  showBackToList = true,
  backButtonText = "Atras",
  showBackButtonIcon = true,
  nextButtonText = "Continuar",
  showNextButtonIcon = true,
  itemVariants,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate("/dashboard/student/actividades/list");
  };
  const FooterContent = (
    <Card className={`${styles.footer} ${className}`}>
      <div className={styles.footerActions}>
        <div className={styles.leftSection}>
          {showBackToList && (
            <Button
              variant="secondary"
              onClick={handleBackToList}
              className={styles.backToListButton}
              disabled={loading}
            >
              <FaArrowLeft />
              Volver a Actividades
            </Button>
          )}

          {onBack && !showBackToList && (
            <Button
              variant="primary"
              onClick={onBack}
              className={styles.backButton}
              disabled={loading}
            >
              {showBackButtonIcon && <FaArrowLeft />}
              {backButtonText}
            </Button>
          )}
        </div>

        <div className={styles.rightSection}>
          {onBack && showBackToList && (
            <Button
              variant="primary"
              onClick={onBack}
              className={styles.backButton}
              disabled={loading}
            >
              {showBackButtonIcon && <FaArrowLeft />}
              {backButtonText}
            </Button>
          )}

          {onNext && (
            <Button
              variant="secondary"
              onClick={onNext}
              disabled={!isFormValid || loading}
              className={styles.nextButton}
            >
              {loading ? "Cargando..." : nextButtonText}
              {showNextButtonIcon && <FaArrowRight />}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return itemVariants ? (
    <motion.div variants={itemVariants}>{FooterContent}</motion.div>
  ) : (
    FooterContent
  );
};

export default StudentActivityFooter;
