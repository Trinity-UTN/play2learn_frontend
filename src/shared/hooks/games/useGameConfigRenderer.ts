import { useMemo } from "react";
import type { GameConfig } from "../../../student/types/Activity.type";
import type { GameConfigDetail } from "../../strategies/interfaces/GameConfigRenderer.interface";
import { GameConfigRendererRegistry } from "../../registry/games/gameConfigRendererRegistry";
import { getGameTypeFromActivityName } from "../../registry/games/gameMapping";

export const useGameConfigRenderer = (
  activityName: string | undefined,
  gameConfig: GameConfig | undefined
): GameConfigDetail[] => {
  return useMemo(() => {
    if (!activityName || !gameConfig) {
      return [];
    }

    const gameType = getGameTypeFromActivityName(activityName);
    if (!gameType) {
      return [];
    }

    const renderer = GameConfigRendererRegistry.getRenderer(gameType);
    if (!renderer) {
      return [];
    }

    return renderer.render(gameConfig);
  }, [activityName, gameConfig]);
};
