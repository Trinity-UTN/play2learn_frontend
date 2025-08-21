import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaTrophy, FaRedo } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import styles from "./QuizSection.module.css";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
}

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: "1",
      question: "¿Qué significa que el dinero tenga 'liquidez'?",
      options: [
        "Que está mojado",
        "Que puedes usarlo inmediatamente",
        "Que está invertido",
        "Que es mucho dinero",
      ],
      correctAnswer: 1,
      explanation:
        "La liquidez se refiere a qué tan fácil y rápido puedes convertir un activo en dinero efectivo para usar.",
      concept: "Liquidez",
    },
    {
      id: "2",
      question: "¿Cuál es el beneficio principal de invertir?",
      options: [
        "Gastar dinero rápidamente",
        "Hacer que tu dinero crezca con el tiempo",
        "Tener menos dinero",
        "Comprar cosas caras",
      ],
      correctAnswer: 1,
      explanation:
        "Invertir permite que tu dinero genere más dinero a través del tiempo, aunque requiere paciencia.",
      concept: "Inversión",
    },
    {
      id: "3",
      question: "¿Por qué es importante planificar los gastos?",
      options: [
        "Para gastar más dinero",
        "Para evitar decisiones impulsivas",
        "Para comprar todo lo que queremos",
        "Para no ahorrar nunca",
      ],
      correctAnswer: 1,
      explanation:
        "Planificar gastos te ayuda a tomar decisiones más inteligentes y evitar compras que después puedas lamentar.",
      concept: "Gasto Planificado",
    },
    {
      id: "4",
      question: "¿Qué es el interés compuesto?",
      options: [
        "Ganar dinero solo sobre la inversión inicial",
        "Ganar dinero sobre la inversión y las ganancias anteriores",
        "Perder dinero con el tiempo",
        "No ganar nada",
      ],
      correctAnswer: 1,
      explanation:
        "El interés compuesto significa que ganas dinero no solo sobre tu inversión inicial, sino también sobre las ganancias anteriores.",
      concept: "Interés Compuesto",
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80)
      return {
        message: "¡Excelente! Dominas los conceptos financieros",
        emoji: "🏆",
        color: "#10B981",
      };
    if (percentage >= 60)
      return {
        message: "¡Bien hecho! Tienes una buena base",
        emoji: "👍",
        color: "#F59E0B",
      };
    return {
      message: "Sigue practicando, vas por buen camino",
      emoji: "💪",
      color: "#EF4444",
    };
  };

  if (quizCompleted) {
    const scoreData = getScoreMessage();
    return (
      <Card className={styles.completedCard}>
        <div className={styles.completedContent}>
          <div className={styles.trophyIcon} style={{ color: scoreData.color }}>
            <FaTrophy />
          </div>
          <h2 className={styles.completedTitle}>¡Quiz Completado!</h2>
          <div className={styles.scoreDisplay}>
            <span className={styles.scoreNumber}>{score}</span>
            <span className={styles.scoreTotal}>/ {questions.length}</span>
          </div>
          <div
            className={styles.scoreMessage}
            style={{ color: scoreData.color }}
          >
            <span className={styles.scoreEmoji}>{scoreData.emoji}</span>
            <p>{scoreData.message}</p>
          </div>
          <Button
            variant="primary"
            onClick={resetQuiz}
            className={styles.retryButton}
          >
            <FaRedo />
            Intentar de Nuevo
          </Button>
        </div>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <Card className={styles.quizCard}>
      <div className={styles.quizHeader}>
        <div className={styles.progressInfo}>
          <span className={styles.questionNumber}>
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className={styles.scoreInfo}>
          Puntuación: {score}/{questions.length}
        </div>
      </div>

      <div className={styles.questionSection}>
        <h3 className={styles.questionText}>{currentQ.question}</h3>
        <div className={styles.conceptBadge}>Concepto: {currentQ.concept}</div>
      </div>

      <div className={styles.optionsSection}>
        {currentQ.options.map((option, index) => (
          <motion.button
            key={index}
            className={`${styles.optionButton} ${
              selectedAnswer === index ? styles.selected : ""
            } ${
              showResult
                ? index === currentQ.correctAnswer
                  ? styles.correct
                  : selectedAnswer === index
                  ? styles.incorrect
                  : ""
                : ""
            }`}
            onClick={() => !showResult && handleAnswerSelect(index)}
            disabled={showResult}
            whileHover={!showResult ? { scale: 1.02 } : {}}
            whileTap={!showResult ? { scale: 0.98 } : {}}
          >
            <div className={styles.optionContent}>
              <span className={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className={styles.optionText}>{option}</span>
              {showResult && index === currentQ.correctAnswer && (
                <FaCheck className={styles.resultIcon} />
              )}
              {showResult &&
                selectedAnswer === index &&
                index !== currentQ.correctAnswer && (
                  <FaTimes className={styles.resultIcon} />
                )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`${styles.resultSection} ${
              isCorrect ? styles.correctResult : styles.incorrectResult
            }`}
          >
            <div className={styles.resultHeader}>
              <div className={styles.resultIcon}>
                {isCorrect ? <FaCheck /> : <FaTimes />}
              </div>
              <span className={styles.resultText}>
                {isCorrect ? "¡Correcto!" : "Incorrecto"}
              </span>
            </div>
            <p className={styles.explanation}>{currentQ.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.quizActions}>
        {!showResult ? (
          <Button
            variant="primary"
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className={styles.submitButton}
          >
            Confirmar Respuesta
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleNextQuestion}
            className={styles.nextButton}
          >
            {currentQuestion < questions.length - 1
              ? "Siguiente Pregunta"
              : "Ver Resultados"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default QuizSection;
