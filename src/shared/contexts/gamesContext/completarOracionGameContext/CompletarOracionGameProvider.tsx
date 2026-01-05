import { useState, useEffect, type ReactNode } from "react";
import { CompletarOracionGameContext } from "./CompletarOracionGameContext";
import type { CompletarOracionGameContextType } from "./CompletarOracionGameContext.type";
import type { CompletarOracionConfig } from "../../../../activity/types/CompletarOracion.type";
import { GameType } from "../../../types/Games.type";
import { getGameTypeFromActivityName } from "@/shared";
import { useCreateCompletarOracion } from "../../../../activity/hooks/useCreateCompletarOracion";
import { useActivityStudent } from "../../../../student/hooks/useActivityStudentAPI";

interface CompletarOracionGameProviderProps {
  children: ReactNode;
  config?: CompletarOracionConfig;
  mode?: "preview" | "student";
}

export const CompletarOracionGameProvider: React.FC<
  CompletarOracionGameProviderProps
> = ({ children, config: propConfig, mode = "preview" }) => {
  const { sentences: configSentences } = useCreateCompletarOracion();
  const { currentActivity } = useActivityStudent();

  // Estados del juego
  const [gameConfig, setGameConfig] = useState<CompletarOracionConfig | null>(
    null
  );
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [completeSentences, setCompleteSentences] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(true);

  // Inicializar configuración según el modo
  useEffect(() => {
    if (mode === "preview" && configSentences && configSentences.length > 0) {
      setGameConfig({ sentences: configSentences });
    } else if (mode === "student" && currentActivity) {
      const gameType = getGameTypeFromActivityName(currentActivity.name);

      if (gameType === GameType.COMPLETAR_ORACION) {
        const completarOracionConfig =
          currentActivity.gameConfig as CompletarOracionConfig;

        setGameConfig({
          sentences: completarOracionConfig.sentences || [],
        });
      }
    } else if (propConfig) {
      setGameConfig(propConfig);
    }
  }, [mode, propConfig, configSentences, currentActivity]);

  // Actualizar oraciones completas cuando se muestran las respuestas
  useEffect(() => {
    if (showAnswers && gameConfig?.sentences) {
      const complete = gameConfig.sentences.map((sentence) =>
        sentence.words.map((word) => word.word).join(" ")
      );
      setCompleteSentences(complete);
    }
  }, [showAnswers, gameConfig]);

  // Estados calculados
  const getTotalMissingWords = (): number => {
    if (!gameConfig?.sentences) return 0;
    return gameConfig.sentences.reduce((total, sentence) => {
      return total + sentence.words.filter((w) => w.isMissing).length;
    }, 0);
  };

  const getCompletedWords = (): number => {
    return Object.values(userAnswers).filter((answer) => answer.trim() !== "")
      .length;
  };

  const getCorrectAnswersCount = (): number => {
    if (!gameConfig?.sentences) return 0;
    let count = 0;
    gameConfig.sentences.forEach((sentence, sentenceIndex) => {
      sentence.words.forEach((word, wordIndex) => {
        if (word.isMissing) {
          const key = `${sentenceIndex}-${wordIndex}`;
          const userAnswer = userAnswers[key];
          if (
            userAnswer &&
            userAnswer.toLowerCase().trim() === word.word.toLowerCase().trim()
          ) {
            count++;
          }
        }
      });
    });
    return count;
  };

  const totalMissingWords = getTotalMissingWords();
  const completedWords = getCompletedWords();
  const correctAnswers = getCorrectAnswersCount();

  const getScore = (): number => {
    if (totalMissingWords === 0) return 0;
    return Math.round((correctAnswers / totalMissingWords) * 100);
  };

  const isGameWon = totalMissingWords > 0 && getScore() >= 60;
  const isGameLost = false; // Este juego no tiene condición de pérdida

  const score = getScore();
  // Oraciones incorrectas: palabras completadas que son incorrectas
  const incorrectAnswers = completedWords - correctAnswers;
  // Oraciones sin completar: palabras faltantes que no han sido respondidas
  const unanswered = totalMissingWords - completedWords;

  // Funciones del juego
  const handleInputChange = (
    sentenceIndex: number,
    wordIndex: number,
    value: string
  ) => {
    const key = `${sentenceIndex}-${wordIndex}`;
    setUserAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetGame = () => {
    setUserAnswers({});
    setShowAnswers(false);
    setCompleteSentences([]);
    setGameStarted(true);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const checkAnswer = (
    sentenceIndex: number,
    wordIndex: number
  ): boolean | null => {
    if (!gameConfig?.sentences) return null;
    const key = `${sentenceIndex}-${wordIndex}`;
    const userAnswer = userAnswers[key];
    const correctAnswer =
      gameConfig.sentences[sentenceIndex]?.words[wordIndex]?.word;

    if (!userAnswer || !correctAnswer) return null;

    return (
      userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    );
  };

  const contextValue: CompletarOracionGameContextType = {
    // Estados del juego
    gameConfig,
    userAnswers,
    showAnswers,
    completeSentences,
    gameStarted,

    // Estados calculados
    totalMissingWords,
    completedWords,
    isGameWon,
    isGameLost,
    score,
    correctAnswers,
    incorrectAnswers,
    unanswered,

    // Funciones del juego
    resetGame,
    startGame,
    handleInputChange,
    toggleAnswers,
    checkAnswer,
    getScore,
  };

  return (
    <CompletarOracionGameContext.Provider value={contextValue}>
      {children}
    </CompletarOracionGameContext.Provider>
  );
};
