import { motion, type Variants } from "framer-motion";
import styles from "./DetailsDesafioClasificacionGame.module.css";
import { useDesafioClasificacionGame } from "@/shared";
import { getPerformanceLevel } from "../../../utils/performance";
import { HiOutlineFire } from "react-icons/hi";
import { PiSmileySad } from "react-icons/pi";
import {
  FaCheck,
  FaRegChartBar,
  FaRegFolder,
  FaRegLightbulb,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { GiBookshelf, GiBrain } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";

const DetailsDesafioClasificacionGame = () => {
  const { verificationResults, isGameWon, score, conceptsInCategories } =
    useDesafioClasificacionGame();

  const getAccuracyPercentage = () => {
    if (!verificationResults) return 0;
    return Math.round(
      (verificationResults.totalCorrect / verificationResults.totalConcepts) *
        100,
    );
  };

  const accuracy = getAccuracyPercentage();
  const performance = getPerformanceLevel(accuracy);

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
          <h3>{isGameWon ? `¡Juego Completado!` : "Juego Terminado"}</h3>
          <p className={styles.accuracyText}>
            Precisión: <strong>{getAccuracyPercentage()}%</strong>
          </p>
        </div>
        <div className={styles.scoreCircle}>
          <span className={styles.scoreNumber}>{score}</span>
          <span className={styles.scoreLabel}>pts</span>
        </div>
      </motion.div>
      {/* Resumen de Resultados */}
      <motion.div className={styles.summarySection} variants={itemVariants}>
        <h4>Resumen de Clasificación</h4>
        <div className={styles.summaryGrid}>
          <div className={`${styles.summaryCard} ${styles.correct}`}>
            <div className={styles.summaryIcon}>
              <FaCheck />
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryNumber}>
                {verificationResults?.totalCorrect || 0}
              </span>
              <span className={styles.summaryLabel}>Correctas</span>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.incorrect}`}>
            <div className={styles.summaryIcon}>
              <FaTimes />
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryNumber}>
                {verificationResults
                  ? verificationResults.totalConcepts -
                    verificationResults.totalCorrect
                  : 0}
              </span>
              <span className={styles.summaryLabel}>Incorrectas</span>
            </div>
          </div>

          <div className={`${styles.summaryCard} ${styles.total}`}>
            <div className={styles.summaryIcon}>
              <FaRegChartBar />
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryNumber}>
                {verificationResults?.totalConcepts || 0}
              </span>
              <span className={styles.summaryLabel}>Total</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas del Juego */}
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
      </motion.div>

      {/* Clasificaciones Correctas */}
      {verificationResults && verificationResults.correct.length > 0 && (
        <motion.div className={styles.correctSection} variants={itemVariants}>
          <h4>
            <FaCheck /> Clasificaciones Correctas
          </h4>
          <div className={styles.conceptsList}>
            {verificationResults.correct.map((item, index) => (
              <motion.div
                key={`correct-${index}`}
                className={`${styles.conceptItem} ${styles.correctItem}`}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <span className={styles.conceptName}>{item.concept}</span>
                <span className={styles.arrow}>→</span>
                <span className={styles.categoryName}>{item.category}</span>
                <div className={styles.checkIcon}>✓</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Clasificaciones Incorrectas */}
      {verificationResults && verificationResults.incorrect.length > 0 && (
        <motion.div className={styles.incorrectSection} variants={itemVariants}>
          <h4>
            <FaTimes /> Clasificaciones Incorrectas
          </h4>
          <div className={styles.conceptsList}>
            {verificationResults.incorrect.map((item, index) => (
              <motion.div
                key={`incorrect-${index}`}
                className={`${styles.conceptItem} ${styles.incorrectItem}`}
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <div className={styles.conceptError}>
                  <span className={styles.conceptName}>{item.concept}</span>
                  <div className={styles.errorDetails}>
                    <div className={styles.placedIn}>
                      <span className={styles.errorLabel}>Colocaste en:</span>
                      <span className={styles.errorCategory}>
                        {item.placedIn}
                      </span>
                    </div>
                    <div className={styles.shouldBe}>
                      <span className={styles.errorLabel}>Debería ser:</span>
                      <span className={styles.correctCategory}>
                        {item.shouldBe}
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

      {/* Estado Final de Categorías */}
      <motion.div className={styles.categoriesSection} variants={itemVariants}>
        <h4>
          <FaRegFolder /> Estado Final de las Categorías
        </h4>
        <div className={styles.categoriesGrid}>
          {Object.entries(conceptsInCategories).map(
            ([categoryId, concepts], index) => (
              <motion.div
                key={categoryId}
                className={styles.categoryCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.categoryHeader}>
                  <span className={styles.conceptCount}>
                    {concepts.length} conceptos
                  </span>
                </div>
                <div className={styles.conceptsInCategory}>
                  {concepts.length > 0 ? (
                    concepts.map((concept, conceptIndex) => (
                      <span key={conceptIndex} className={styles.conceptTag}>
                        {concept}
                      </span>
                    ))
                  ) : (
                    <span className={styles.emptyCategory}>Sin conceptos</span>
                  )}
                </div>
              </motion.div>
            ),
          )}
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
                Lee cuidadosamente cada concepto antes de clasificarlo
              </span>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <FaSearch />
              </span>
              <span>
                Busca palabras clave que te ayuden a identificar la categoría
                correcta
              </span>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <IoTimeOutline />
              </span>
              <span>
                Tómate tu tiempo para pensar antes de arrastrar cada concepto
              </span>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <GiBookshelf />
              </span>
              <span>Repasa los conceptos que clasificaste incorrectamente</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DetailsDesafioClasificacionGame;
