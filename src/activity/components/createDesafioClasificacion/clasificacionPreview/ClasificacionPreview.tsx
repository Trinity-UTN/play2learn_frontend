import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaRedo,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaTrophy,
} from "react-icons/fa";
import type {
  ClassificationCategory,
  ClassificationConcept,
} from "../../../types/DesafioClasificacion.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import styles from "./ClasificacionPreview.module.css";

interface ClassificationPreviewProps {
  categories: ClassificationCategory[];
  onClose: () => void;
}

interface GameConcept extends ClassificationConcept {
  isPlaced: boolean;
  currentCategoryId?: string;
}

const ClassificationPreview: React.FC<ClassificationPreviewProps> = ({
  categories,
  onClose,
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [shuffledConcepts, setShuffledConcepts] = useState<GameConcept[]>([]);
  const [gameCategories, setGameCategories] = useState<
    ClassificationCategory[]
  >([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{
    [key: string]: "correct" | "incorrect" | null;
  }>({});

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    // Crear conceptos mezclados
    const allConcepts: GameConcept[] = categories.flatMap((category) =>
      category.concepts.map((concept) => ({
        ...concept,
        isPlaced: false,
      }))
    );

    setShuffledConcepts(shuffleArray(allConcepts));

    // Crear categorías vacías para el juego
    const emptyCats = categories.map((category) => ({
      ...category,
      concepts: [],
    }));

    setGameCategories(emptyCats);
    setGameStatus("playing");
    setScore(0);
    setFeedback({});
    setGameStarted(true);
  };

  const handleConceptDrop = (conceptId: string, targetCategoryId: string) => {
    const concept = shuffledConcepts.find((c) => c.id === conceptId);
    if (!concept || concept.isPlaced) return;

    // Marcar concepto como colocado
    setShuffledConcepts((prev) =>
      prev.map((c) =>
        c.id === conceptId
          ? { ...c, isPlaced: true, currentCategoryId: targetCategoryId }
          : c
      )
    );

    // Agregar concepto a la categoría
    setGameCategories((prev) =>
      prev.map((category) =>
        category.id === targetCategoryId
          ? {
              ...category,
              concepts: [...category.concepts, concept],
            }
          : category
      )
    );
  };

  const handleConceptRemove = (conceptId: string, fromCategoryId: string) => {
    // Remover de la categoría
    setGameCategories((prev) =>
      prev.map((category) =>
        category.id === fromCategoryId
          ? {
              ...category,
              concepts: category.concepts.filter((c) => c.id !== conceptId),
            }
          : category
      )
    );

    // Marcar como no colocado
    setShuffledConcepts((prev) =>
      prev.map((c) =>
        c.id === conceptId
          ? { ...c, isPlaced: false, currentCategoryId: undefined }
          : c
      )
    );
  };

  const checkAnswers = () => {
    let correctCount = 0;
    const newFeedback: { [key: string]: "correct" | "incorrect" | null } = {};

    gameCategories.forEach((gameCategory) => {
      const originalCategory = categories.find((c) => c.id === gameCategory.id);
      if (!originalCategory) return;

      const originalConceptIds = originalCategory.concepts.map((c) => c.id);

      gameCategory.concepts.forEach((concept) => {
        const isCorrect = originalConceptIds.includes(concept.id);
        newFeedback[concept.id] = isCorrect ? "correct" : "incorrect";
        if (isCorrect) correctCount++;
      });
    });

    setFeedback(newFeedback);

    const totalConcepts = categories.reduce(
      (total, cat) => total + cat.concepts.length,
      0
    );
    const newScore = Math.round((correctCount / totalConcepts) * 100);
    setScore(newScore);

    if (correctCount === totalConcepts) {
      setGameStatus("won");
    } else {
      setGameStatus("lost");
      // Permitir otro intento
      setTimeout(() => {
        setFeedback({});
      }, 2000);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  const allConceptsPlaced = shuffledConcepts.every(
    (concept) => concept.isPlaced
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.overlay}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={styles.container}
      >
        <Card className={styles.previewCard}>
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h2 className={styles.title}>
                Vista Previa - Clasificar Conceptos
              </h2>
              <p className={styles.subtitle}>
                Así es como los estudiantes verán y jugarán esta actividad
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={onClose}
              className={styles.closeButton}
            >
              <FaTimes />
            </Button>
          </div>

          {!gameStarted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.startScreen}
            >
              <div className={styles.gameInfo}>
                <h3 className={styles.gameTitle}>Clasificar Conceptos</h3>
                <p className={styles.gameDescription}>
                  Arrastra cada concepto a la categoría correcta
                </p>

                <div className={styles.gameStats}>
                  <div className={styles.gameStat}>
                    <span className={styles.gameStatNumber}>
                      {categories.length}
                    </span>
                    <span className={styles.gameStatLabel}>Categorías</span>
                  </div>
                  <div className={styles.gameStat}>
                    <span className={styles.gameStatNumber}>
                      {categories.reduce(
                        (total, cat) => total + cat.concepts.length,
                        0
                      )}
                    </span>
                    <span className={styles.gameStatLabel}>Conceptos</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={initializeGame}
                  className={styles.startButton}
                >
                  <FaPlay />
                  Comenzar Juego
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className={styles.gameArea}>
              <div className={styles.gameHeader}>
                <div className={styles.gameProgress}>
                  {score > 0 && (
                    <div className={styles.score}>
                      <FaTrophy className={styles.trophyIcon} />
                      <span>{score}% correcto</span>
                    </div>
                  )}
                </div>

                <div className={styles.gameActions}>
                  <Button
                    variant="secondary"
                    onClick={resetGame}
                    className={styles.resetButton}
                  >
                    <FaRedo />
                    Reiniciar
                  </Button>

                  {allConceptsPlaced && gameStatus === "playing" && (
                    <Button
                      variant="primary"
                      onClick={checkAnswers}
                      className={styles.checkButton}
                    >
                      <FaCheck />
                      Verificar Respuestas
                    </Button>
                  )}
                </div>
              </div>

              <div className={styles.gameContent}>
                <div className={styles.conceptsPool}>
                  <h4 className={styles.poolTitle}>
                    Conceptos para clasificar (
                    {shuffledConcepts.filter((c) => !c.isPlaced).length})
                  </h4>

                  <div className={styles.conceptsList}>
                    <AnimatePresence>
                      {shuffledConcepts
                        .filter((concept) => !concept.isPlaced)
                        .map((concept) => (
                          <motion.div
                            key={concept.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            drag
                            dragConstraints={{
                              left: 0,
                              right: 0,
                              top: 0,
                              bottom: 0,
                            }}
                            whileDrag={{ scale: 1.05, zIndex: 1000 }}
                            className={`${styles.conceptChip} ${
                              feedback[concept.id] === "correct"
                                ? styles.correct
                                : feedback[concept.id] === "incorrect"
                                ? styles.incorrect
                                : ""
                            }`}
                            onDragEnd={(event, info) => {
                              // Lógica simple de drop - en una implementación real usarías una librería como react-dnd
                              const element = document.elementFromPoint(
                                info.point.x,
                                info.point.y
                              );
                              const categoryElement =
                                element?.closest("[data-category-id]");
                              if (categoryElement) {
                                const categoryId =
                                  categoryElement.getAttribute(
                                    "data-category-id"
                                  );
                                if (categoryId) {
                                  handleConceptDrop(concept.id, categoryId);
                                }
                              }
                            }}
                          >
                            {concept.name}
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className={styles.categoriesGrid}>
                  {gameCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      className={styles.categoryDropZone}
                      data-category-id={category.id}
                      style={{ borderColor: category.color }}
                    >
                      <div
                        className={styles.categoryHeader}
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <h4 className={styles.categoryName}>{category.name}</h4>
                        <Badge variant="secondary">
                          {category.concepts.length} conceptos
                        </Badge>
                      </div>

                      <div className={styles.categoryContent}>
                        <AnimatePresence>
                          {category.concepts.map((concept) => (
                            <motion.div
                              key={concept.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className={`${styles.placedConcept} ${
                                feedback[concept.id] === "correct"
                                  ? styles.correct
                                  : feedback[concept.id] === "incorrect"
                                  ? styles.incorrect
                                  : ""
                              }`}
                              onClick={() =>
                                handleConceptRemove(concept.id, category.id)
                              }
                            >
                              {concept.name}
                              {feedback[concept.id] === "correct" && (
                                <FaCheck className={styles.feedbackIcon} />
                              )}
                              {feedback[concept.id] === "incorrect" && (
                                <FaTimes className={styles.feedbackIcon} />
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {category.concepts.length === 0 && (
                          <div className={styles.emptyCategory}>
                            Arrastra conceptos aquí
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {gameStatus === "won" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={styles.gameResult}
                  >
                    <div className={styles.winMessage}>
                      <FaTrophy className={styles.winIcon} />
                      <h3>¡Excelente trabajo!</h3>
                      <p>Has clasificado todos los conceptos correctamente</p>
                      <p className={styles.finalScore}>Puntuación: {score}%</p>
                    </div>
                  </motion.div>
                )}

                {gameStatus === "lost" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={styles.gameResult}
                  >
                    <div className={styles.loseMessage}>
                      <FaExclamationTriangle className={styles.loseIcon} />
                      <h3>Juego terminado</h3>
                      <p>Has clasificado todos los conceptos incorrectamente</p>
                      <p className={styles.finalScore}>
                        Puntuación final: {score}%
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ClassificationPreview;
