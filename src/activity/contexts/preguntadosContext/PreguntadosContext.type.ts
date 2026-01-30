import type { Question, PreguntadosConfig } from "../../types/Preguntados.type";
import type { PreguntadosInterface } from "../../types/Preguntados.type";

export interface PreguntadosContextType {
  // Estados principales
  loading: boolean;
  currentStep: "config" | "questions" | "preview";
  config: PreguntadosConfig;
  errors: string[];
  isFormValid: boolean;
  questions: Question[];
  questionErrors: { [questionIndex: number]: { [field: string]: string } };
  currentQuestionIndex: number;

  // Funciones principales
  registrarPreguntados: (data: PreguntadosInterface) => Promise<void>;

  // Handlers principales
  handleConfigSubmit: (newConfig: PreguntadosConfig) => void;
  handleSubmit: () => Promise<void>;
  handleBack: () => void;
  handleNext: () => void;
  handleReset: () => void;
  setQuestions: (data: Question[]) => void

  // Funciones de utilidad
  getQuestionStatus: (q: Question) => "complete" | "incomplete" | "empty";
  getStepTitle: () => string;
  getCurrentStepNumber: () => number;
  getStepDescription: () => string;

  // Handlers específicos de preguntados
  handleQuestionSave: (questionData: Question) => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
  handleGoToQuestion: (index: number) => void;
  handleAddQuestion: () => void;
  handleDeleteQuestion: (index: number) => void;

  // Funciones específicas de preguntados
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
