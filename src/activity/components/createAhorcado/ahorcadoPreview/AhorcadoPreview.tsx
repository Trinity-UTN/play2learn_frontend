import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEye,
  FaGamepad,
  FaHeart,
  FaCheckCircle,
  FaPlay,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import { useCreateAhorcado } from "../../../hooks/useCreateAhorcado";
import styles from "./AhorcadoPreview.module.css";

const AhorcadoPreview: React.FC = () => {
  const { config, renderHangman, renderWordDisplay } = useCreateAhorcado();

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleGuessLetter = () => {
    if (currentGuess && !guessedLetters.includes(currentGuess.toLowerCase())) {
      setGuessedLetters((prev) => [...prev, currentGuess.toLowerCase()]);
      setCurrentGuess("");
    }
  };

  const getMaxErrors = (): number => {
    return config.errorsPermited === "CINCO" ? 5 : 3;
  };

  const wrongGuesses = guessedLetters.filter(
    (letter) => !config.word.toLowerCase().includes(letter)
  ).length;

  const isGameWon = config.word
    .toLowerCase()
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isGameLost = wrongGuesses >= getMaxErrors();

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h4 className={styles.title}>
              <FaEye className={styles.headerIcon} />
              Vista Previa de Actividad
              <span className={styles.tooltip}>
                <Tooltip content="Puedes probar jugando una partida de ejemplo" />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Así es como verán la actividad tus estudiantes.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🎯</span>
            <div>
              <span className={styles.statLabel}>Palabra</span>
              <span className={styles.statValue}>
                {config.word.length} letras
              </span>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>❤️</span>
            <div>
              <span className={styles.statLabel}>Errores permitidos</span>
              <span className={styles.statValue}>{getMaxErrors()}</span>{" "}
              {/* Usando función helper */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.activityContainer}>
        <div className={styles.activityHeader}>
          <div className={styles.activityTitle}>
            <FaGamepad className={styles.activityIcon} />
            <h4>Juego del Ahorcado</h4>
          </div>
          <div className={styles.deliveryType}>
            <FaHeart />
            <span>{getMaxErrors() - wrongGuesses} vidas restantes</span>{" "}
            {/* Usando función helper */}
          </div>
        </div>

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

              {!gameStarted ? (
                <div className={styles.startSection}>
                  <Button
                    variant="primary"
                    onClick={() => setGameStarted(true)}
                    className={styles.startButton}
                  >
                    <FaPlay />
                    Comenzar Juego
                  </Button>
                </div>
              ) : (
                <div className={styles.gameControls}>
                  <div className={styles.inputSection}>
                    <label className={styles.inputLabel}>
                      Ingresa una letra:
                    </label>
                    <div className={styles.guessInput}>
                      <input
                        type="text"
                        maxLength={1}
                        value={currentGuess}
                        onChange={(e) =>
                          setCurrentGuess(e.target.value.toUpperCase())
                        }
                        placeholder="A"
                        className={styles.letterInput}
                        disabled={isGameWon || isGameLost}
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
                              config.word.toLowerCase().includes(letter)
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
                            {config.word}"
                          </>
                        ) : (
                          <>
                            <FaHeart />
                            ¡Juego terminado! La palabra era: "{config.word}"
                          </>
                        )}
                      </div>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setGuessedLetters([]);
                          setCurrentGuess("");
                          setGameStarted(false);
                        }}
                        className={styles.restartButton}
                      >
                        Jugar de nuevo
                      </Button>
                    </div>
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

export default AhorcadoPreview;
