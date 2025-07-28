export interface Option {
  option: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  options: Option[];
}

export interface PreguntadosInterface {
  attempts: number;
  maxTimePerQuestionInSeconds: number;
  questions: Question[];
}
