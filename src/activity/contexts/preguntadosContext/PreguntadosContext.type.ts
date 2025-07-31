import type { Question, PreguntadosConfig } from "../../types/Preguntados.type";
import type { PreguntadosInterface } from "../../types/Preguntados.type";

export interface PreguntadosContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "questions" | "preview";
  config: PreguntadosConfig;
  questions: Question[];
  currentQuestionIndex: number;
  errors: string[];
  questionErrors: { [questionIndex: number]: { [field: string]: string } };
  isFormValid: boolean;

  // Funciones principales
  registrarPreguntados: (data: PreguntadosInterface) => Promise<void>;

  // Handlers principales
  handleConfigSubmit: (newConfig: PreguntadosConfig) => void;
  handleQuestionSave: (questionData: Question) => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
  handleGoToQuestion: (index: number) => void;
  handleDeleteQuestion: (index: number) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleReset: () => void;

  // Funciones de utilidad
  getQuestionStatus: (q: Question) => "complete" | "incomplete" | "empty";
  getStepTitle: () => string;
  getCompletedQuestions: () => number;
  getIncompleteQuestions: () => number;
  getEmptyQuestions: () => number;
  setQuestionErrors: (
    questionIndex: number,
    errors: { [field: string]: string }
  ) => void;
  clearQuestionErrors: (questionIndex: number) => void;
  clearAllQuestionErrors: () => void;
}
