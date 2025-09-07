import { motion } from "framer-motion";
import { FaGamepad, FaHeart, FaCheckCircle } from "react-icons/fa";
import Button from "../../Button/ButtonComponent";
import Input from "../../Input/InputComponent";
import Tooltip from "../../Tooltip/TooltipComponent";
import { useAhorcadoGame } from "../../../hooks/games/useAhorcadoGame";
import styles from "./AhorcadoGame.module.css";

interface AhorcadoGameProps {
  mode?: "preview" | "student";
}

const AhorcadoGame: React.FC<AhorcadoGameProps> = ({ mode = "student" }) => {
  const {
    gameConfig,
    guessedLetters,
    currentGuess,
    wrongGuesses,
    isGameWon,
    isGameLost,
    livesRemaining,
    handleGuessLetter,
    resetGame,
    setCurrentGuess,
    renderHangman,
    renderWordDisplay,
  } = useAhorcadoGame();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerClass =
    mode === "student"
      ? `${styles.activityContainer} ${styles.studentMode}`
      : styles.activityContainer;

  const isPreviewRoute =
    typeof window !== "undefined" &&
    window.location.pathname.includes(
      "/dashboard/teacher/actividad/configuration/ahorcado_educativo"
    );

  return (
    <motion.div variants={itemVariants} className={containerClass}>
      {mode == "preview" && (
        <div className={styles.activityHeader}>
          <div className={styles.activityTitle}>
            <FaGamepad className={styles.activityIcon} />
            <h4>Juego del Ahorcado</h4>
          </div>
          <div className={styles.deliveryType}>
            <FaHeart />
            <span>{livesRemaining} vidas restantes</span>
          </div>
        </div>
      )}

      <div className={styles.gameCard}>
        <div className={styles.gameContent}>
          <div className={styles.hangmanSection}>
            <div className={styles.hangmanDisplay}>
              <pre className={styles.hangmanArt}>
                {renderHangman(wrongGuesses)}
              </pre>
            </div>
          </div>

          <div className={styles.wordSection}>
            <div className={styles.wordDisplay}>
              <h5 className={styles.wordTitle}>Palabra a adivinar:</h5>
              <div className={styles.wordLetters}>
                {renderWordDisplay(guessedLetters)}
              </div>
            </div>

            <div className={styles.gameControls}>
              <div className={styles.inputSection}>
                <label className={styles.inputLabel}>Ingresa una letra:</label>
                <div className={styles.guessInput}>
                  <Input
                    type="text"
                    maxLength={1}
                    value={currentGuess}
                    onChange={(e) =>
                      setCurrentGuess(e.target.value.toUpperCase())
                    }
                    placeholder="A"
                    disabled={isGameWon || isGameLost}
                    className={styles.letterInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGuessLetter();
                      }
                    }}
                  />
                  <Button
                    onClick={handleGuessLetter}
                    disabled={!currentGuess || isGameWon || isGameLost}
                    className={styles.guessButton}
                  >
                    Probar
                  </Button>
                </div>
              </div>

              {guessedLetters.length > 0 && (
                <div className={styles.guessedSection}>
                  <h5 className={styles.guessedTitle}>Letras probadas:</h5>
                  <div className={styles.lettersList}>
                    {guessedLetters.map((letter, index) => (
                      <span
                        key={index}
                        className={`${styles.guessedLetter} ${
                          gameConfig?.word.toLowerCase().includes(letter)
                            ? styles.correct
                            : styles.incorrect
                        }`}
                      >
                        {letter.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(isGameWon || isGameLost) && (
                <div className={styles.gameResult}>
                  <div
                    className={`${styles.resultMessage} ${
                      isGameWon ? styles.winMessage : styles.loseMessage
                    }`}
                  >
                    {isGameWon ? (
                      <>
                        <FaCheckCircle />
                        ¡Felicitaciones! Adivinaste la palabra: "
                        {gameConfig?.word}"
                      </>
                    ) : (
                      <>
                        <FaHeart />
                        {mode === "student"
                          ? "No lograste completar la actividad."
                          : `¡Juego terminado! La palabra era: "${gameConfig?.word}"`}
                        {mode === "preview" && (
                          <Tooltip content="Tus alumnos no verán qué palabra era" />
                        )}
                      </>
                    )}
                  </div>
                  {isPreviewRoute && (
                    <Button
                      variant="secondary"
                      onClick={resetGame}
                      className={styles.restartButton}
                    >
                      Jugar de nuevo
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AhorcadoGame;
