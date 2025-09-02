import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import {
  FaPlay,
  FaRedo,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";
import type { SequenceEvent } from "../../../types/OrdenarSecuencia.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import styles from "./OrdenarSecuenciaPreview.module.css";

interface OrdenarSecuenciaPreviewProps {
  events: SequenceEvent[];
}

interface PreviewEvent extends SequenceEvent {
  currentPosition: number;
  isCorrect?: boolean;
}

const OrdenarSecuenciaPreview: React.FC<OrdenarSecuenciaPreviewProps> = ({
  events,
}) => {
  const [previewEvents, setPreviewEvents] = useState<PreviewEvent[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<"win" | "lose" | null>(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h4 className={styles.title}>
              <FaEye className={styles.headerIcon} />
              Vista Previa de Actividad
              <span className={styles.tooltip}>
                <Tooltip content="Puedes probar el juego para verificar que funcione correctamente" />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Así es como verán la actividad tus estudiantes
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>📊</span>
            <div>
              <span className={styles.statLabel}>Eventos</span>
              <span className={styles.statValue}>{events.length}</span>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🎚️</span>
            <div>
              <span className={styles.statLabel}>Dificultad</span>
              <span className={styles.statValue}>
                {events.length <= 4
                  ? "Fácil"
                  : events.length <= 7
                  ? "Medio"
                  : "Difícil"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.previewCard}>
        <div className={styles.gameHeader}>
          <h4 className={styles.cardTitle}>Simulador de la Actividad</h4>
          <div className={styles.previewControls}>
            {(isPlaying || gameResult) && (
              <Button variant="secondary" onClick={resetPreview} size="sm">
                <FaRedo />
                Reiniciar
              </Button>
            )}
          </div>
        </div>

        {!isPlaying && gameResult === null && (
          <div className={styles.startSection}>
            <p className={styles.instructions}>
              Los estudiantes verán los eventos desordenados y deberán
              arrastrarlos para ponerlos en el orden cronológico correcto.
            </p>
            <Button
              variant="primary"
              onClick={startPreview}
              disabled={events.length < 2}
              className={styles.startButton}
            >
              <FaPlay />
              Iniciar Simulación
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
      </div>
    </motion.div>
  );
};

export default OrdenarSecuenciaPreview;
