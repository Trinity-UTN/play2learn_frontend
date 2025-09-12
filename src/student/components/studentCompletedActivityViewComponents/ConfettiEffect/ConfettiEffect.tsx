import { motion } from "framer-motion";
import styles from "./ConfettiEffect.module.css";

export default function ConfettiEffect() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"][
      i % 6
    ],
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    x: Math.random() * window.innerWidth,
    rotation: Math.random() * 360,
  }));

  return (
    <div className={styles.confettiContainer}>
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className={styles.confettiPiece}
          style={{
            backgroundColor: piece.color,
            left: piece.x,
          }}
          initial={{
            y: -10,
            opacity: 1,
            rotate: 0,
            scale: 1,
          }}
          animate={{
            y: window.innerHeight + 10,
            opacity: [1, 1, 0],
            rotate: piece.rotation,
            scale: [1, 0.8, 0.6],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Emojis flotantes */}
      {["🎉", "🎊", "⭐", "🏆", "🎯"].map((emoji, i) => (
        <motion.div
          key={emoji}
          className={styles.floatingEmoji}
          style={{
            left: `${20 + i * 15}%`,
          }}
          initial={{
            y: -50,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: 2,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
