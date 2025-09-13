import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { PreguntadosGameContext } from "./PreguntadosGameContext";
import type {
  PreguntadosGameContextType,
  QuestionResult,
} from "./PreguntadosGameContext.type";
import type {
  PreguntadosConfig,
  Question,
  PreguntadosInterface,
} from "../../../../activity/types/Preguntados.type";
import { GameType } from "../../../types/Games.type";
import { getGameTypeFromActivityName } from "../../../registry/games/gameMapping";
import { useCreatePreguntados } from "../../../../activity/hooks/useCreatePreguntados";
import { useActivityStudent } from "../../../../student/hooks/useActivityStudentAPI";

interface PreguntadosGameProviderProps {
  children: ReactNode;
  config?: PreguntadosConfig;
  mode?: "preview" | "student";
}

export const PreguntadosGameProvider: React.FC<
  PreguntadosGameProviderProps
> = ({ children, config: propConfig, mode = "preview" }) => {
  const { config } = useCreatePreguntados();
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

  // Configurar el juego basado en el modo y datos disponibles
  useEffect(() => {
    if (mode === "preview" && config) {
      setGameConfig({
        totalQuestions: config.totalQuestions || 5,
        maxTimePerQuestionInSeconds: config.maxTimePerQuestionInSeconds || 30,
      });
      // En modo preview, usar preguntas de ejemplo
      const exampleQuestions: Question[] = Array.from(
        { length: config.totalQuestions || 5 },
        (_, i) => ({
          question: `Pregunta de ejemplo ${i + 1}`,
          options: [
            { option: "Opción A", isCorrect: i % 4 === 0 },
            { option: "Opción B", isCorrect: i % 4 === 1 },
            { option: "Opción C", isCorrect: i % 4 === 2 },
            { option: "Opción D", isCorrect: i % 4 === 3 },
          ],
        })
      );
      setQuestions(exampleQuestions);
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
      // Si se proporciona config pero no preguntas, usar preguntas de ejemplo
      const exampleQuestions: Question[] = Array.from(
        { length: propConfig.totalQuestions },
        (_, i) => ({
          question: `Pregunta de ejemplo ${i + 1}`,
          options: [
            { option: "Opción A", isCorrect: i % 4 === 0 },
            { option: "Opción B", isCorrect: i % 4 === 1 },
            { option: "Opción C", isCorrect: i % 4 === 2 },
            { option: "Opción D", isCorrect: i % 4 === 3 },
          ],
        })
      );
      setQuestions(exampleQuestions);
    }
  }, [mode, propConfig, config, currentActivity]);

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

  // Limpiar timers
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

  // Iniciar countdown antes de mostrar pregunta
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

  // Manejar cuando se acaba el tiempo
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
        timeRemaining: timeRemaining,
      };

      setResults((prev) => [...prev, result]);
      setGamePhase("answered");
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
  }, [clearTimers]);

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const contextValue: PreguntadosGameContextType = {
    // Configuración del juego
    gameConfig,
    questions,

    // Estados del juego actual
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    timeRemaining,
    isCountingDown,
    countdownValue,
    gamePhase,

    // Resultados y estadísticas
    results,
    correctAnswers,
    totalQuestions,
    isLastQuestion,

    // Estados de control
    canSelectAnswer,
    showCorrectAnswer,

    // Estados del GameHook
    isGameWon,
    isGameLost,
    gameStarted,

    // Funciones del juego
    selectAnswer,
    nextQuestion,
    resetGame,
    startGame,
  };

  return (
    <PreguntadosGameContext.Provider value={contextValue}>
      {children}
    </PreguntadosGameContext.Provider>
  );
};
