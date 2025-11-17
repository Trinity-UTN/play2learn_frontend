import type React from "react";
import { motion } from "framer-motion";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  overlay?: boolean;
  color?: string;
  colorText?: string;
}

const LoadingSpinnerComponent: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Cargando...",
  overlay = false,
  color = "#3b82f6",
  colorText,
}) => {
  const spinnerContent = (
    <div className={`${styles.container} ${styles[size]}`}>
      <motion.div
        className={styles.spinner}
        style={{
          borderTopColor: color,
          borderLeftColor: color,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      {text && (
        <p className={styles.text} style={{ color: colorText }}>
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return <div className={styles.overlay}>{spinnerContent}</div>;
  }

  return spinnerContent;
};

export default LoadingSpinnerComponent;
