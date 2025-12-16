import type { CurrentActivityInterface } from "../../../types/Activity.type";
import {
  AhorcadoGame,
  GameType,
  getGameTypeFromActivityName,
  CompletarOracionGame,
  DesafioClasificacionGame,
  PreguntadosGame,
  NoLudicaGame,
} from "@/shared";

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

    // EXPO: Registry Pattern: Determinar el tipo de juego usando el helper
    const gameType = getGameTypeFromActivityName(currentActivity.name);

    if (!gameType) {
      return (
        <div className={styles.unsupportedGameContainer}>
          <h3>Juego no disponible</h3>
          <p>El juego "{currentActivity.name}" aún no está disponible.</p>
        </div>
      );
    }

    // EXPO: Registry Pattern: Factory pattern para renderizar componentes
    return renderGameComponent(gameType);
  };

  const renderGameComponent = (gameType: GameType) => {
    // EXPO: Factory pattern para componentes de juego
    switch (gameType) {
      case GameType.AHORCADO:
        return <AhorcadoGame mode="student" />;
      case GameType.CLASIFICACION:
        return <DesafioClasificacionGame />;
      case GameType.COMPLETAR_ORACION:
        return <CompletarOracionGame mode="student" />;
      case GameType.PREGUNTADOS:
        return <PreguntadosGame mode="student" />;
      case GameType.NO_LUDICA:
        return <NoLudicaGame mode="student" />;

      default:
        return (
          <div className={styles.unsupportedGameContainer}>
            <h3>Juego en desarrollo</h3>
            <p>El juego "{gameType}" está siendo implementado.</p>
          </div>
        );
    }
  };

  return <div className={styles.gameRenderer}>{renderGame()}</div>;
};

export default StudentGameRenderer;
