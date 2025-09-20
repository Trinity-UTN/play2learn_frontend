import { FaCheck, FaTrophy, FaExclamationTriangle } from "react-icons/fa";
import Button from "../../Button/ButtonComponent";
import { useDesafioClasificacionGame } from "../../../hooks/games/useDesafioClasificacionGame";
import styles from "./DesafioClasificacionGame.module.css";
import { useEffect } from "react";

interface DesafioClasificacionGameProps {
  mode?: "preview" | "student";
}
const DesafioClasificacionGame = ({ mode }: DesafioClasificacionGameProps) => {
  const {
    gameConfig,
    availableConcepts,
    handleDragOver,
    handleDropToPool,
    handleDragStart,
    handleDrop,
    conceptsInCategories,
    verifyAnswers,
    gameStatus,
    verificationResults,
    score,
    startGame,
    gameStarted,
  } = useDesafioClasificacionGame();

  useEffect(() => {
    if (!gameStarted) {
      startGame();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.decisionsSection}>
        <div className={styles.decisionsSectionHeader}>
          <h6 className={styles.decisionsSectionTitle}>
            Conceptos para clasificar
          </h6>
          <div className={styles.decisionsInfo}>
            <span>{availableConcepts.length} restantes</span>
          </div>
        </div>

        <div
          className={styles.conceptsPool}
          onDragOver={handleDragOver}
          onDrop={handleDropToPool}
        >
          <div className={styles.conceptsList} data-testid="pool">
            {availableConcepts.map((concept, index) => (
              <div
                key={index}
                className={styles.conceptChip}
                draggable
                onDragStart={(e) => handleDragStart(e, concept)}
              >
                {concept}
              </div>
            ))}
            {availableConcepts.length === 0 && (
              <div className={styles.emptyPool}>
                Todos los conceptos han sido clasificados
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.decisionsGrid}>
        {gameConfig?.categories.map((category, idx) => (
          <div
            key={category.id}
            className={styles.decisionOption}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category.id)}
            data-testid={`categoria-${category.name}`}
          >
            <div className={styles.optionHeader}>
              <div className={styles.optionNumber}>{idx + 1 || 0}</div>
            </div>
            <div className={styles.optionContent}>
              <h6 className={styles.categoryName}>{category.name}</h6>
              <div className={styles.categoryDropZone}>
                {conceptsInCategories[category.id]?.length > 0 ? (
                  <div className={styles.droppedConcepts}>
                    {conceptsInCategories[category.id].map((concept, index) => (
                      <div
                        key={index}
                        className={styles.droppedConcept}
                        draggable
                        onDragStart={(e) => handleDragStart(e, concept)}
                      >
                        {concept}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyCategory}>
                    Arrastra conceptos aquí
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {mode === "preview" && (
        <div className={styles.completedActions}>
          <Button
            variant="primary"
            onClick={verifyAnswers}
            className={styles.tryAgainButton}
            disabled={availableConcepts.length !== 0}
          >
            <FaCheck />
            Verificar Respuestas
          </Button>
        </div>
      )}

      {gameStatus !== "playing" &&
        verificationResults &&
        mode === "preview" && (
          <div className={styles.resultSection}>
            <div
              className={`${styles.resultCard} ${
                gameStatus === "won" ? styles.approved : styles.rejected
              }`}
            >
              <div className={styles.resultHeader}>
                {gameStatus === "won" ? (
                  <FaTrophy className={styles.resultIcon} />
                ) : (
                  <FaExclamationTriangle className={styles.resultIcon} />
                )}
                <h5 className={styles.resultTitle}>
                  {gameStatus === "won"
                    ? "¡Excelente trabajo!"
                    : "¡Sigue intentando!"}
                </h5>
              </div>
              <div className={styles.resultContent}>
                <p className={styles.resultText}>
                  {gameStatus === "won"
                    ? "Has clasificado correctamente los conceptos"
                    : "Puedes mejorar tu clasificación"}
                </p>
                <div className={styles.verificationDetails}>
                  <div className={styles.verificationSummary}>
                    <span className={styles.correctCount}>
                      ✅ Correctos: {verificationResults.totalCorrect}
                    </span>
                    <span className={styles.incorrectCount}>
                      ❌ Incorrectos: {verificationResults.incorrect.length}
                    </span>
                  </div>

                  {verificationResults.incorrect.length > 0 && (
                    <div className={styles.incorrectDetails}>
                      <h6>Conceptos mal clasificados:</h6>
                      <ul>
                        {verificationResults.incorrect.map((item, index) => (
                          <li key={index}>
                            <strong>{item.concept}</strong> → Colocado en "
                            {item.placedIn}", debería estar en "{item.shouldBe}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.resultFooter}>
                <div
                  className={
                    gameStatus === "won"
                      ? styles.successBadge
                      : styles.failureBadge
                  }
                >
                  <span>Puntuación: {score}%</span>
                </div>
                <span>Esta informacion no sera visualizada por el alumno</span>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default DesafioClasificacionGame;
