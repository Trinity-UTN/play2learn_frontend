import { motion } from "framer-motion";
import Card from "../../../../shared/components/Card/CardComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import styles from "./AhorcadoPreview.module.css";
import { FaGamepad, FaCheckCircle } from "react-icons/fa";
import { useCreateAhorcado } from "../../../hooks/useCreateAhorcado";
import Input from "../../../../shared/components/Input/InputComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";

const AhorcadoPreview = () => {
  const {
    itemVariants,
    renderHangman,
    guessedLetters,
    renderWordDisplay,
    ahorcadoData,
    currentGuess,
    setCurrentGuess,
    setGuessedLetters,
  } = useCreateAhorcado();
  return (
    <>
      <motion.div variants={itemVariants}>
        <Card className={styles.previewCard}>
          <div className={styles.cardHeader}>
            <FaGamepad className={styles.cardIcon} />
            <h2 className={styles.cardTitle}>Vista Previa del Juego</h2>
            <Badge variant="success" className={styles.previewBadge}>
              <FaCheckCircle />
              Configuración Lista
            </Badge>
          </div>

          <div className={styles.gamePreview}>
            <div className={styles.hangmanDisplay}>
              <pre className={styles.hangmanArt}>
                {renderHangman(guessedLetters.length)}
              </pre>
            </div>

            <div className={styles.gameInfo}>
              <div className={styles.wordDisplay}>
                <h3 className={styles.wordTitle}>Palabra a Adivinar:</h3>
                <div className={styles.wordLetters}>{renderWordDisplay()}</div>
              </div>

              <div className={styles.gameStats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Errores Permitidos:</span>
                  <span className={styles.statValue}>
                    {ahorcadoData.errorsPermited}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Longitud de Palabra:</span>
                  <span className={styles.statValue}>
                    {ahorcadoData.word.length} letras
                  </span>
                </div>
              </div>

              <div className={styles.previewControls}>
                <Input
                  type="text"
                  maxLength={1}
                  value={currentGuess}
                  onChange={(e) =>
                    setCurrentGuess(e.target.value.toUpperCase())
                  }
                  placeholder="Letra"
                  className={styles.guessInput}
                />
                <Button
                  onClick={() => {
                    if (
                      currentGuess &&
                      !guessedLetters.includes(currentGuess.toLowerCase())
                    ) {
                      setGuessedLetters((prev) => [
                        ...prev,
                        currentGuess.toLowerCase(),
                      ]);
                      setCurrentGuess("");
                    }
                  }}
                  disabled={!currentGuess}
                  className={styles.guessButton}
                >
                  Probar Letra
                </Button>
              </div>

              {guessedLetters.length > 0 && (
                <div className={styles.guessedLetters}>
                  <span className={styles.guessedLabel}>Letras probadas:</span>
                  <div className={styles.lettersList}>
                    {guessedLetters.map((letter, index) => (
                      <span
                        key={index}
                        className={`${styles.guessedLetter} ${
                          ahorcadoData.word.toLowerCase().includes(letter)
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
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default AhorcadoPreview;
