import type {
  AhorcadoInterface,
  AhorcadoErrors,
} from "../../types/Ahorcado.type";

export interface CreateAhorcadoContextType {
  loading: boolean;
  registerAhorcado: (data: AhorcadoInterface) => Promise<void>;
  ahorcadoData: AhorcadoInterface;
  setAhorcadoData: React.Dispatch<React.SetStateAction<AhorcadoInterface>>;
  errors: Partial<AhorcadoErrors>;
  setErrors: React.Dispatch<React.SetStateAction<Partial<AhorcadoErrors>>>;
  isPreviewMode: boolean;
  setIsPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  guessedLetters: string[];
  setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
  currentGuess: string;
  setCurrentGuess: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (
    field: keyof AhorcadoInterface,
    value: string | number
  ) => void;
  handleSave: () => void;
  handleReset: () => void;
  renderHangman: (errors: number) => string;
  renderWordDisplay: () => string;
  difficultyLevels: {
    errors: string;
    label: string;
    color: string;
    valor: string;
  }[];
  wordSuggestions: string[];
  itemVariants: Record<string, { opacity: number; y: number }>;
}
