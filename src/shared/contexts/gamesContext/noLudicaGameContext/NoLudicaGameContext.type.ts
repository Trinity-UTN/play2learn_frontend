import type { NoLudicaConfig } from "../../../../activity/types/NoLudica.type";
// import type { GameHook } from "../../../types/Games.type";

export interface NoLudicaGameContextType {
  // Estados del juego
  gameConfig: NoLudicaConfig | null;
  resetGame: () => void;
  startGame: () => void;
  gameStarted?: boolean;
  isGameLost: boolean;
  isGameWon: boolean;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;

  // Estados calculados
  studentResponse: string;
  selectedFile: File | null;
  // Funciones del juego
  setStudentResponse: (data: string) => void;
  setSelectedFile: (data: File | null) => void;
  handleFinishNoLudica: () => void;
}
