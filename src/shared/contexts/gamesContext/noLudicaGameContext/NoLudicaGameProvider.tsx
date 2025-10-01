import { useEffect, useState, type ReactNode } from "react";
import { NoLudicaGameContext } from "./NoLudicaGameContext";
import type { NoLudicaGameContextType } from "./NoLudicaGameContext.type";
import type { NoLudicaConfig } from "../../../../activity/types/NoLudica.type";
import { useActivityStudent } from "../../../../student/hooks/useActivityStudentAPI";
import { useCreateNoLudica } from "../../../../activity/hooks/useCreateNoLudica";
import { getGameTypeFromActivityName } from "../../../registry/games/gameMapping";
import { GameType } from "../../../types/Games.type";
interface NoLudicaGameProviderProps {
  children: ReactNode;
  config?: NoLudicaConfig;
  mode?: "preview" | "student";
}
export const NoLudicaGameProvider: React.FC<NoLudicaGameProviderProps> = ({
  children,
  config: propConfig,
  mode = "preview",
}) => {
  const { config } = useCreateNoLudica();
  const { currentActivity } = useActivityStudent();
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(true);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [gameConfig, setGameConfig] = useState<NoLudicaConfig | null>(null);

  useEffect(() => {
    if (mode === "preview" && config) {
      setGameConfig({
        excercise: config.excercise,
        tipoEntrega: config.tipoEntrega,
      });
    } else if (mode === "student" && currentActivity) {
      const gameType = getGameTypeFromActivityName(currentActivity.name);

      if (gameType === GameType.NO_LUDICA) {
        const noLudicaConfig = currentActivity.gameConfig as NoLudicaConfig;

        setGameConfig({
          excercise: noLudicaConfig.excercise,
          tipoEntrega: noLudicaConfig.tipoEntrega,
        });
      }
    } else if (propConfig) {
      setGameConfig(propConfig);
    }
  }, [mode, propConfig, config, currentActivity]);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };
  const value: NoLudicaGameContextType = {
    isGameLost,
    isGameWon,
    resetGame,
    startGame,
    gameConfig,
    gameStarted,
  };

  return (
    <NoLudicaGameContext.Provider value={value}>
      {children}
    </NoLudicaGameContext.Provider>
  );
};
