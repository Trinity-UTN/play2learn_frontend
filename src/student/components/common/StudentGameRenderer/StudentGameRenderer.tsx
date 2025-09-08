import type { CurrentActivityInterface } from "../../../types/Activity.type";
import AhorcadoGame from "../../../../shared/components/Games/Ahorcado/AhorcadoGame";
import styles from "./StudentGameRenderer.module.css";

interface GameRendererProps {
  currentActivity: CurrentActivityInterface | null;
}

const StudentGameRenderer: React.FC<GameRendererProps> = ({
  currentActivity,
}) => {
  const renderGame = () => {
    if (!currentActivity) {
      return (
        <div className={styles.noGameContainer}>
          <p>No se pudo cargar el juego</p>
        </div>
      );
    }

    // Determinar qué juego renderizar basado en currentActivity.name. TODO: Agregar todos los juegos
    switch (currentActivity.name?.toLowerCase()) {
      case "ahorcado":
      case "ahorcado educativo":
      case "hangman":
        return renderAhorcadoGame();
      default:
        return (
          <div className={styles.unsupportedGameContainer}>
            <h3>Juego no soportado</h3>
            <p>El juego "{currentActivity.name}" aún no está disponible.</p>
          </div>
        );
    }
  };

  const renderAhorcadoGame = () => {
    return <AhorcadoGame mode="student" />;
  };

  return <div className={styles.gameRenderer}>{renderGame()}</div>;
};

export default StudentGameRenderer;
