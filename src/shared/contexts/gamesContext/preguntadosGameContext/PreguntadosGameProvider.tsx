import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { PreguntadosGameContext } from "./PreguntadosGameContext";
import type { PreguntadosGameContextType } from "./PreguntadosGameContext.type";
import type {
  PreguntadosConfig,
  Question,
  PreguntadosInterface,
  QuestionResult,
} from "../../../../activity/types/Preguntados.type";
import { GameType } from "../../../types/Games.type";
import { getGameTypeFromActivityName } from "../../../registry/games/gameMapping";
import { useCreatePreguntados } from "../../../../activity/hooks/useCreatePreguntados";
import { useActivityStudent } from "../../../../student/hooks/useActivityStudentAPI";

interface PreguntadosGameProviderProps {
  children: ReactNode;
  config?: PreguntadosConfig;
  questions?: Question[];
  mode?: "preview" | "student";
}

export const PreguntadosGameProvider: React.FC<
  PreguntadosGameProviderProps
> = ({
  children,
  config: propConfig,
  questions: propQuestions,
  mode = "preview",
}) => {
  const { config, questions: configQuestions } = useCreatePreguntados();
  const { currentActivity } = useActivityStudent();

  // Referencias para timers
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Estados del juego
  const [gameConfig, setGameConfig] = useState<PreguntadosConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [gamePhase, setGamePhase] = useState<
    "waiting" | "countdown" | "question" | "answered" | "finished"
  >("waiting");
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    if (mode === "preview" && config && configQuestions.length > 0) {
      setGameConfig({
        totalQuestions: config.totalQuestions || 5,
        maxTimePerQuestionInSeconds: config.maxTimePerQuestionInSeconds || 30,
      });
      setQuestions(configQuestions);
    } else if (mode === "student" && currentActivity) {
      const gameType = getGameTypeFromActivityName(currentActivity.name);

      if (gameType === GameType.PREGUNTADOS) {
        const preguntadosInterface =
          currentActivity.gameConfig as PreguntadosInterface;

        setGameConfig({
          totalQuestions: preguntadosInterface.questions.length,
          maxTimePerQuestionInSeconds:
            preguntadosInterface.maxTimePerQuestionInSeconds,
        });
        setQuestions(preguntadosInterface.questions);
      }
    } else if (propConfig) {
      setGameConfig(propConfig);

      setQuestions(propQuestions || []);
    }
  }, [mode, config, configQuestions, currentActivity, propConfig]);

  useEffect(() => {
    if (mode !== "preview") return;

    if (
      config &&
      configQuestions &&
      configQuestions.length > 0 &&
      !gameConfig
    ) {
      setGameConfig({
        totalQuestions: config.totalQuestions || 5,
        maxTimePerQuestionInSeconds: config.maxTimePerQuestionInSeconds || 30,
      });
      setQuestions(configQuestions);
    }
  }, [mode, config?.totalQuestions, configQuestions?.length]);

  // Estados calculados
  const currentQuestion = questions[currentQuestionIndex] || null;
  const totalQuestions = gameConfig?.totalQuestions || questions.length;
  const correctAnswers = results.filter((result) => result.isCorrect).length;
  const isLastQuestion = currentQuestionIndex >= totalQuestions - 1;
  const canSelectAnswer =
    gamePhase === "question" && selectedAnswer === null && timeRemaining > 0;
  const showCorrectAnswer = gamePhase === "answered";
  const isGameWon =
    gamePhase === "finished" &&
    correctAnswers >= Math.ceil(totalQuestions * 0.6);
  const isGameLost = gamePhase === "finished" && !isGameWon;
  const gameStarted = gamePhase !== "waiting";

  // Funciones auxiliares
  const getMaxTimePerQuestion = useCallback(() => {
    if (!gameConfig) return 30;
    if ("questions" in gameConfig) {
      return gameConfig.maxTimePerQuestionInSeconds;
    } else {
      return gameConfig.maxTimePerQuestionInSeconds;
    }
  }, [gameConfig]);

  const getTimerClass = useCallback(() => {
    if (timeRemaining <= 3) return "danger";
    if (timeRemaining <= 5) return "warning";
    return "";
  }, [timeRemaining]);

  const getTimerProgress = useCallback(() => {
    const maxTime = getMaxTimePerQuestion();
    const progress = ((maxTime - timeRemaining) / maxTime) * 100;
    const circumference = 2 * Math.PI * 35; // radio de 35
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return {
      progress,
      circumference,
      strokeDashoffset,
    };
  }, [getMaxTimePerQuestion, timeRemaining]);

  const getFinalScore = useCallback(() => {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const isPassed = percentage >= 60;

    return {
      percentage,
      isPassed,
    };
  }, [correctAnswers, totalQuestions]);

  const getCorrectAnswerIndex = useCallback(() => {
    return currentQuestion?.options.findIndex((opt) => opt.isCorrect) ?? -1;
  }, [currentQuestion]);

  const isPreviewRoute = useCallback(() => {
    return (
      typeof window !== "undefined" &&
      window.location.pathname.includes(
        "/dashboard/teacher/actividad/configuration/preguntados"
      )
    );
  }, []);

  useEffect(() => {
    if (timeRemaining === 0 && gamePhase === "question") {
      setShowExplosion(true);
      const timer = setTimeout(() => {
        setShowExplosion(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, gamePhase]);

  const clearTimers = useCallback(() => {
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  }, []);

  const startCountdown = useCallback(() => {
    setGamePhase("countdown");
    setIsCountingDown(true);
    setCountdownValue(3);

    countdownTimerRef.current = setInterval(() => {
      setCountdownValue((prev) => {
        if (prev <= 1) {
          clearTimers();
          setIsCountingDown(false);
          setGamePhase("question");
          setTimeRemaining(gameConfig?.maxTimePerQuestionInSeconds || 30);
          setQuestionStartTime(Date.now());

          // Iniciar timer de la pregunta
          questionTimerRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
              if (prev <= 1) {
                clearTimers();
                handleTimeUp();
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return 3;
        }
        return prev - 1;
      });
    }, 1000);
  }, [gameConfig?.maxTimePerQuestionInSeconds]);

  const handleTimeUp = useCallback(() => {
    if (gamePhase !== "question") return;

    const correctAnswerIndex =
      currentQuestion?.options.findIndex((opt) => opt.isCorrect) ?? -1;
    const timeSpent = gameConfig?.maxTimePerQuestionInSeconds || 30;

    const result: QuestionResult = {
      questionIndex: currentQuestionIndex,
      selectedAnswer: null,
      correctAnswer: correctAnswerIndex,
      isCorrect: false,
      timeSpent: timeSpent,
      timeRemaining: 0,
    };

    setResults((prev) => [...prev, result]);
    setGamePhase("answered");
  }, [
    gamePhase,
    currentQuestion,
    currentQuestionIndex,
    gameConfig?.maxTimePerQuestionInSeconds,
  ]);

  // Funciones del juego
  const startGame = useCallback(() => {
    if (!gameConfig || questions.length === 0) return;

    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setResults([]);
    startCountdown();
  }, [gameConfig, questions.length, startCountdown]);

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      if (!canSelectAnswer) return;

      const currentTimeRemaining = timeRemaining;

      clearTimers();
      setSelectedAnswer(answerIndex);

      const correctAnswerIndex =
        currentQuestion?.options.findIndex((opt) => opt.isCorrect) ?? -1;
      const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

      const result: QuestionResult = {
        questionIndex: currentQuestionIndex,
        selectedAnswer: answerIndex,
        correctAnswer: correctAnswerIndex,
        isCorrect: answerIndex === correctAnswerIndex,
        timeSpent: timeSpent,
        timeRemaining: currentTimeRemaining,
      };

      setResults((prev) => [...prev, result]);
      setGamePhase("answered");
      setTimeRemaining(currentTimeRemaining);
    },
    [
      canSelectAnswer,
      currentQuestion,
      currentQuestionIndex,
      timeRemaining,
      questionStartTime,
      clearTimers,
    ]
  );

  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      setGamePhase("finished");
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    startCountdown();
  }, [isLastQuestion, startCountdown]);

  const resetGame = useCallback(() => {
    clearTimers();
    setGamePhase("waiting");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setTimeRemaining(0);
    setIsCountingDown(false);
    setCountdownValue(3);
    setResults([]);
    setQuestionStartTime(0);
    setShowExplosion(false);
  }, [clearTimers]);

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const contextValue: PreguntadosGameContextType = {
    // Estados del juego
    gameConfig,
    questions,
    currentQuestionIndex,
    selectedAnswer,
    timeRemaining,
    isCountingDown,
    countdownValue,
    gamePhase,
    results,
    showExplosion,

    // Estados calculados
    currentQuestion,
    totalQuestions,
    correctAnswers,
    isLastQuestion,
    canSelectAnswer,
    showCorrectAnswer,
    isGameWon,
    isGameLost,
    gameStarted,

    // Funciones del juego
    selectAnswer,
    nextQuestion,
    resetGame,
    startGame,

    // Funciones auxiliares
    getMaxTimePerQuestion,
    getTimerClass,
    getTimerProgress,
    getFinalScore,
    getCorrectAnswerIndex,
    isPreviewRoute,
  };

  return (
    <PreguntadosGameContext.Provider value={contextValue}>
      {children}
    </PreguntadosGameContext.Provider>
  );
};
