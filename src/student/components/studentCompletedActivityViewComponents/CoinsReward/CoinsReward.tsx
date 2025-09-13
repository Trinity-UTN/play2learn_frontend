import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import styles from "./CoinsReward.module.css";
import { FaCoins, FaMoneyBillAlt } from "react-icons/fa";
interface CoinsRewardProps {
  coinsEarned: number | undefined | null;
  animationPhase: number;
}

export default function CoinsReward({
  coinsEarned,
  animationPhase,
}: CoinsRewardProps) {
  const [displayCoins, setDisplayCoins] = useState<number>(0);

  useEffect(() => {
    if (animationPhase >= 2) {
      const targetCoins = coinsEarned ?? 100; // si es null/undefined → 100
      const increment = Math.ceil(targetCoins / 10);

      const timer = setInterval(() => {
        setDisplayCoins((prev) => {
          if (prev >= targetCoins) {
            clearInterval(timer);
            return targetCoins; // siempre number
          }
          return prev + increment;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [animationPhase, coinsEarned]);

  const containerVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const coinVariants: Variants = {
    hidden: { y: -50, opacity: 0, rotate: -180 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const glowVariants: Variants = {
    glow: {
      boxShadow: [
        "0 0 20px rgba(255, 215, 0, 0.5)",
        "0 0 40px rgba(255, 215, 0, 0.8)",
        "0 0 20px rgba(255, 215, 0, 0.5)",
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={styles.coinsContainer}
      variants={containerVariants}
      initial="hidden"
      animate={animationPhase >= 2 ? "visible" : "hidden"}
    >
      <motion.div
        className={styles.coinsDisplay}
        animate="glow"
        variants={glowVariants}
      >
        <motion.div className={styles.coinIcon} variants={coinVariants}>
          <FaCoins />
        </motion.div>

        <div className={styles.coinsText}>
          <motion.div
            className={styles.coinsNumber}
            key={displayCoins}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            +{displayCoins}
          </motion.div>
          <div className={styles.coinsLabel}>Monedas ganadas</div>
        </div>
      </motion.div>

      <motion.div
        className={styles.floatingCoins}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.floatingCoin}
            style={{ left: `${20 + Math.random() * 60}%` }}
            initial={{ y: 0, opacity: 1 }}
            animate={{
              y: [-20, -40, -60],
              opacity: [1, 0.8, 0],
              x: [0, Math.random() * 60 - 30],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          >
            <FaMoneyBillAlt />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
