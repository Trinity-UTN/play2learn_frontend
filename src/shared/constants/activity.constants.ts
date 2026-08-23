export interface ActivityNameFilterOption {
  value: string;
  label: string;
}

export const ACTIVITY_NAME_ALL = "ALL";

export const ACTIVITY_NAME_FILTER_OPTIONS: ActivityNameFilterOption[] = [
  { value: ACTIVITY_NAME_ALL, label: "Todas las actividades" },
  { value: "Ahorcado", label: "Ahorcado" },
  { value: "Arbol de decision", label: "Árbol de decisión" },
  { value: "Completar oracion", label: "Completar oración" },
  { value: "Desafio de clasificacion", label: "Desafío de clasificación" },
  { value: "Memorama", label: "Memorama" },
  { value: "No Ludica", label: "No lúdica" },
  { value: "Ordenar Secuencia", label: "Ordenar secuencia" },
  { value: "Preguntados", label: "Preguntados" },
];
