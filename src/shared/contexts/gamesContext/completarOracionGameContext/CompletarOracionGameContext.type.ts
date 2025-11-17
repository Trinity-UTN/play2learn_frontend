import type { CompletarOracionConfig } from "../../../../activity/types/CompletarOracion.type";
import type { GameHook } from "../../../types/Games.type";

export interface CompletarOracionGameContextType extends GameHook {
  // Estados del juego
  gameConfig: CompletarOracionConfig | null;
  userAnswers: { [key: string]: string };
  showAnswers: boolean;
  completeSentences: string[];

  // Estados calculados
  totalMissingWords: number;
  completedWords: number;
  correctAnswers: number;

  // Funciones del juego
  handleInputChange: (
    sentenceIndex: number,
    wordIndex: number,
    value: string
  ) => void;
  toggleAnswers: () => void;
  checkAnswer: (sentenceIndex: number, wordIndex: number) => boolean | null;
  getScore: () => number;
}
