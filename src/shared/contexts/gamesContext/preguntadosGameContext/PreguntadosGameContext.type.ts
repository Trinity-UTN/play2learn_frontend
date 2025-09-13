import type {
  PreguntadosConfig,
  Question,
  QuestionResult,
  TimerProgress,
  FinalScore,
} from "../../../../activity/types/Preguntados.type";
import type { GameHook } from "../../../types/Games.type";

export interface PreguntadosGameContextType extends GameHook {
  // Estados del juego
  gameConfig: PreguntadosConfig | null;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  timeRemaining: number;
  isCountingDown: boolean;
  countdownValue: number;
  gamePhase: "waiting" | "countdown" | "question" | "answered" | "finished";
  results: QuestionResult[];
  showExplosion: boolean;

  // Estados del juego actual
  currentQuestion: Question | null;
  totalQuestions: number;
  correctAnswers: number;
  isLastQuestion: boolean;
  canSelectAnswer: boolean;
  showCorrectAnswer: boolean;

  // Funciones del juego
  selectAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  startGame: () => void;

  // Funciones auxiliares
  getMaxTimePerQuestion: () => number;
  getTimerClass: () => string;
  getTimerProgress: () => TimerProgress;
  getFinalScore: () => FinalScore;
  getCorrectAnswerIndex: () => number;
  isPreviewRoute: () => boolean;
}
