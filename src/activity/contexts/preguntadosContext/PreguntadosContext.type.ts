import type { PreguntadosInterface } from "../../types/Preguntados.type";

export interface PreguntadosContextType {
  loading: boolean;
  registrarPreguntados: (data: PreguntadosInterface) => Promise<void>;
  setQuestionErrors: (
    questionIndex: number,
    errors: { [field: string]: string }
  ) => void;
  clearQuestionErrors: (questionIndex: number) => void;
  clearAllQuestionErrors: () => void;
  questionErrors: { [questionIndex: number]: { [field: string]: string } };
}
