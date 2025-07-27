import { createContext, useContext, useState } from "react";
import type {
  AhorcadoInterface,
  AhorcadoErrors,
} from "../../types/Ahorcado.type";
import { useAhorcado } from "../../hooks/useAhorcado";
import type { ReactNode } from "react";

interface CreateAhorcadoContextType {
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

const CreateAhorcadoContext = createContext<
  CreateAhorcadoContextType | undefined
>(undefined);

export const CreateAhorcadoProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ahorcadoData, setAhorcadoData] = useState<AhorcadoInterface>({
    word: "",
    errorsPermited: "TRES",
    attempts: 1,
  });
  const [errors, setErrors] = useState<Partial<AhorcadoErrors>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const { registerAhorcado } = useAhorcado();

  const validateForm = (): boolean => {
    const newErrors: Partial<AhorcadoErrors> = {};

    if (!ahorcadoData.word.trim()) {
      newErrors.word = "La palabra es requerida";
    } else if (ahorcadoData.word.length < 3) {
      newErrors.word = "Debe tener al menos 3 caracteres";
    } else if (ahorcadoData.word.length > 15) {
      newErrors.word = "No puede tener más de 15 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(ahorcadoData.word)) {
      newErrors.word = "Solo puede contener letras";
    }

    if (ahorcadoData.attempts < 1 || ahorcadoData.attempts > 5) {
      newErrors.attempts = "Los intentos deben estar entre 1 y 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof AhorcadoInterface,
    value: string | number
  ) => {
    setAhorcadoData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      registerAhorcado(ahorcadoData);
    }
  };

  const handleReset = () => {
    setAhorcadoData({
      word: "",
      errorsPermited: "TRES",
      attempts: 1,
    });
    setErrors({});
    setGuessedLetters([]);
    setCurrentGuess("");
  };

  const renderHangman = (errors: number) => {
    const parts = [
      "  +---+",
      "  |   |",
      errors >= 1 ? "  O   |" : "      |",
      errors >= 3 ? " /|\\  |" : errors >= 2 ? " /|   |" : "      |",
      errors >= 5 ? " / \\  |" : errors >= 4 ? " /    |" : "      |",
      "      |",
      "=========",
    ];
    return parts.join("\n");
  };

  const renderWordDisplay = () => {
    if (!ahorcadoData.word) return "_ _ _ _ _";

    return ahorcadoData.word
      .split("")
      .map((letter) =>
        guessedLetters.includes(letter.toLowerCase()) ? letter : "_"
      )
      .join(" ");
  };

  const difficultyLevels = [
    { errors: "TRES", label: "Difícil", color: "#ef4444", valor: "3" },
    { errors: "CINCO", label: "Fácil", color: "#10b981", valor: "5" },
  ];

  const wordSuggestions = [
    "MATEMATICAS",
    "CIENCIA",
    "HISTORIA",
    "GEOGRAFIA",
    "LITERATURA",
    "QUIMICA",
    "FISICA",
    "BIOLOGIA",
    "ALGEBRA",
    "GEOMETRIA",
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <CreateAhorcadoContext.Provider
      value={{
        ahorcadoData,
        setAhorcadoData,
        errors,
        setErrors,
        isPreviewMode,
        setIsPreviewMode,
        guessedLetters,
        setGuessedLetters,
        currentGuess,
        setCurrentGuess,
        handleInputChange,
        handleSave,
        handleReset,
        renderHangman,
        renderWordDisplay,
        difficultyLevels,
        wordSuggestions,
        itemVariants,
      }}
    >
      {children}
    </CreateAhorcadoContext.Provider>
  );
};

export const useCreateAhorcado = () => {
  const context = useContext(CreateAhorcadoContext);
  if (!context)
    throw new Error(
      "useCreateAhorcado debe usarse dentro de CreateAhorcadoProvider"
    );
  return context;
};
