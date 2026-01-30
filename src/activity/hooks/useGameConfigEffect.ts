import { getGameTypeFromActivityName, type GameType } from "@/shared";
import { useEffect } from "react";
import type { ActividadCreadaResponse } from "../types/ActividadCreada.type";

type GameConfigHandler<T = any> = (config: T) => void;

type UseGameConfigEffectParams = {
    actividadCreada: ActividadCreadaResponse | null;
    handlers: Partial<Record<GameType, GameConfigHandler>>;
};

export const useGameConfigEffect = ({
    actividadCreada,
    handlers,
}: UseGameConfigEffectParams) => {

    useEffect(() => {
        if (!actividadCreada) return;
        const gameType = getGameTypeFromActivityName(actividadCreada.name);
        if (gameType) {
            const handler = handlers[gameType];
            if (!handler) return;
            handler(actividadCreada.gameConfig);
        }

    }, [actividadCreada]);
};
