import { useCompletarOracionGame } from "../../../shared/hooks/games/useCompletarOracionGame";
import { getPerformanceLevel } from "../../utils/performance";

interface CorrectAnswer {
  sentence: string;
  word: string;
  position: number;
}

interface IncorrectAnswer {
  sentence: string;
  userAnswer: string;
  correctAnswer: string;
  position: number;
}

export function useCompletarOracionDetails() {
  const {
    gameConfig,
    userAnswers,
    isGameWon,
    correctAnswers,
    totalMissingWords,
    completedWords,
  } = useCompletarOracionGame();

  const getAccuracyPercentage = (): number => {
    if (totalMissingWords === 0) return 0;
    const percentage = (correctAnswers / totalMissingWords) * 100;
    return isNaN(percentage) ? 0 : Math.round(percentage);
  };

  const getScore = (): number => getAccuracyPercentage();

  const getCorrectAnswersList = (): CorrectAnswer[] => {
    if (!gameConfig?.sentences) return [];
    const correct: CorrectAnswer[] = [];

    gameConfig.sentences.forEach((sentence, sentenceIndex) => {
      sentence.words.forEach((word, wordIndex) => {
        if (word.isMissing) {
          const key = `${sentenceIndex}-${wordIndex}`;
          const userAnswer = userAnswers[key];
          if (
            userAnswer &&
            userAnswer.toLowerCase().trim() === word.word.toLowerCase().trim()
          ) {
            correct.push({
              sentence: sentence.words.map((w) => w.word).join(" "),
              word: word.word,
              position: sentenceIndex + 1,
            });
          }
        }
      });
    });

    return correct;
  };

  const getIncorrectAnswersList = (): IncorrectAnswer[] => {
    if (!gameConfig?.sentences) return [];
    const incorrect: IncorrectAnswer[] = [];

    gameConfig.sentences.forEach((sentence, sentenceIndex) => {
      sentence.words.forEach((word, wordIndex) => {
        if (word.isMissing) {
          const key = `${sentenceIndex}-${wordIndex}`;
          const userAnswer = userAnswers[key];
          if (
            userAnswer &&
            userAnswer.toLowerCase().trim() !== word.word.toLowerCase().trim()
          ) {
            incorrect.push({
              sentence: sentence.words.map((w) => w.word).join(" "),
              userAnswer,
              correctAnswer: word.word,
              position: sentenceIndex + 1,
            });
          }
        }
      });
    });

    return incorrect;
  };

  const accuracy = getAccuracyPercentage();
  const score = getScore();
  const performance = getPerformanceLevel(accuracy);
  const correctList = getCorrectAnswersList();
  const incorrectList = getIncorrectAnswersList();
  const unanswered = totalMissingWords - completedWords;

  return {
    gameConfig,
    isGameWon,
    accuracy,
    score,
    performance,
    correctAnswers,
    totalMissingWords,
    completedWords,
    unanswered,
    correctList,
    incorrectList,
  };
}
