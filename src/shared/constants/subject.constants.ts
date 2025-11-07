export const COMMON_SECONDARY_SUBJECTS = [
  "Matemática",
  "Lengua",
  "Inglés",
  "Ciencias Naturales",
  "Biología",
  "Física",
  "Química",
  "Historia",
  "Geografía",
  "Educación Física",
  "Educación Artística",
  "Tecnología",
  "Informática",
  "Filosofía",
  "Ética",
];

export const SUBJECT_COLORS: Record<string, { bg: string; text: string }> = {
  // === ÁREA MATEMÁTICA Y LÓGICA ===
  Matematica: {
    bg: "#2563eb",
    text: "#ffffff",
  },
  Matemática: {
    bg: "#2563eb",
    text: "#ffffff",
  },

  // === COMUNICACIÓN Y LENGUAJE ===
  Lengua: {
    bg: "#dc2626",
    text: "#ffffff",
  },
  Literatura: {
    bg: "#b91c1c",
    text: "#ffffff",
  },

  // === CIENCIAS NATURALES ===
  "Ciencias Naturales": {
    bg: "#16a34a",
    text: "#ffffff",
  },
  Biologia: {
    bg: "#15803d",
    text: "#ffffff",
  },
  Biología: {
    bg: "#15803d",
    text: "#ffffff",
  },
  Quimica: {
    bg: "#22c55e",
    text: "#ffffff",
  },
  Química: {
    bg: "#22c55e",
    text: "#ffffff",
  },
  Fisica: {
    bg: "#14532d",
    text: "#ffffff",
  },
  Física: {
    bg: "#14532d",
    text: "#ffffff",
  },

  // === CIENCIAS SOCIALES Y HUMANAS ===
  "Ciencias Sociales": {
    bg: "#d97706",
    text: "#ffffff",
  },
  Geografia: {
    bg: "#0284c7",
    text: "#ffffff",
  },
  Geografía: {
    bg: "#0284c7",
    text: "#ffffff",
  },
  Historia: {
    bg: "#ca8a04",
    text: "#ffffff",
  },
  Ciudadania: {
    bg: "#d97706",
    text: "#ffffff",
  },
  Ciudadanía: {
    bg: "#d97706",
    text: "#ffffff",
  },

  // === IDIOMAS ===
  Ingles: {
    bg: "#4f46e5",
    text: "#ffffff",
  },
  Inglés: {
    bg: "#4f46e5",
    text: "#ffffff",
  },

  // === EDUCACIÓN FÍSICA ===
  "Educacion Fisica": {
    bg: "#15803d",
    text: "#ffffff",
  },
  "Educación Física": {
    bg: "#15803d",
    text: "#ffffff",
  },

  // === ARTE Y EXPRESIÓN ===
  Arte: {
    bg: "#db2777",
    text: "#ffffff",
  },
  "Artes Visuales": {
    bg: "#be185d",
    text: "#ffffff",
  },
  Musica: {
    bg: "#7c3aed",
    text: "#ffffff",
  },
  Música: {
    bg: "#7c3aed",
    text: "#ffffff",
  },

  // === TECNOLOGÍA Y CIENCIAS APLICADAS ===
  Tecnologia: {
    bg: "#0284c7",
    text: "#ffffff",
  },
  Tecnología: {
    bg: "#0284c7",
    text: "#ffffff",
  },
  Informatica: {
    bg: "#0369a1",
    text: "#ffffff",
  },
  Informática: {
    bg: "#0369a1",
    text: "#ffffff",
  },
  FPV: {
    bg: "#0e7490",
    text: "#ffffff",
  },
  "Formación Profesional": {
    bg: "#0e7490",
    text: "#ffffff",
  },
};

export const getSubjectColor = (subject: string) => {
  return SUBJECT_COLORS[subject] || { bg: "#6b7280", text: "#ffffff" };
};
