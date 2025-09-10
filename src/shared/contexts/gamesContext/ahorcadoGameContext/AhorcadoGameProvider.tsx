import { useState, useEffect, type ReactNode } from "react";
import { AhorcadoGameContext } from "./AhorcadoGameContext";
import type { AhorcadoGameContextType } from "./AhorcadoGameContext.type";
import type { AhorcadoConfig } from "../../../../activity/types/Ahorcado.type";
import { GameType } from "../../../types/Games.type";
import { getGameTypeFromActivityName } from "../../../registry/games/gameMapping";
import { useCreateAhorcado } from "../../../../activity/hooks/useCreateAhorcado";
import { useActivityStudent } from "../../../../student/hooks/useActivityStudentAPI";

interface AhorcadoGameProviderProps {
  children: ReactNode;
  config?: AhorcadoConfig;
  mode?: "preview" | "student";
}

export const AhorcadoGameProvider: React.FC<AhorcadoGameProviderProps> = ({
  children,
  config: propConfig,
  mode = "preview",
}) => {
  const { config } = useCreateAhorcado();
  const { currentActivity } = useActivityStudent();

  // Estados del juego
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStarted, setGameStarted] = useState(true);
  const [gameConfig, setGameConfig] = useState<AhorcadoConfig | null>(null);

  useEffect(() => {
    if (mode === "preview" && config) {
      setGameConfig({
        word: config.word || "",
        errorsPermited: config.errorsPermited || "TRES",
      });
    } else if (mode === "student" && currentActivity) {
      const gameType = getGameTypeFromActivityName(currentActivity.name);

      if (gameType === GameType.AHORCADO) {
        const ahorcadoConfig = currentActivity.gameConfig as AhorcadoConfig;

        setGameConfig({
          word: ahorcadoConfig.word || "",
          errorsPermited: ahorcadoConfig.errorsPermited || "TRES",
        });
      }
    } else if (propConfig) {
      setGameConfig(propConfig);
    }
  }, [mode, propConfig, config, currentActivity]);

  // Estados calculados
  const getMaxErrors = (): number => {
    return gameConfig?.errorsPermited === "CINCO" ? 5 : 3;
  };

  const wrongGuesses = guessedLetters.filter(
    (letter) => !gameConfig?.word.toLowerCase().includes(letter)
  ).length;

  const isGameWon = gameConfig?.word
    ? gameConfig.word
        .toLowerCase()
        .split("")
        .every((letter) => guessedLetters.includes(letter))
    : false;

  const isGameLost = wrongGuesses >= getMaxErrors();

  const maxErrors = getMaxErrors();
  const livesRemaining = maxErrors - wrongGuesses;

  // Funciones del juego
  const resetGame = () => {
    setGuessedLetters([]);
    setCurrentGuess("");
    setGameStarted(true);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const handleGuessLetter = () => {
    if (currentGuess && !guessedLetters.includes(currentGuess.toLowerCase())) {
      setGuessedLetters((prev) => [...prev, currentGuess.toLowerCase()]);
      setCurrentGuess("");
    }
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

  const renderWordDisplay = (letters: string[]) => {
    if (!gameConfig?.word) return "_ _ _ _ _";

    return gameConfig.word
      .split("")
      .map((letter) => (letters.includes(letter.toLowerCase()) ? letter : "_"))
      .join(" ");
  };

  const contextValue: AhorcadoGameContextType = {
    // Estados del juego
    guessedLetters,
    currentGuess,
    gameStarted,

    // Estados calculados
    wrongGuesses,
    isGameWon,
    isGameLost,
    maxErrors,
    livesRemaining,

    // Funciones del juego
    handleGuessLetter,
    resetGame,
    startGame,
    setCurrentGuess,

    // Funciones de renderizado
    renderHangman,
    renderWordDisplay,
    gameConfig,
  };

  return (
    <AhorcadoGameContext.Provider value={contextValue}>
      {children}
    </AhorcadoGameContext.Provider>
  );
};
