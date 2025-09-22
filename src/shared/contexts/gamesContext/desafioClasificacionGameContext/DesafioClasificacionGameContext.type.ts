import type { DesafioClasificacionConfig } from "../../../../activity/types/DesafioClasificacion.type";

export interface DesafioClasificacionGameContextType {
  // Estados del juego
  gameStarted: boolean;
  score: number;
  gameStatus: "playing" | "won" | "lost";
  draggedConcept: string | null;
  conceptsInCategories: { [key: string]: string[] };
  availableConcepts: string[];
  verificationResults: {
    correct: { concept: string; category: string }[];
    incorrect: { concept: string; placedIn: string; shouldBe: string }[];
    totalCorrect: number;
    totalConcepts: number;
  } | null;
  totalCategories: number | undefined;
  totalConcepts: number;
  hasVerified: boolean;
  gameConfig: DesafioClasificacionConfig | null;
  isGameWon: boolean;
  isGameLost: boolean;

  // Métodos
  startGame: () => void;
  resetGame: () => void;
  verifyAnswers: () => void;
  handleDragStart: (e: React.DragEvent, concept: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, categoryId: string) => void;
  handleDropToPool: (e: React.DragEvent) => void;
  getAllConcepts: () => string[];
}
