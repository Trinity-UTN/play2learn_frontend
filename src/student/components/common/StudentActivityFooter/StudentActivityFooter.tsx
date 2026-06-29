import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "@/shared";
import StudentActivityFab, { type FabAction } from "./StudentActivityFab";
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
  fab?: boolean;
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
  fab = false,
}) => {
  const navigate = useNavigate();
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerInView, setFooterInView] = useState(true);

  useEffect(() => {
    if (!fab) return;
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fab]);

  const handleBackToList = () => {
    navigate("/dashboard/student/actividades/list");
  };

  // Mismas acciones (y mismos botones) que muestra el footer, para el FAB
  const fabActions: FabAction[] = [
    ...(onNext
      ? [
          {
            key: "next",
            variant: "secondary" as const,
            onClick: onNext,
            disabled: !isFormValid || loading,
            children: (
              <>
                {loading ? "Cargando..." : nextButtonText}
                {showNextButtonIcon && <FaArrowRight />}
              </>
            ),
          },
        ]
      : []),
    ...(onBack
      ? [
          {
            key: "back",
            variant: "primary" as const,
            onClick: onBack,
            disabled: loading,
            children: (
              <>
                {showBackButtonIcon && <FaArrowLeft />}
                {backButtonText}
              </>
            ),
          },
        ]
      : []),
    ...(showBackToList
      ? [
          {
            key: "list",
            variant: "secondary" as const,
            onClick: handleBackToList,
            disabled: loading,
            children: (
              <>
                <FaArrowLeft />
                Volver a Actividades
              </>
            ),
          },
        ]
      : []),
  ];

  const FooterContent = (
    <Card ref={footerRef} className={`${styles.footer} ${className}`}>
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

  const footerNode = itemVariants ? (
    <motion.div variants={itemVariants}>{FooterContent}</motion.div>
  ) : (
    FooterContent
  );

  if (!fab) return footerNode;

  return (
    <>
      {footerNode}
      <StudentActivityFab actions={fabActions} visible={!footerInView} />
    </>
  );
};

export default StudentActivityFooter;
