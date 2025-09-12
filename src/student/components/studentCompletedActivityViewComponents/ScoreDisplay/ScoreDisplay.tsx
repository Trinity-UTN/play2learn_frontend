import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import styles from "./ScoreDisplay.module.css";
import { useCountUp } from "../../../../shared/hooks/useCountUp";

interface ScoreDisplayProps {
  scoreProp: number | undefined | null;
  maxScoreProp: number | undefined;
  passed: boolean;
  animationPhase: number;
}

export default function ScoreDisplay({
  scoreProp,
  maxScoreProp,
  passed,
  animationPhase,
}: ScoreDisplayProps) {
  const score = scoreProp ? scoreProp : 1;
  const maxScore = maxScoreProp ? maxScoreProp : 1;
  const percentage = Math.round((score / (maxScore ? maxScore : 1)) * 100);
  const displayScore = useCountUp(score, animationPhase, {
    steps: 20,
    interval: 50,
  });

  const circleVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: percentage / 100,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut", delay: 0.5 },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <div className={styles.scoreContainer}>
      <div className={styles.circularProgress}>
        <svg className={styles.progressRing} width="200" height="200">
          <circle
            className={styles.progressRingBackground}
            cx="100"
            cy="100"
            r="80"
          />
          <motion.circle
            className={`${styles.progressRingForeground} ${
              passed ? styles.success : styles.failure
            }`}
            cx="100"
            cy="100"
            r="80"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>

        <div className={styles.scoreText}>
          <motion.div
            className={styles.scoreNumber}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            {displayScore}
          </motion.div>
          <div className={styles.scoreMax}>/ {maxScore}</div>
          <div
            className={`${styles.percentage} ${
              passed ? styles.success : styles.failure
            }`}
          >
            {Math.round((displayScore / (maxScore ? maxScore : 1)) * 100)}%
          </div>
        </div>
      </div>

      <motion.div
        className={styles.scoreLabel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        {passed ? "¡Excelente trabajo!" : "Necesitas mejorar"}
      </motion.div>
    </div>
  );
}
