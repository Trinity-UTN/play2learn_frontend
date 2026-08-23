import type { ChangeEvent } from "react";
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
  handleFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: () => void;
  validateNoLudicaSubmission: () => boolean;
  handleFinishNoLudica: () => void;
}
