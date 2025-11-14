import { motion, type Variants } from "framer-motion";
import { FaCheck, FaRegLightbulb, FaSearch, FaTimes } from "react-icons/fa";
import { MdOutlineSpellcheck } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { GiBookshelf, GiBrain } from "react-icons/gi";
import { HiOutlineFire } from "react-icons/hi";
import { PiSmileySad } from "react-icons/pi";
import { useCompletarOracionDetails } from "../../../hooks/details/useCompletarOracionDetails";
import styles from "./DetailsCompletarOracionGame.module.css";

const DetailsCompletarOracionGame = () => {
  const {
    accuracy,
    score,
    // performance,
    isGameWon,
    correctAnswers,
    unanswered,
    correctList,
    incorrectList,
    gameConfig,
  } = useCompletarOracionDetails();

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div className={styles.detailsContainer}>
      {/* Resultado Principal */}
      <motion.div
        className={`${styles.mainResult} ${
          isGameWon ? styles.won : styles.lost
        }`}
        variants={itemVariants}
      >
        <div className={styles.resultIcon}>
          {isGameWon ? <HiOutlineFire /> : <PiSmileySad />}
        </div>
        <div className={styles.resultText}>
          <h3>
            {isGameWon ? "¡Actividad Completada!" : "Actividad Finalizada"}
          </h3>
          <p className={styles.accuracyText}>
            Precisión: <strong>{accuracy}%</strong>
          </p>
        </div>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreNumber}>{score}</span>
          <span className={styles.scoreLabel}>pts</span>
        </div>
      </motion.div>

      {/* Resumen de Resultados */}
      <motion.div className={styles.summarySection} variants={itemVariants}>
        <h4>Resumen de Respuestas</h4>
        <div className={styles.summaryGrid}>
          <div className={`${styles.summaryCard} ${styles.correct}`}>
            <div className={styles.summaryIcon}>
              <FaCheck />
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryNumber}>{correctAnswers}</span>
              <span className={styles.summaryLabel}>Correctas</span>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.incorrect}`}>
            <div className={styles.summaryIcon}>
              <FaTimes />
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryNumber}>
                {incorrectList.length}
              </span>
              <span className={styles.summaryLabel}>Incorrectas</span>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.unanswered}`}>
            <div className={styles.summaryIcon}>
              <MdOutlineSpellcheck />
            </div>
            {unanswered === 0 && (
              <div className={styles.summaryContent}>
                <span className={styles.summaryNumber}>0</span>
                <span className={styles.summaryLabel}>Sin responder</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Estadísticas del Juego
      <motion.div className={styles.statsGrid} variants={itemVariants}>
        <div className={`${styles.statCard} ${styles.performanceCard}`}>
          <div className={styles.statIcon}>{performance.icon}</div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Rendimiento</span>
            <span
              className={`${styles.statValue} ${styles[performance.color]}`}
            >
              {performance.level}%
            </span>
          </div>
        </div>
      </motion.div> */}

      {/* Respuestas Correctas */}
      {correctList.length > 0 && (
        <motion.div className={styles.correctSection} variants={itemVariants}>
          <h4>
            <FaCheck /> Respuestas Correctas
          </h4>
          <div className={styles.answersList}>
            {correctList.map((item, index) => (
              <motion.div
                key={`correct-${index}`}
                className={`${styles.answerItem} ${styles.correctItem}`}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <div className={styles.answerHeader}>
                  <span className={styles.positionBadge}>
                    Oración {item.position}
                  </span>
                </div>
                <div className={styles.answerContent}>
                  <span className={styles.wordAnswer}>{item.word}</span>
                </div>
                <div className={styles.checkIcon}>✓</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Respuestas Incorrectas */}
      {incorrectList.length > 0 && (
        <motion.div className={styles.incorrectSection} variants={itemVariants}>
          <h4>
            <FaTimes /> Respuestas Incorrectas
          </h4>
          <div className={styles.answersList}>
            {incorrectList.map((item, index) => (
              <motion.div
                key={`incorrect-${index}`}
                className={`${styles.answerItem} ${styles.incorrectItem}`}
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <div className={styles.answerError}>
                  <div className={styles.answerHeader}>
                    <span className={styles.positionBadge}>
                      Oración {item.position}
                    </span>
                  </div>
                  <div className={styles.errorDetails}>
                    <div className={styles.yourAnswer}>
                      <span className={styles.errorLabel}>Tu respuesta:</span>
                      <span className={styles.errorWord}>
                        {item.userAnswer}
                      </span>
                    </div>
                    <div className={styles.correctAnswer}>
                      <span className={styles.errorLabel}>
                        Respuesta correcta:
                      </span>
                      <span className={styles.correctWord}>
                        {item.correctAnswer}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.errorIcon}>✗</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Oraciones Completas */}
      <motion.div className={styles.sentencesSection} variants={itemVariants}>
        <h4>Oraciones Completas</h4>
        <div className={styles.sentencesList}>
          {gameConfig?.sentences.map((sentence, index) => (
            <motion.div
              key={index}
              className={styles.sentenceCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.sentenceNumber}>{index + 1}.</div>
              <div className={styles.sentenceText}>
                {sentence.words.map((w) => w.word).join(" ")}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Consejos para Mejorar */}
      {!isGameWon && (
        <motion.div className={styles.tipsSection} variants={itemVariants}>
          <h4>
            <FaRegLightbulb /> Consejos para Mejorar
          </h4>
          <div className={styles.tipsList}>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <GiBrain />
              </span>
              <span>
                Lee la oración completa antes de intentar llenar los espacios
              </span>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <FaSearch />
              </span>
              <span>
                Busca pistas en el contexto de la oración para encontrar la
                palabra correcta
              </span>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <IoTimeOutline />
              </span>
              <span>
                Tómate tu tiempo para pensar en la palabra que mejor complete el
                sentido
              </span>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <GiBookshelf />
              </span>
              <span>Repasa las palabras que no acertaste</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DetailsCompletarOracionGame;
