import type React from "react";
import { motion } from "framer-motion";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  overlay?: boolean;
}

const LoadingSpinnerComponent: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Cargando...",
  overlay = false,
}) => {
  const spinnerContent = (
    <div className={`${styles.container} ${styles[size]}`}>
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );

  if (overlay) {
    return <div className={styles.overlay}>{spinnerContent}</div>;
  }

  return spinnerContent;
};

export default LoadingSpinnerComponent;
