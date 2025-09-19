import type { Activity } from "../types/TeacherActivity.type";

export const activities: Activity[] = [
  {
    id: 1,
    code_game: "ahorcado_educativo",
    name: "Ahorcado Educativo",
    type: "Juego de Palabras",
    description:
      "Adivina la palabra oculta letra por letra. Perfecto para mejorar vocabulario y ortografía.",
    color: "#b9e769",
    isPopular: true,
  },
  {
    id: 2,
    code_game: "completar_oraciones",
    name: "Completar Oraciones",
    type: "Ejercicio Gramatical",
    description:
      "Completa las oraciones con las palabras correctas para formar textos coherentes.",
    color: "#ff6f3c",
  },
  {
    id: 3,
    code_game: "preguntados",
    name: "Preguntados",
    type: "Trivia Educativa",
    description:
      "Responde preguntas de múltiple opción sobre diferentes materias y temas.",
    color: "#007bff",
    isPopular: true,
  },
  {
    id: 4,
    name: "Ordenar Secuencias",
    code_game: "ordenar_secuencia",
    type: "Lógica y Orden",
    description:
      "Organiza elementos en el orden correcto según criterios específicos.",
    color: "#9333ea",
  },
  {
    id: 5,
    code_game: "memorama",
    name: "Memorama",
    type: "Juego de Memoria",
    description: "Relaciona conceptos con sus imágenes correspondientes.",
    color: "#f9c74f",
  },
  {
    id: 6,
    name: "Desafio de Clasificación",
    code_game: "desafio_clasificacion",
    type: "Juego de Memoria",
    description: "Relacione los conceptos con su categoria correspondiente.",
    color: "#dc2626",
    isNew: true,
  },
  {
    id: 7,
    code_game: "arbol_decision",
    name: "Árbol de Decisión",
    type: "Lógica y Clasificación",
    description:
      "Analiza diferentes opciones y clasifica la información para llegar a una conclusión",
    color: "#ef4444",
    isNew: true,
  },
  {
    id: 8,
    code_game: "no_ludica",
    name: "Actividad No Lúdica",
    type: "Trabajo Práctico",
    description:
      "Actividad orientada a producciones escritas, reflexiones o presentaciones.",
    color: "#f59e0b",
  },
];
