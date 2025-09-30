import type { DesafioClasificacionConfig } from "../../../../activity/types/DesafioClasificacion.type";
import type { GameHook } from "../../../types/Games.type";

export interface DesafioClasificacionGameContextType extends GameHook {
  // Estados del juego
  gameConfig: DesafioClasificacionConfig | null;
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
  hasVerified: boolean;

  // Estados calculados
  totalCategories: number | undefined;
  totalConcepts: number;

  // Funciones del juego
  verifyAnswers: () => void;
  getAllConcepts: () => string[];
  handleDragStart: (e: React.DragEvent, concept: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, categoryId: string) => void;
  handleDropToPool: (e: React.DragEvent) => void;
}
