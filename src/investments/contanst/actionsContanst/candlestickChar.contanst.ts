import type { RangeValue } from "../../types/actions.type";

export const timeRanges: { range: RangeValue; abbreviation: string }[] = [
  { range: "DIARIO", abbreviation: "D" },
  { range: "SEMANAL", abbreviation: "S" },
  { range: "QUINCENAL", abbreviation: "Q" },
  { range: "MENSUAL", abbreviation: "M" },
  { range: "HISTORICO", abbreviation: "H" },
];
