import { useEffect, useState } from "react";
import { useRankingContext } from "./useRankingContext";
import type { RankingType } from "../types/ranking.type";
import { useSubject } from "../../admin/hooks/useSubject";
type Category = "coins" | "activities";

export const useRankingView = () => {
  const { getRanking, loading, ranking, setRanking } = useRankingContext();
  const { subjects, getSubject } = useSubject();
  const [category, setCategory] = useState<Category>("coins");
  const [selectedType, setSelectedType] =
    useState<RankingType>("coinsInstitucion");

  const [subjectId, setSubjectId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (selectedType.includes("Materia") && !subjectId) {
      setRanking(undefined);
      return;
    }
    loadRanking();
  }, [selectedType, subjectId]);

  useEffect(() => {
    if (subjects.length <= 0) {
      getSubject();
    }
  }, []);
  const loadRanking = async () => {
    getRanking(selectedType, subjectId);
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    // Cambiar automáticamente al tipo correspondiente
    if (newCategory === "coins") {
      setSelectedType("coinsInstitucion");
    } else {
      setSelectedType("activitiesInstitucion");
    }
    setSubjectId(undefined);
  };

  const handleTypeChange = (type: RankingType) => {
    setSelectedType(type);
    if (!type.includes("Materia")) {
      setSubjectId(undefined);
    }
  };
  const requiresSubject = selectedType.includes("Materia");
  return {
    loading,
    ranking,
    category,
    selectedType,
    subjectId,
    subjects,
    requiresSubject,
    handleCategoryChange,
    handleTypeChange,
    setSubjectId,
  };
};
