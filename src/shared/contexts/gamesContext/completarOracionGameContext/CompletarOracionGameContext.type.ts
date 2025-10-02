import type { CompletarOracionConfig } from "../../../../activity/types/CompletarOracion.type";
import type { GameHook } from "../../../types/Games.type";

export interface CompletarOracionGameContextType extends GameHook {
  // Estados del juego
  gameConfig: CompletarOracionConfig | null;
  userAnswers: { [key: string]: string };
  showAnswers: boolean;
  completeSentences: string[];
  gameStarted: boolean;

  // Estados calculados
  totalMissingWords: number;
  completedWords: number;
  correctAnswers: number;
  isGameWon: boolean;
  isGameLost: boolean;

  // Funciones del juego (GameHook)
  resetGame: () => void;
  startGame: () => void;

  // Funciones específicas
  handleInputChange: (
    sentenceIndex: number,
    wordIndex: number,
    value: string
  ) => void;
  toggleAnswers: () => void;
  checkAnswer: (sentenceIndex: number, wordIndex: number) => boolean | null;
  getScore: () => number;
}
