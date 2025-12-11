import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRedo,
  FaPuzzlePiece,
  FaEye,
  FaEyeSlash,
  FaClone,
} from "react-icons/fa";
import { Button, Card, Tooltip } from "@/shared";
import { useCreateMemorama } from "../../../hooks/useCreateMemorama";
import styles from "./MemoramaPreview.module.css";

const MemoramaPreview: React.FC = () => {
  const { pairs } = useCreateMemorama();

  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [showAllCards, setShowAllCards] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const createCards = () => {
    const cards: Array<{
      id: number;
      pairIndex: number;
      type: "concept" | "image";
      content: string | File;
    }> = [];

    pairs.forEach((pair, pairIndex) => {
      if (pair.concept.trim() && pair.image) {
        // Carta con concepto
        cards.push({
          id: pairIndex * 2,
          pairIndex,
          type: "concept",
          content: pair.concept,
        });

        // Carta con imagen
        cards.push({
          id: pairIndex * 2 + 1,
          pairIndex,
          type: "image",
          content: pair.image,
        });
      }
    });

    // Mezclar las cartas
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards] = useState(createCards());

  const handleCardClick = (cardId: number) => {
    if (showAllCards || isEvaluating) return;

    if (flippedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return;
    }

    if (flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstCardId);
      const secondCard = cards.find((c) => c.id === secondCardId);

      setIsEvaluating(true);

      setTimeout(() => {
        if (
          firstCard &&
          secondCard &&
          firstCard.pairIndex === secondCard.pairIndex &&
          firstCard.type !== secondCard.type
        ) {
          // Es una pareja correcta
          setMatchedPairs((prev) => [...prev, firstCardId, secondCardId]);
          setFlippedCards([]);
        } else {
          // No es pareja, voltear de nuevo
          setFlippedCards([]);
        }
        setIsEvaluating(false);
      }, 1200);
    }
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedPairs([]);
    setShowAllCards(false);
    setIsEvaluating(false);
  };

  const toggleShowAll = () => {
    if (isEvaluating) return;

    setShowAllCards(!showAllCards);
    if (!showAllCards) {
      setFlippedCards([]);
    }
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
                <Tooltip content="Encuentra las parejas de conceptos con sus imágenes correspondientes." />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Así es como verán la actividad tus estudiantes.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <FaPuzzlePiece className={styles.statIconMain} />
            <div>
              <span className={styles.statLabel}>
                Pareja{pairs.length !== 1 ? "s" : ""}
              </span>
              <span className={styles.statValue}>{pairs.length}</span>
            </div>
          </div>
          <div className={styles.stat}>
            <FaClone className={styles.statIconCartas} />
            <div>
              <span className={styles.statLabel}>Cartas</span>
              <span className={styles.statValue}>{pairs.length * 2}</span>
            </div>
          </div>
        </div>
      </div>

      {pairs.length > 0 && (
        <Card className={styles.gameContainer}>
          <div className={styles.gameHeader}>
            <div className={styles.gameTitle}>
              <FaPuzzlePiece className={styles.gameIcon} />
              <span>Memorama</span>
            </div>
          </div>

          <div className={styles.gameBoard}>
            {cards.map((card) => (
              <div
                key={card.id}
                className={`${styles.card} ${
                  matchedPairs.includes(card.id)
                    ? styles.matched
                    : flippedCards.includes(card.id) || showAllCards
                    ? styles.flipped
                    : styles.hidden
                } ${
                  isEvaluating && flippedCards.includes(card.id)
                    ? styles.evaluating
                    : ""
                }`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardBack}>
                    <FaPuzzlePiece className={styles.cardBackIcon} />
                  </div>
                </div>
                <div className={styles.cardContent}>
                  {card.type === "concept" ? (
                    <div className={styles.cardConcept}>
                      <span className={styles.conceptText}>
                        {card.content as string}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={
                        card.content instanceof File
                          ? URL.createObjectURL(card.content)
                          : "/placeholder.svg"
                      }
                      alt="Imagen del memorama"
                      className={styles.cardImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "/placeholder.svg?height=80&width=80&text=Error";
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Estadísticas del juego */}
          <div className={styles.gameStats}>
            <span>
              Parejas encontradas: {matchedPairs.length / 2} / {pairs.length}
            </span>
            <span>•</span>
            <span>Cartas volteadas: {flippedCards.length}</span>
          </div>

          {matchedPairs.length === pairs.length * 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.completionMessage}
            >
              <h3 className={styles.completionTitle}>¡Felicidades! 🎉</h3>
              <p className={styles.completionText}>
                Has completado el memorama encontrando todas las parejas de
                conceptos con sus imágenes.
              </p>
            </motion.div>
          )}
        </Card>
      )}
      {/* Controles de preview */}
      <div className={styles.previewControls}>
        <Button variant="secondary" onClick={resetGame} size="sm">
          <FaRedo />
          Reiniciar
        </Button>
        <Button
          variant={showAllCards ? "danger" : "primary"}
          onClick={toggleShowAll}
          size="sm"
        >
          {showAllCards ? <FaEyeSlash /> : <FaEye />}
          {showAllCards ? "Ocultar" : "Mostrar"} Todas
        </Button>
      </div>
    </motion.div>
  );
};

export default MemoramaPreview;
