import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRedo,
  FaClock,
  FaPuzzlePiece,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import { useCreateMemorama } from "../../../hooks/useCreateMemorama";
import styles from "./MemoramaPreview.module.css";

const MemoramaPreview: React.FC = () => {
  const { pairs, config } = useCreateMemorama();
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [showAllCards, setShowAllCards] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Crear array de cartas (cada pareja se duplica)
  const createCards = () => {
    const cards: Array<{
      id: number;
      pairIndex: number;
      type: "concept" | "image";
      content: string | File;
    }> = [];

    pairs.forEach((pair, pairIndex) => {
      if (pair.concept && pair.image) {
        cards.push({
          id: pairIndex * 2,
          pairIndex,
          type: "concept",
          content: pair.concept,
        });
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
    if (showAllCards) return;

    if (flippedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstCardId);
      const secondCard = cards.find((c) => c.id === secondCardId);

      if (
        firstCard &&
        secondCard &&
        firstCard.pairIndex === secondCard.pairIndex
      ) {
        // Es una pareja correcta
        setTimeout(() => {
          setMatchedPairs((prev) => [...prev, firstCardId, secondCardId]);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No es pareja, voltear de nuevo
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedPairs([]);
    setShowAllCards(false);
  };

  const toggleShowAll = () => {
    setShowAllCards(!showAllCards);
    if (!showAllCards) {
      setFlippedCards([]);
    }
  };

  const isCardVisible = (cardId: number) => {
    return (
      showAllCards ||
      flippedCards.includes(cardId) ||
      matchedPairs.includes(cardId)
    );
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      {/* Header de preview */}
      <Card className={styles.previewHeader}>
        <h3 className={styles.sectionTitle}>Vista Previa de la Actividad</h3>
        <p className={styles.description}>
          Así es como verán la actividad tus estudiantes. Puedes probar el
          memorama haciendo clic en las cartas.
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{pairs.length}</span>
            <span className={styles.statLabel}>
              Pareja{pairs.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>
              {Math.ceil(config.maxTimeInSeconds / 60)}
            </span>
            <span className={styles.statLabel}>Minutos</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{pairs.length * 2}</span>
            <span className={styles.statLabel}>Cartas</span>
          </div>
        </div>
      </Card>

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

      {pairs.length > 0 && (
        <Card className={styles.gameContainer}>
          <div className={styles.gameHeader}>
            <div className={styles.gameTitle}>
              <FaPuzzlePiece className={styles.gameIcon} />
              <span>Memorama</span>
            </div>
            <div className={styles.timeIndicator}>
              <FaClock className={styles.timeIcon} />
              <span>{Math.ceil(config.maxTimeInSeconds / 60)} minutos</span>
            </div>
          </div>

          <div className={styles.gameBoard}>
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className={`${styles.card} ${
                  matchedPairs.includes(card.id)
                    ? styles.matched
                    : flippedCards.includes(card.id) || showAllCards
                    ? styles.flipped
                    : styles.hidden
                }`}
                onClick={() => handleCardClick(card.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.cardContent}>
                  {isCardVisible(card.id) ? (
                    card.type === "concept" ? (
                      <span className={styles.conceptText}>
                        {card.content as string}
                      </span>
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
                    )
                  ) : (
                    <div className={styles.cardBack}>
                      <FaPuzzlePiece className={styles.cardBackIcon} />
                    </div>
                  )}
                </div>
              </motion.div>
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
                Has completado el memorama encontrando todas las parejas.
              </p>
            </motion.div>
          )}
        </Card>
      )}
    </motion.div>
  );
};

export default MemoramaPreview;
