import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import styles from "./StudentActivityFooter.module.css";

interface StudentActivityFooterProps {
  // Estado y navegación
  loading?: boolean;
  isFormValid?: boolean;

  // Handlers
  onBack?: () => void;
  onNext?: () => void;

  // Textos personalizables
  nextButtonText?: string;
  showBackToList?: boolean;

  // Otros
  itemVariants?: any;
  className?: string;
}

const StudentActivityFooter: React.FC<StudentActivityFooterProps> = ({
  loading = false,
  isFormValid = true,
  onBack,
  onNext,
  nextButtonText = "Continuar",
  showBackToList = true,
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

        <div className={styles.navigationButtons}>
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

          {onNext && (
            <Button
              variant="secondary"
              onClick={onNext}
              disabled={!isFormValid || loading}
              className={styles.nextButton}
            >
              {loading ? "Cargando..." : nextButtonText}
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
