import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEye,
  FaPlay,
  FaRedo,
  FaCheck,
  FaTrophy,
  FaExclamationTriangle,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import { useCreateDesafioClasificacion } from "../../../hooks/useCreateDesafioClasificacion";
import styles from "./ClasificacionPreview.module.css";

const ClasificacionPreview: React.FC = () => {
  const { config, getAllConcepts } = useCreateDesafioClasificacion();
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [draggedConcept, setDraggedConcept] = useState<string | null>(null);
  const [conceptsInCategories, setConceptsInCategories] = useState<{
    [key: string]: string[];
  }>({});
  const [availableConcepts, setAvailableConcepts] = useState<string[]>([]);
  const [verificationResults, setVerificationResults] = useState<{
    correct: { concept: string; category: string }[];
    incorrect: { concept: string; placedIn: string; shouldBe: string }[];
    totalCorrect: number;
    totalConcepts: number;
  } | null>(null);

  const totalCategories = config.categories.length;
  const totalConcepts = getAllConcepts().length;
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameStatus("playing");
    const allConcepts = getAllConcepts();
    setAvailableConcepts([...allConcepts]);
    setConceptsInCategories({});
    setVerificationResults(null);
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setGameStatus("playing");
    setAvailableConcepts([]);
    setConceptsInCategories({});
    setVerificationResults(null);
  };

  const verifyAnswers = () => {
    const correct: { concept: string; category: string }[] = [];
    const incorrect: { concept: string; placedIn: string; shouldBe: string }[] =
      [];

    // Create a map of concept to its correct category
    const conceptToCategoryMap: { [concept: string]: string } = {};
    config.categories.forEach((category) => {
      category.concepts.forEach((concept) => {
        conceptToCategoryMap[concept.name.toLowerCase()] = category.name;
      });
    });

    // Check each placed concept
    Object.keys(conceptsInCategories).forEach((categoryId) => {
      const category = config.categories.find((cat) => cat.id === categoryId);
      if (!category) return;

      conceptsInCategories[categoryId].forEach((placedConcept) => {
        const correctCategory =
          conceptToCategoryMap[placedConcept.toLowerCase()];

        if (correctCategory === category.name) {
          correct.push({
            concept: placedConcept,
            category: category.name,
          });
        } else {
          incorrect.push({
            concept: placedConcept,
            placedIn: category.name,
            shouldBe: correctCategory,
          });
        }
      });
    });

    const totalPlacedConcepts = correct.length + incorrect.length;
    const calculatedScore =
      totalPlacedConcepts > 0
        ? Math.round((correct.length / totalPlacedConcepts) * 100)
        : 0;

    const results = {
      correct,
      incorrect,
      totalCorrect: correct.length,
      totalConcepts: totalPlacedConcepts,
    };

    setVerificationResults(results);
    setScore(calculatedScore);
    setGameStatus(calculatedScore >= 70 ? "won" : "lost");
  };

  const handleDragStart = (e: React.DragEvent, concept: string) => {
    setDraggedConcept(concept);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    if (!draggedConcept) return;

    // Remove concept from available concepts
    setAvailableConcepts((prev) => prev.filter((c) => c !== draggedConcept));

    // Add concept to category
    setConceptsInCategories((prev) => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), draggedConcept],
    }));

    setDraggedConcept(null);
  };

  const handleDropToPool = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedConcept) return;

    // Find which category the concept was in
    const categoryWithConcept = Object.keys(conceptsInCategories).find(
      (categoryId) => conceptsInCategories[categoryId].includes(draggedConcept)
    );

    if (categoryWithConcept) {
      // Remove from category
      setConceptsInCategories((prev) => ({
        ...prev,
        [categoryWithConcept]: prev[categoryWithConcept].filter(
          (c) => c !== draggedConcept
        ),
      }));

      // Add back to available concepts
      setAvailableConcepts((prev) => [...prev, draggedConcept]);
    }

    setDraggedConcept(null);
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h4 className={styles.title}>
              <FaEye className={styles.headerIcon} />
              Vista Previa de Actividad
              <span className={styles.tooltip}>
                <Tooltip content="Los conceptos se mostrarán mezclados para clasificarlos" />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Así verán la actividad tus estudiantes
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>📂</span>
            <div>
              <span className={styles.statLabel}>Categorías</span>
              <span className={styles.statValue}>{totalCategories}</span>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🏷️</span>
            <div>
              <span className={styles.statLabel}>Conceptos totales</span>
              <span className={styles.statValue}>{totalConcepts}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.simulatorContainer}>
        <div className={styles.simulatorHeader}>
          <div className={styles.simulatorTitle}>
            <FaEye className={styles.simulatorIcon} />
            <h4>Desafío de Clasificación</h4>
          </div>
          <Button
            variant="secondary"
            onClick={resetGame}
            className={styles.resetButton}
          >
            <FaRedo />
            Reiniciar
          </Button>
        </div>

        {!gameStarted ? (
          <div className={styles.scenarioCard}>
            <div className={styles.scenarioHeader}>
              <h5 className={styles.scenarioTitle}>Clasificar Conceptos</h5>
            </div>
            <div className={styles.scenarioContent}>
              <p className={styles.scenarioText}>
                Arrastra cada concepto a la categoría correcta. ¡Demuestra tu
                conocimiento!
              </p>

              <div className={styles.pathSection}>
                <h6 className={styles.pathTitle}>Categorías disponibles:</h6>
                <div className={styles.pathList}>
                  {config.categories.map((category, index) => (
                    <div key={category.id} className={styles.pathItem}>
                      <div className={styles.pathNumber}>{index + 1}</div>
                      <span className={styles.pathText}>
                        {category.name} ({category.concepts.length} conceptos)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.completedActions}>
                <Button
                  variant="primary"
                  onClick={startGame}
                  className={styles.tryAgainButton}
                >
                  <FaPlay />
                  Comenzar Actividad
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
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
                <div className={styles.conceptsList}>
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
              {config.categories.map((category) => (
                <div
                  key={category.id}
                  className={styles.decisionOption}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, category.id)}
                >
                  <div className={styles.optionHeader}>
                    <div className={styles.optionNumber}>
                      {conceptsInCategories[category.id]?.length || 0}
                    </div>
                    <div className={styles.optionIcon}>📂</div>
                  </div>
                  <div className={styles.optionContent}>
                    <h6 className={styles.categoryName}>{category.name}</h6>
                    <div className={styles.categoryDropZone}>
                      {conceptsInCategories[category.id]?.length > 0 ? (
                        <div className={styles.droppedConcepts}>
                          {conceptsInCategories[category.id].map(
                            (concept, index) => (
                              <div
                                key={index}
                                className={styles.droppedConcept}
                                draggable
                                onDragStart={(e) => handleDragStart(e, concept)}
                              >
                                {concept}
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className={styles.emptyCategory}>
                          Arrastra conceptos aquí
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.optionFooter}>
                    <div className={styles.optionStatus}>
                      <span className={styles.statusIcon}>✓</span>
                      <span>Listo para clasificar</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {availableConcepts.length === 0 && (
              <div className={styles.completedActions}>
                <Button
                  variant="primary"
                  onClick={verifyAnswers}
                  className={styles.tryAgainButton}
                >
                  <FaCheck />
                  Verificar Respuestas
                </Button>
              </div>
            )}

            {gameStatus !== "playing" && verificationResults && (
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
                            {verificationResults.incorrect.map(
                              (item, index) => (
                                <li key={index}>
                                  <strong>{item.concept}</strong> → Colocado en
                                  "{item.placedIn}", debería estar en "
                                  {item.shouldBe}"
                                </li>
                              )
                            )}
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
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ClasificacionPreview;
