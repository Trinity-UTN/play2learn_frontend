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
