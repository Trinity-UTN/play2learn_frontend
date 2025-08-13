import { useState, type ReactNode } from "react";
import type {
  AhorcadoErrors,
  AhorcadoInterface,
} from "../../types/Ahorcado.type";
import { CreateAhorcadoContext } from "./CreateAhorcadoContext";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { makeData } from "../../utils/MakeData";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import {
  AhorcadoService,
  type CreateAhorcadoPayload,
} from "../../services/ahorcado/AhorcadoService";

export const CreateAhorcadoProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ahorcadoData, setAhorcadoData] = useState<AhorcadoInterface>({
    word: "",
    errorsPermited: "TRES",
  });
  const [errors, setErrors] = useState<Partial<AhorcadoErrors>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { configurationActivity } = useConfigurationActivity();

  const registerAhorcado = async (data: AhorcadoInterface): Promise<void> => {
    setLoading(true);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );

    try {
      AhorcadoService.registerAhorcadoApi(dataMandar as CreateAhorcadoPayload);
    } catch (error) {
      console.error("Error al crear el ahorcado:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async (): Promise<void> => {
    if (validateForm()) {
      registerAhorcado(ahorcadoData);
    }
  };

  const handleReset = () => {
    setAhorcadoData({
      word: "",
      errorsPermited: "TRES",
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
    { errors: "CINCO", label: "Fácil", color: "#10b981", valor: "5" },
    { errors: "TRES", label: "Difícil", color: "#ef4444", valor: "3" },
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
        loading,
        registerAhorcado,
      }}
    >
      {children}
    </CreateAhorcadoContext.Provider>
  );
};
