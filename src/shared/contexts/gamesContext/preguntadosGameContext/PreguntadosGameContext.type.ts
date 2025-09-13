import type {
  PreguntadosConfig,
  Question,
} from "../../../../activity/types/Preguntados.type";
import type { GameHook } from "../../../types/Games.type";

export interface QuestionResult {
  questionIndex: number;
  selectedAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  timeRemaining: number;
}

export interface PreguntadosGameContextType extends GameHook {
  // Configuración del juego
  gameConfig: PreguntadosConfig | null;
  questions: Question[];

  // Estados del juego actual
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  timeRemaining: number;
  isCountingDown: boolean;
  countdownValue: number;
  gamePhase: "waiting" | "countdown" | "question" | "answered" | "finished";

  // Resultados y estadísticas
  results: QuestionResult[];
  correctAnswers: number;
  totalQuestions: number;
  isLastQuestion: boolean;

  // Estados de control
  canSelectAnswer: boolean;
  showCorrectAnswer: boolean;

  // Funciones del juego
  selectAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  startGame: () => void;
}
