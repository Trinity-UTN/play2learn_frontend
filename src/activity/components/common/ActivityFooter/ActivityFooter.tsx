import { motion } from "framer-motion";
import { FaUndo, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Button, Card } from "@/shared";
import styles from "./ActivityFooter.module.css";

interface ActivityFooterProps {
  // Estado y navegación
  loading?: boolean;
  currentStep: string | number;
  totalSteps: number;
  isFormValid?: boolean;

  // Handlers
  onReset: () => void;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;

  // Textos personalizables
  nextButtonText?: string;
  submitButtonText?: string;

  // Otros
  itemVariants?: any;
  className?: string;
}

const ActivityFooter: React.FC<ActivityFooterProps> = ({
  loading = false,
  currentStep,
  totalSteps,
  isFormValid = true,
  onReset,
  onBack,
  onNext,
  onSubmit,
  nextButtonText = "Siguiente",
  submitButtonText = "Crear Actividad",
  itemVariants,
  className = "",
}) => {
  const currentStepNum =
    typeof currentStep === "number"
      ? currentStep
      : currentStep === "config"
      ? 1
      : currentStep === "preview"
      ? totalSteps
      : 1;

  // const isFirstStep = currentStepNum === 1;
  const isLastStep = currentStepNum === totalSteps;

  const handleNextClick = () => {
    if (isLastStep && onSubmit) {
      onSubmit();
    } else if (onNext) {
      onNext();
    }
  };

  const getNextButtonText = () => {
    if (isLastStep) {
      return loading ? "Creando..." : submitButtonText;
    }
    return nextButtonText;
  };

  const FooterContent = (
    <Card className={`${styles.footer} ${className}`}>
      <div className={styles.footerActions}>
        {onBack && (
          <Button
            variant="primary"
            onClick={onBack}
            className={styles.backButton}
            disabled={loading}
          >
            <FaArrowLeft />
            Atrás
          </Button>
        )}

        <div className={styles.navigationButtons}>
          <Button
            variant="danger"
            onClick={onReset}
            disabled={loading}
            className={styles.resetButton}
          >
            <FaUndo />
            Reiniciar
          </Button>

          {(onNext || onSubmit) && (
            <Button
              variant="primary"
              onClick={handleNextClick}
              disabled={!isFormValid || loading}
              className={styles.nextButton}
            >
              <FaArrowRight />
              {getNextButtonText()}
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

export default ActivityFooter;
