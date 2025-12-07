import { FaGlobe, FaUsers, FaBook } from "react-icons/fa";
export const useRankingTypeSelector = (category: "coins" | "activities") => {
  const types = [
    {
      id: category === "coins" ? "coinsInstitucion" : "activitiesInstitucion",
      label: "Institución",
      icon: FaGlobe,
      description: "Todos los estudiantes",
    },
    {
      id: category === "coins" ? "coinsCurso" : "activitiesCurso",
      label: "Mi Curso",
      icon: FaUsers,
      description: "Solo mi curso",
    },
    {
      id: category === "coins" ? "coinsMateria" : "activitiesMateria",
      label: "Por Materia",
      icon: FaBook,
      description: "Una materia específica",
    },
  ];
  return { types };
};
