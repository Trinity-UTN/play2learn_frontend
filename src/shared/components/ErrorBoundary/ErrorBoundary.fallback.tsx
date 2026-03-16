import type React from "react";
import { type FallbackProps } from "react-error-boundary";
import { motion, type Variants } from "framer-motion";
import { FaHome, FaRedo, FaArrowLeft, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../Button/ButtonComponent";
import Card from "../Card/CardComponent";
import { useErrorBoundary } from "../../hooks/useErrorBoundary";
import styles from "./ErrorBoundary.module.css";

const ErrorFallback: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  const navigate = useNavigate();
  const variant = useErrorBoundary();

  const handleGoHome = () => {
    navigate("/");
    resetErrorBoundary();
  };

  const handleGoBack = () => {
    navigate(-1);
    resetErrorBoundary();
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const variantClass = {
    login: styles.variantLogin,
    admin: styles.variantAdmin,
    teacher: styles.variantTeacher,
    student: styles.variantStudent,
    default: styles.variantDefault,
  }[variant];

  return (
    <div className={`${styles.container} ${variantClass}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.content}
      >
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={styles.floatingIcon}
          style={{ top: "10%", left: "15%" }}
        >
          <FaHeart
            className={styles.decorativeIcon}
            style={{ color: "#ff8080" }}
          />
        </motion.div>

        <Card className={styles.errorCard}>
          <motion.div variants={itemVariants} className={styles.logoWrapper}>
            <img
              src="/LogoErrorBoundary.png"
              alt="Play2Learn Logo"
              className={styles.logo}
            />
          </motion.div>

          <motion.div variants={itemVariants} className={styles.errorContent}>
            <h1 className={styles.errorTitle}>
              Algo no salió como esperábamos
            </h1>
            <p className={styles.errorMessage}>
              Hubo un pequeño error en la aplicación.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.actionButtons}>
            <Button
              variant="primary"
              onClick={resetErrorBoundary}
              className={styles.primaryButton}
            >
              <FaRedo className={styles.buttonIcon} />
              Refrescar página
            </Button>
            <Button
              variant="outline"
              onClick={handleGoBack}
              className={styles.secondaryButton}
            >
              <FaArrowLeft className={styles.buttonIcon} />
              Volver atrás
            </Button>
            <Button
              variant="outline"
              onClick={handleGoHome}
              className={styles.secondaryButton}
            >
              <FaHome className={styles.buttonIcon} />
              Ir al Inicio
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ErrorFallback;
