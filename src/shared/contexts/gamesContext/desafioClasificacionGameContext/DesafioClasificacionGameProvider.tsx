import { useEffect, useState, type ReactNode } from "react";
import { DesafioGameContext } from "./DesafioClasificacionGameContext";
import type { DesafioClasificacionGameContextType } from "./DesafioClasificacionGameContext.type";
import type { DesafioClasificacionConfig } from "../../../../activity/types/DesafioClasificacion.type";
import { GameType } from "../../../types/Games.type";
import { getGameTypeFromActivityName } from "../../../registry/games/gameMapping";
import { useCreateDesafioClasificacion } from "../../../../activity/hooks/useCreateDesafioClasificacion";
import { useActivityStudent } from "../../../../student/hooks/useActivityStudentAPI";

interface DesafioClasificacionGameProviderProps {
  children: ReactNode;
  config?: DesafioClasificacionConfig;
  mode?: "preview" | "student";
}
export const DesafioClasificacionGameProvider: React.FC<
  DesafioClasificacionGameProviderProps
> = ({ children, config: propConfig, mode = "preview" }) => {
  const { config, getAllConcepts, getCategoryNames } =
    useCreateDesafioClasificacion();
  const { currentActivity } = useActivityStudent();

  // Estados del juego
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(true);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [draggedConcept, setDraggedConcept] = useState<string | null>(null);
  const [conceptsInCategories, setConceptsInCategories] = useState<{
    [key: string]: string[];
  }>({});
  const [availableConcepts, setAvailableConcepts] = useState<string[]>([]);
  const [verificationResults, setVerificationResults] = useState<{
    correct: { concept: string; category: string }[];
    incorrect: { concept: string; placedIn: string; shouldBe: string }[];
    totalCorrect: number;
    totalConcepts: number;
  } | null>(null);
  const [hasVerified, setHasVerified] = useState(false);
  const [gameConfig, setGameConfig] =
    useState<DesafioClasificacionConfig | null>(null);

  useEffect(() => {
    if (mode === "preview" && config) {
      setGameConfig({
        categories: config.categories,
      });
    } else if (mode === "student" && currentActivity) {
      const gameType = getGameTypeFromActivityName(currentActivity.name);

      if (gameType === GameType.CLASIFICACION) {
        const desafioClasificacionConfig =
          currentActivity.gameConfig as DesafioClasificacionConfig;

        setGameConfig({
          categories: desafioClasificacionConfig.categories,
        });
      }
    } else if (propConfig) {
      setGameConfig(propConfig);
    }
  }, [mode, propConfig, config, currentActivity]);

  useEffect(() => {
    if (score >= 60) {
      setIsGameWon(true);
      setIsGameLost(false);
    } else {
      setIsGameWon(false);
      setIsGameLost(true);
    }
  }, [score]);

  useEffect(() => {
    if (mode === "student") {
      verifyAnswers();
    }
  }, [conceptsInCategories]);

  // Estados calculados
  const totalCategories =
    mode === "preview"
      ? getCategoryNames().length
      : gameConfig?.categories.length;
  const totalConcepts = getAllConcepts().length;

  // Funciones auxiliares
  const getConceptsSource = () => {
    if (mode === "preview") {
      return getAllConcepts();
    }
    if (mode === "student" && gameConfig) {
      return gameConfig.categories.flatMap((cat) =>
        cat.concepts.map((concept) => concept.name)
      );
    }
    return [];
  };

  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Funciones del juego
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameStatus("playing");
    setVerificationResults(null);
    setHasVerified(false);

    const allConcepts = getConceptsSource();
    const shuffledConcepts = shuffleArray(allConcepts);

    setAvailableConcepts(shuffledConcepts);
    setConceptsInCategories({});
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setGameStatus("playing");
    setAvailableConcepts([]);
    setConceptsInCategories({});
    setVerificationResults(null);
    setHasVerified(false);
  };

  const verifyAnswers = () => {
    setHasVerified(true);
    const correct: { concept: string; category: string }[] = [];
    const incorrect: {
      concept: string;
      placedIn: string;
      shouldBe: string;
    }[] = [];

    const conceptToCategoryMap: { [concept: string]: string } = {};
    gameConfig?.categories.forEach((category) => {
      category.concepts.forEach((concept) => {
        conceptToCategoryMap[concept.name.toLowerCase()] = category.name;
      });
    });

    Object.keys(conceptsInCategories).forEach((categoryId) => {
      const category = gameConfig?.categories.find(
        (cat) => String(cat.id) === String(categoryId)
      );
      if (!category) return;

      conceptsInCategories[categoryId].forEach((placedConcept) => {
        const correctCategory =
          conceptToCategoryMap[placedConcept.toLowerCase()];

        if (correctCategory === category.name) {
          correct.push({
            concept: placedConcept,
            category: category.name,
          });
        } else {
          incorrect.push({
            concept: placedConcept,
            placedIn: category.name,
            shouldBe: correctCategory,
          });
        }
      });
    });

    const totalPlacedConcepts = correct.length + incorrect.length;
    const calculatedScore =
      totalPlacedConcepts > 0
        ? Math.round((correct.length / totalPlacedConcepts) * 100)
        : 0;

    const results = {
      correct,
      incorrect,
      totalCorrect: correct.length,
      totalConcepts: totalPlacedConcepts,
    };

    setVerificationResults(results);
    setScore(calculatedScore);
    setGameStatus(calculatedScore >= 70 ? "won" : "lost");
  };

  const handleDragStart = (e: React.DragEvent, concept: string) => {
    setDraggedConcept(concept);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    if (!draggedConcept) return;

    setConceptsInCategories((prev) => {
      const updated = { ...prev };

      const fromCategoryId = Object.keys(updated).find((id) =>
        updated[id].includes(draggedConcept)
      );
      if (fromCategoryId) {
        updated[fromCategoryId] = updated[fromCategoryId].filter(
          (c) => c !== draggedConcept
        );
      } else {
        setAvailableConcepts((prev) =>
          prev.filter((c) => c !== draggedConcept)
        );
      }

      updated[categoryId] = [...(updated[categoryId] || []), draggedConcept];

      return updated;
    });

    setDraggedConcept(null);
  };

  const handleDropToPool = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedConcept) return;

    const categoryWithConcept = Object.keys(conceptsInCategories).find(
      (categoryId) => conceptsInCategories[categoryId].includes(draggedConcept)
    );

    if (categoryWithConcept) {
      setConceptsInCategories((prev) => ({
        ...prev,
        [categoryWithConcept]: prev[categoryWithConcept].filter(
          (c) => c !== draggedConcept
        ),
      }));

      setAvailableConcepts((prev) => [...prev, draggedConcept]);
    }

    setDraggedConcept(null);
  };

  const value: DesafioClasificacionGameContextType = {
    // Estados del juego
    gameConfig,
    score,
    gameStatus,
    draggedConcept,
    conceptsInCategories,
    availableConcepts,
    verificationResults,
    hasVerified,
    gameStarted,

    // Estados calculados
    totalCategories,
    totalConcepts,
    isGameLost,
    isGameWon,

    // Funciones del juego
    startGame,
    resetGame,
    verifyAnswers,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDropToPool,
    getAllConcepts,
  };

  return (
    <DesafioGameContext.Provider value={value}>
      {children}
    </DesafioGameContext.Provider>
  );
};
