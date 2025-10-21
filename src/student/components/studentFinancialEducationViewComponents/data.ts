import {
  FaWallet,
  FaChartLine,
  FaBullseye,
  FaPiggyBank,
  FaBalanceScale,
  FaRocket,
} from "react-icons/fa";
import type { IconType } from "react-icons";

export interface FinancialConcept {
  id: string;
  title: string;
  icon: IconType;
  color: string;
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  description: string;
  detailedExplanation: string;
  examples: string[];
  practicalTips: string[];
  relatedConcepts: string[];
}

export const financialConcepts: FinancialConcept[] = [
  {
    id: "liquidity",
    title: "Liquidez",
    icon: FaWallet,
    color: "#10B981",
    difficulty: "Básico",
    description:
      "La facilidad con la que puedes convertir tus activos en dinero efectivo para usar inmediatamente.",
    detailedExplanation:
      "La liquidez es un concepto fundamental en finanzas personales. Se refiere a qué tan rápido y fácil puedes acceder a tu dinero cuando lo necesitas. Un activo muy líquido es aquel que puedes convertir en efectivo de inmediato sin perder valor. Por ejemplo, las monedas en tu billetera son 100% líquidas porque las puedes usar en cualquier momento. En cambio, si inviertes esas monedas en un plazo fijo, pierdes liquidez temporalmente, pero ganas intereses a cambio.",
    examples: [
      "Tener 100 monedas en tu billetera = Alta liquidez (puedes comprar algo ahora mismo)",
      "Tener 100 monedas invertidas a 30 días = Baja liquidez (no puedes usarlas hasta que termine el plazo)",
      "Una casa tiene baja liquidez porque toma tiempo venderla",
      "El dinero en efectivo tiene la máxima liquidez posible",
    ],
    practicalTips: [
      "Mantén siempre una parte de tus monedas disponibles para compras urgentes",
      "No inviertas todo tu dinero si puedes necesitarlo pronto",
      "Antes de invertir, pregúntate: ¿podré esperar sin necesitar este dinero?",
      "Balancea entre tener dinero disponible y hacer crecer tus ahorros",
    ],
    relatedConcepts: ["investment", "savings"],
  },
  {
    id: "investment",
    title: "Inversión",
    icon: FaChartLine,
    color: "#3B82F6",
    difficulty: "Intermedio",
    description:
      "Usar tu dinero para generar más dinero en el futuro, aunque no puedas usarlo inmediatamente.",
    detailedExplanation:
      "Invertir significa poner tu dinero a trabajar para ti. En lugar de simplemente guardar tus monedas, las usas de una forma que te genere más monedas con el tiempo. La clave de la inversión es la paciencia: aceptas no poder usar ese dinero por un tiempo a cambio de recibir más dinero después. En nuestra plataforma, puedes invertir tus monedas en diferentes opciones con distintos plazos y recompensas. Mientras más tiempo inviertas, generalmente más ganancias obtendrás.",
    examples: [
      "Inviertes 100 monedas por 7 días y recibes 105 monedas (ganaste 5%)",
      "Inviertes 100 monedas por 30 días y recibes 115 monedas (ganaste 15%)",
      "Si reinviertes las ganancias, tus monedas crecen aún más rápido (interés compuesto)",
      "Inversión de bajo riesgo: ganas poco pero es seguro. Alto riesgo: puedes ganar mucho o perder",
    ],
    practicalTips: [
      "Empieza invirtiendo pequeñas cantidades hasta entender cómo funciona",
      "No inviertas dinero que vayas a necesitar pronto",
      "Diversifica: no pongas todas tus monedas en una sola inversión",
      "Lee bien los términos antes de invertir: plazo, ganancia esperada, riesgo",
      "Mientras más largo el plazo, generalmente más alta la ganancia",
    ],
    relatedConcepts: ["liquidity", "compound-interest", "risk-return"],
  },
  {
    id: "planned-spending",
    title: "Gasto Planificado",
    icon: FaBullseye,
    color: "#F59E0B",
    difficulty: "Básico",
    description:
      "Decidir con anticipación en qué vas a gastar tu dinero para evitar compras impulsivas.",
    detailedExplanation:
      "El gasto planificado es una habilidad esencial para manejar bien tu dinero. Consiste en pensar antes de comprar: ¿realmente necesito esto? ¿cuánto cuesta? ¿tengo suficiente dinero? En lugar de gastar impulsivamente cuando ves algo que te gusta, te tomas un tiempo para evaluar si es una buena decisión. Esto te ayuda a evitar arrepentimientos y a usar tu dinero de forma más inteligente. Planificar tus gastos también te permite ahorrar para cosas más importantes que realmente quieres.",
    examples: [
      "Planificas comprar un avatar de 200 monedas: ahorras 50 por semana durante 4 semanas",
      "Ves un sombrero de 150 monedas, pero decides esperar 3 días para pensarlo mejor",
      "Haces una lista de prioridades: primero compro lo que necesito, luego lo que quiero",
      "Comparas precios antes de comprar: el mismo item puede costar menos en otro momento",
    ],
    practicalTips: [
      "Antes de comprar algo, espera 24 horas y piensa si todavía lo quieres",
      "Haz una lista de cosas que quieres comprar y ordénalas por prioridad",
      "Pregúntate: ¿lo necesito o solo lo quiero? Ambas respuestas son válidas, pero ayudan a decidir",
      "Compara el precio con cuánto esfuerzo te costó ganar esas monedas",
      "Evita comprar solo porque está en oferta si no lo necesitas",
    ],
    relatedConcepts: ["savings", "liquidity"],
  },
  {
    id: "savings",
    title: "Ahorro",
    icon: FaPiggyBank,
    color: "#8B5CF6",
    difficulty: "Básico",
    description:
      "Guardar parte de tu dinero para usarlo en el futuro, ya sea para metas específicas o emergencias.",
    detailedExplanation:
      "Ahorrar es separar una parte de tus monedas en lugar de gastarlas todas. Es como guardar un poco de tu comida favorita para después. El ahorro te da seguridad: si necesitas monedas urgentemente, las tienes disponibles. También te permite alcanzar metas grandes que no podrías pagar de una sola vez. La clave del ahorro exitoso es la constancia: es mejor ahorrar poco pero seguido, que intentar ahorrar mucho de golpe. Incluso pequeñas cantidades se acumulan con el tiempo.",
    examples: [
      "Ahorras 20 monedas cada semana. En 10 semanas tienes 200 monedas para algo especial",
      "De cada 100 monedas que ganas, ahorras 20 (regla del 20%)",
      "Creas un fondo de emergencia: 50 monedas que solo usas si realmente lo necesitas",
      'Ahorras para un objetivo específico: "Quiero 500 monedas para comprar ese avatar épico"',
    ],
    practicalTips: [
      "Establece una meta de ahorro clara y específica",
      "Ahorra un porcentaje fijo de cada moneda que ganes (ej: 10% o 20%)",
      "Crea fondos separados: ahorro para metas, ahorro de emergencia",
      "Celebra cuando alcances tus metas de ahorro (¡pero sin gastar todo!)",
      'Haz del ahorro un hábito automático: "Primero ahorro, luego gasto"',
      "Usa visualizaciones: dibuja un termómetro que sube mientras ahorras",
    ],
    relatedConcepts: ["planned-spending", "investment"],
  },
  {
    id: "risk-return",
    title: "Riesgo vs Retorno",
    icon: FaBalanceScale,
    color: "#EF4444",
    difficulty: "Avanzado",
    description:
      "A mayor riesgo, mayor posible ganancia, pero también mayor posible pérdida.",
    detailedExplanation:
      'El concepto de riesgo vs retorno es fundamental en inversiones. En términos simples: si quieres ganar mucho, tienes que arriesgar más, pero también podrías perder. Es como en un videojuego: las misiones difíciles dan más recompensas, pero también es más probable que falles. En finanzas, una inversión "segura" te da pocas ganancias pero casi no hay riesgo de perder. Una inversión "arriesgada" puede darte muchas ganancias, pero también podrías perder tu dinero. La clave es encontrar el balance correcto según tu situación y cuánto estás dispuesto a arriesgar.',
    examples: [
      "Inversión segura: Depositas 100 monedas y ganas 5 monedas garantizadas (+5%)",
      "Inversión moderada: Depositas 100 monedas, puedes ganar 15 o perder 5 (+15% / -5%)",
      "Inversión arriesgada: Depositas 100 monedas, puedes ganar 50 o perder 30 (+50% / -30%)",
      "Competencia: Apuestas 50 monedas. Si ganas el torneo, recibes 200. Si pierdes, pierdes las 50",
    ],
    practicalTips: [
      "Nunca arriesgues dinero que no puedes permitirte perder",
      "Empieza con inversiones de bajo riesgo hasta entender cómo funcionan",
      "Diversifica: no pongas todo tu dinero en una inversión arriesgada",
      "Lee bien la información: ¿cuál es el mejor y peor escenario posible?",
      "Pregúntate: ¿cómo me sentiría si pierdo este dinero?",
      "El riesgo no es malo, pero debe ser calculado e informado",
    ],
    relatedConcepts: ["investment", "savings"],
  },
  {
    id: "compound-interest",
    title: "Interés Compuesto",
    icon: FaRocket,
    color: "#06B6D4",
    difficulty: "Avanzado",
    description:
      "Ganar dinero no solo sobre tu inversión inicial, sino también sobre las ganancias anteriores.",
    detailedExplanation:
      'El interés compuesto es uno de los conceptos más poderosos en finanzas. Albert Einstein supuestamente lo llamó "la octava maravilla del mundo". Funciona así: cuando inviertes dinero y ganas intereses, en lugar de retirar esas ganancias, las dejas invertidas. Entonces, la próxima vez, ganas intereses sobre tu inversión original MÁS sobre los intereses que ya ganaste. Es como una bola de nieve que rueda cuesta abajo: empieza pequeña pero se hace cada vez más grande. Con tiempo y paciencia, el interés compuesto puede hacer crecer tu dinero de forma increíble.',
    examples: [
      "Año 1: Inviertes 100 monedas al 10%. Al final tienes 110 monedas",
      "Año 2: Los 110 generan 10% más = 121 monedas (no 120, porque ganaste sobre 110)",
      "Año 3: Los 121 generan 10% más = 133 monedas",
      "En 10 años, tus 100 monedas se convierten en 259 monedas sin agregar nada más",
      "Si además agregas 10 monedas cada mes, el crecimiento es aún más rápido",
    ],
    practicalTips: [
      "Empieza a invertir lo antes posible: el tiempo es tu mejor aliado",
      "Reinvierte las ganancias en lugar de gastarlas para aprovechar el efecto compuesto",
      "Sé consistente: invierte regularmente, aunque sean cantidades pequeñas",
      "Ten paciencia: el interés compuesto necesita tiempo para mostrar su magia",
      "Usa calculadoras de interés compuesto para ver cómo crece tu dinero",
      "Recuerda: pequeñas diferencias en tasas hacen grandes diferencias con el tiempo",
    ],
    relatedConcepts: ["investment", "savings"],
  },
];

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "Básico":
      return "#10B981";
    case "Intermedio":
      return "#F59E0B";
    case "Avanzado":
      return "#EF4444";
    default:
      return "#6B7280";
  }
};

export const getConceptById = (id: string): FinancialConcept | undefined => {
  return financialConcepts.find((concept) => concept.id === id);
};

export const getConceptsByDifficulty = (
  difficulty: string
): FinancialConcept[] => {
  return financialConcepts.filter(
    (concept) => concept.difficulty === difficulty
  );
};
