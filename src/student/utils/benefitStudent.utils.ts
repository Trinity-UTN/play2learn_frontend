/**
 * Calcula los contadores de beneficios por estado
 */
export const calculateBenefitCounts = (benefits: any[]) => {
  const available = benefits.filter((b) => b.state === "AVAILABLE").length;
  const purchased = benefits.filter((b) => b.state === "PURCHASED").length;
  const useRequested = benefits.filter(
    (b) => b.state === "USE_REQUESTED"
  ).length;
  const expired = benefits.filter((b) => b.state === "EXPIRED").length;

  return { available, purchased, useRequested, expired };
};

/**
 * Extrae las materias únicas de los beneficios
 */
export const extractUniqueSubjectsFromBenefits = (benefits: any[]) => {
  const subjectsMap = new Map(
    benefits.map((b) => [
      b.subjectId.toString(),
      { id: b.subjectId.toString(), name: b.subjectName },
    ])
  );

  return [
    { id: "ALL", name: "Todas las materias" },
    ...Array.from(subjectsMap.values()),
  ];
};

/**
 * Verifica si un beneficio está disponible para comprar
 */
export const isBenefitAvailable = (benefit: any): boolean => {
  return benefit.state === "AVAILABLE" && benefit.purchasesLeft > 0;
};

/**
 * Verifica si un beneficio puede ser usado
 */
export const canUseBenefit = (benefit: any): boolean => {
  return benefit.state === "PURCHASED" && benefit.purchasesLeftByStudent > 0;
};

/**
 * Obtiene el estado de disponibilidad de un beneficio
 */
export const getBenefitAvailabilityStatus = (benefit: any): string => {
  if (benefit.state === "EXPIRED") return "Vencido";
  if (benefit.state === "USE_REQUESTED") return "Uso solicitado";
  if (benefit.state === "PURCHASED") {
    if (benefit.purchasesLeftByStudent === 0) return "Sin usos disponibles";
    return `${benefit.purchasesLeftByStudent} uso${
      benefit.purchasesLeftByStudent > 1 ? "s" : ""
    } disponible${benefit.purchasesLeftByStudent > 1 ? "s" : ""}`;
  }
  if (benefit.purchasesLeft === 0) return "Agotado";
  return "Disponible";
};
