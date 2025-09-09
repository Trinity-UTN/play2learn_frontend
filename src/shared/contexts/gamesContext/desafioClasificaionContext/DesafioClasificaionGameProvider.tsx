import { DesafioGameContext } from "./DesafioClasificaionContext";
import { useCreateDesafioClasificacion } from "../../../../activity/hooks/useCreateDesafioClasificacion";
import type { DesafioClasificacionGameContextType } from "./DesafioClasificaionGameContext.type";
import { useState } from "react";

export const DesafioClasificacionGameProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { config, getAllConcepts } = useCreateDesafioClasificacion();
  // Todos los useState que definiste
  const [gameStarted, setGameStarted] = useState(false);
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

  const totalCategories = config.categories.length;
  const totalConcepts = getAllConcepts().length;

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setGameStatus("playing");
    const allConcepts = getAllConcepts();
    setAvailableConcepts([...allConcepts]);
    setConceptsInCategories({});
    setVerificationResults(null);
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setGameStatus("playing");
    setAvailableConcepts([]);
    setConceptsInCategories({});
    setVerificationResults(null);
  };

  const verifyAnswers = () => {
    const correct: { concept: string; category: string }[] = [];
    const incorrect: {
      concept: string;
      placedIn: string;
      shouldBe: string;
    }[] = [];

    // Create a map of concept to its correct category
    const conceptToCategoryMap: { [concept: string]: string } = {};
    config.categories.forEach((category) => {
      category.concepts.forEach((concept) => {
        conceptToCategoryMap[concept.name.toLowerCase()] = category.name;
      });
    });

    // Check each placed concept
    Object.keys(conceptsInCategories).forEach((categoryId) => {
      const category = config.categories.find((cat) => cat.id === categoryId);
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

    // Remove concept from available concepts
    setAvailableConcepts((prev) => prev.filter((c) => c !== draggedConcept));

    // Add concept to category
    setConceptsInCategories((prev) => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), draggedConcept],
    }));

    setDraggedConcept(null);
  };

  const handleDropToPool = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedConcept) return;

    // Find which category the concept was in
    const categoryWithConcept = Object.keys(conceptsInCategories).find(
      (categoryId) => conceptsInCategories[categoryId].includes(draggedConcept)
    );

    if (categoryWithConcept) {
      // Remove from category
      setConceptsInCategories((prev) => ({
        ...prev,
        [categoryWithConcept]: prev[categoryWithConcept].filter(
          (c) => c !== draggedConcept
        ),
      }));

      // Add back to available concepts
      setAvailableConcepts((prev) => [...prev, draggedConcept]);
    }

    setDraggedConcept(null);
  };

  const value: DesafioClasificacionGameContextType = {
    gameStarted,
    score,
    gameStatus,
    draggedConcept,
    conceptsInCategories,
    availableConcepts,
    verificationResults,
    totalCategories,
    totalConcepts,
    startGame,
    resetGame,
    verifyAnswers,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDropToPool,
  };

  return (
    <DesafioGameContext.Provider value={value}>
      {children}
    </DesafioGameContext.Provider>
  );
};
