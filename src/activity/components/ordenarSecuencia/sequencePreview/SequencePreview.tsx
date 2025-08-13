import type React from "react";
import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { FaPlay, FaRedo, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import type { SequenceEvent } from "../../../types/OrdenarSecuencia.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import styles from "./SequencePreview.module.css";

interface SequencePreviewProps {
  events: SequenceEvent[];
}

interface PreviewEvent extends SequenceEvent {
  currentPosition: number;
  isCorrect?: boolean;
}

const SequencePreview: React.FC<SequencePreviewProps> = ({ events }) => {
  const [previewEvents, setPreviewEvents] = useState<PreviewEvent[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<"win" | "lose" | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startPreview = () => {
    if (events.length < 2) return;

    const shuffledEvents = shuffleArray(events).map((event, index) => ({
      ...event,
      currentPosition: index + 1,
    }));

    setPreviewEvents(shuffledEvents);
    setIsPlaying(true);
    setGameResult(null);
  };

  const checkSequence = () => {
    const isCorrect = previewEvents.every(
      (event, index) => event.order === index + 1
    );

    if (isCorrect) {
      setGameResult("win");
      setIsPlaying(false);
    } else {
      setGameResult("lose");
      setIsPlaying(false);
      // Marcar eventos incorrectos
      const updatedEvents = previewEvents.map((event, index) => ({
        ...event,
        isCorrect: event.order === index + 1,
      }));
      setPreviewEvents(updatedEvents);

      // Limpiar marcas después de 2 segundos
      setTimeout(() => {
        setPreviewEvents((prev) =>
          prev.map((event) => ({ ...event, isCorrect: undefined }))
        );
      }, 2000);
    }
  };

  const resetPreview = () => {
    setPreviewEvents([]);
    setIsPlaying(false);
    setGameResult(null);
  };

  if (events.length === 0) {
    return (
      <Card className={styles.previewCard}>
        <div className={styles.emptyPreview}>
          <h3 className={styles.emptyTitle}>Vista Previa</h3>
          <p className={styles.emptyDescription}>
            Agregue eventos para ver la vista previa del juego
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.previewCard}>
      <div className={styles.previewHeader}>
        <h3 className={styles.previewTitle}>Vista Previa del Juego</h3>
        <div className={styles.previewStats}>
          <span className={styles.stat}>Eventos: {events.length}</span>
        </div>
      </div>

      {!isPlaying && gameResult === null && (
        <div className={styles.startSection}>
          <p className={styles.instructions}>
            Los estudiantes verán los eventos desordenados y deberán
            arrastrarlos para ponerlos en el orden correcto.
          </p>
          <Button
            variant="primary"
            onClick={startPreview}
            disabled={events.length < 2}
            className={styles.startButton}
          >
            <FaPlay />
            Iniciar Vista Previa
          </Button>
        </div>
      )}

      {isPlaying && (
        <div className={styles.gameSection}>
          <div className={styles.gameHeader}>
            <Button
              variant="outline"
              size="sm"
              onClick={checkSequence}
              className={styles.checkButton}
            >
              <FaCheckCircle />
              Verificar Orden
            </Button>
          </div>

          <div className={styles.instructions}>
            <p>Arrastra los eventos para ordenarlos correctamente:</p>
          </div>

          <Reorder.Group
            axis="y"
            values={previewEvents}
            onReorder={setPreviewEvents}
            className={styles.previewList}
          >
            {previewEvents.map((event, index) => (
              <Reorder.Item
                key={event.id}
                value={event}
                className={styles.previewItem}
                whileDrag={{ scale: 1.02, zIndex: 1000 }}
              >
                <motion.div
                  className={`${styles.previewEventCard} ${
                    event.isCorrect === true
                      ? styles.correct
                      : event.isCorrect === false
                      ? styles.incorrect
                      : ""
                  }`}
                  whileHover={{ y: -2 }}
                >
                  <div className={styles.eventPosition}>{index + 1}</div>

                  {event.imagePreview && (
                    <div className={styles.eventImageSmall}>
                      <img
                        src={event.imagePreview || "/placeholder.svg"}
                        alt={event.name}
                      />
                    </div>
                  )}

                  <div className={styles.eventContent}>
                    <h4 className={styles.eventTitle}>{event.name}</h4>
                    <p className={styles.eventDesc}>{event.description}</p>
                  </div>

                  {event.isCorrect !== undefined && (
                    <div className={styles.resultIcon}>
                      {event.isCorrect ? (
                        <FaCheckCircle className={styles.correctIcon} />
                      ) : (
                        <FaTimesCircle className={styles.incorrectIcon} />
                      )}
                    </div>
                  )}
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}

      {gameResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.resultSection}
        >
          <div className={`${styles.resultCard} ${styles[gameResult]}`}>
            <div className={styles.resultIcon}>
              {gameResult === "win" ? (
                <FaCheckCircle className={styles.winIcon} />
              ) : (
                <FaTimesCircle className={styles.loseIcon} />
              )}
            </div>
            <h3 className={styles.resultTitle}>
              {gameResult === "win"
                ? "¡Secuencia Correcta!"
                : "Secuencia Incorrecta"}
            </h3>
            <p className={styles.resultDescription}>
              {gameResult === "win"
                ? "Los eventos están en el orden correcto."
                : `Los eventos no estan en el orden correcto. Intenta de nuevo.`}
            </p>
            <Button
              variant="primary"
              onClick={resetPreview}
              className={styles.resetButton}
            >
              <FaRedo />
              Intentar Nuevamente
            </Button>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default SequencePreview;
