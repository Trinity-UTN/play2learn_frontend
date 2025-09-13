import { motion, type Variants } from "framer-motion";
import { useAhorcadoGame } from "../../../hooks/games/useAhorcadoGame";
import styles from "./DetailsAhorcado.module.css";
import { useActivityStudent } from "../../../../student/hooks/useActivityStudentAPI";

export default function ActivityDetails() {
  const {
    gameConfig,
    renderWordDisplay,
    isGameWon,
    guessedLetters,
    renderHangman,
    wrongGuesses,
    maxErrors,
    livesRemaining,
  } = useAhorcadoGame();
  const { currentActivity } = useActivityStudent();
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPerformanceLevel = () => {
    const errorRate = wrongGuesses / maxErrors;
    if (errorRate <= 0.3)
      return { level: "Excelente", color: "success", icon: "🏆" };
    if (errorRate <= 0.6) return { level: "Bueno", color: "good", icon: "👍" };
    if (errorRate <= 0.8)
      return { level: "Regular", color: "regular", icon: "👌" };
    return { level: "Necesita mejorar", color: "poor", icon: "💪" };
  };

  const performance = getPerformanceLevel();

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      className={styles.detailsContainer}
      variants={containerVariants}
      initial="hidden"
      animate={"visible"}
    >
      {/* Resultado Principal */}
      <motion.div
        className={`${styles.mainResult} ${
          isGameWon ? styles.won : styles.lost
        }`}
        variants={itemVariants}
      >
        <div className={styles.resultIcon}>{isGameWon ? "🎉" : "😔"}</div>
        <div className={styles.resultText}>
          <h3>{isGameWon ? "¡Palabra Completada!" : "Juego Terminado"}</h3>
          <p className={styles.wordReveal}>
            La palabra era: <strong>{gameConfig?.word || "---"}</strong>
          </p>
        </div>
      </motion.div>

      {/* Visualización de la Palabra */}
      <motion.div className={styles.wordSection} variants={itemVariants}>
        <h4>📝 Estado Final de la Palabra</h4>
        <div className={styles.wordDisplay}>
          {renderWordDisplay(guessedLetters)}
        </div>
      </motion.div>

      {/* Ahorcado Visual */}
      <motion.div className={styles.hangmanSection} variants={itemVariants}>
        <h4>🎭 Estado del Ahorcado</h4>
        <div className={styles.hangmanDisplay}>
          <pre>{renderHangman(wrongGuesses)}</pre>
        </div>
      </motion.div>

      {/* Estadísticas del Juego */}
      <motion.div className={styles.statsGrid} variants={itemVariants}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Letras Correctas</span>
            <span className={styles.statValue}>
              {
                guessedLetters.filter((letter) =>
                  gameConfig?.word.toLowerCase().includes(letter.toLowerCase())
                ).length
              }
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>❌</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Errores Cometidos</span>
            <span className={styles.statValue}>
              {wrongGuesses} / {maxErrors}
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>❤️</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Vidas Restantes</span>
            <span className={styles.statValue}>{livesRemaining}</span>
          </div>
        </div>

        {/* <div className={styles.statCard}>
          <div className={styles.statIcon}>⏱️</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Tiempo Total</span>
            <span className={styles.statValue}>{formatTime(timeSpent)}</span>
          </div>
        </div> */}

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🔄</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Intento</span>
            <span className={styles.statValue}>
              {currentActivity?.attempts}
            </span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.performanceCard}`}>
          <div className={styles.statIcon}>{performance.icon}</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Rendimiento</span>
            <span
              className={`${styles.statValue} ${styles[performance.color]}`}
            >
              {performance.level}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Letras Utilizadas */}
      <motion.div className={styles.lettersSection} variants={itemVariants}>
        <h4>🔤 Letras Utilizadas</h4>
        <div className={styles.lettersGrid}>
          {guessedLetters.map((letter, index) => {
            const isCorrect = gameConfig?.word
              .toLowerCase()
              .includes(letter.toLowerCase());
            return (
              <motion.div
                key={`${letter}-${index}`}
                className={`${styles.letterBadge} ${
                  isCorrect ? styles.correct : styles.incorrect
                }`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {letter.toUpperCase()}
              </motion.div>
            );
          })}
        </div>
        {guessedLetters.length === 0 && (
          <p className={styles.noLetters}>No se utilizaron letras</p>
        )}
      </motion.div>

      {/* Análisis de Estrategia */}
      <motion.div className={styles.analysisSection} variants={itemVariants}>
        <h4>📊 Análisis de tu Estrategia</h4>
        <div className={styles.analysisGrid}>
          <div className={styles.analysisItem}>
            <span className={styles.analysisLabel}>Eficiencia:</span>
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.max(
                    0,
                    100 - (wrongGuesses / maxErrors) * 100
                  )}%`,
                }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className={styles.analysisItem}>
            {/* <span className={styles.analysisLabel}>Velocidad:</span>
            <div className={styles.progressBar}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.max(0, 100 - (timeSpent / 300) * 100)}%`, // Asumiendo 5 min como tiempo base
                }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              />
            </div> */}
          </div>
        </div>
      </motion.div>

      {/* Consejos para Mejorar */}
      {!isGameWon && (
        <motion.div className={styles.tipsSection} variants={itemVariants}>
          <h4>💡 Consejos para Mejorar</h4>
          <div className={styles.tipsList}>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>🎯</span>
              <span>Comienza con las vocales más comunes (A, E, I, O, U)</span>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>📚</span>
              <span>Piensa en consonantes frecuentes como R, S, T, N, L</span>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>🧠</span>
              <span>Considera el contexto y la longitud de la palabra</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
