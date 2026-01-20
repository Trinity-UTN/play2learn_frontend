export interface Option {
  option: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  options: Option[];
}

export interface PreguntadosConfig {
  totalQuestions: number;
  maxTimePerQuestionInSeconds: number;
}

export interface PreguntadosInterface {
  maxTimePerQuestionInSeconds: number;
  questions: Question[];
}
export interface PreguntadosConfigQuestion {
  maxTimePerQuestionInSeconds: number;
  questions: Question[]
}

// Preguntados Game
export interface QuestionResult {
  questionIndex: number;
  selectedAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  timeRemaining: number;
}

export interface TimerProgress {
  progress: number;
  circumference: number;
  strokeDashoffset: number;
}

export interface FinalScore {
  percentage: number;
  isPassed: boolean;
}
