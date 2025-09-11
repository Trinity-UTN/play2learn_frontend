export const GameType = {
  AHORCADO: "ahorcado",
  CLASIFICACION: "desafio de clasificacion",
} as const;

export type GameType = (typeof GameType)[keyof typeof GameType];

export interface GameHook {
  isGameWon: boolean;
  isGameLost: boolean;
  gameStarted?: boolean;
  resetGame: () => void;
  startGame: () => void;
  initializeGame?: () => void;
  pauseGame?: () => void;
  resumeGame?: () => void;
}
