import { FaChartLine, FaClock, FaPiggyBank } from "react-icons/fa";

export const investmentTypes = [
  {
    type: "acciones",
    title: "Acciones",
    description:
      "Compra y vende acciones de empresas virtuales. Mayor riesgo, mayor recompensa.",
    icon: FaChartLine,
    color: "var(--color-stat-4)",
    features: [
      "Gráficos en tiempo real",
      "Trading activo",
      "Alto potencial de ganancia",
      "Riesgo variable",
    ],
    delay: 0.1,
    url: "/dashboard/student/actions/list",
  },
  {
    type: "plazo-fijo",
    title: "Plazo Fijo",
    description:
      "Deposita tus monedas por un tiempo determinado y gana intereses garantizados.",
    icon: FaClock,
    color: "var(--color-stat-2)",
    features: [
      "Interés garantizado",
      "Diferentes plazos disponibles",
      "Bajo riesgo",
      "Rendimiento predecible",
    ],
    delay: 0.2,
    url: "/dashboard/student/plazo-fijo/list",
  },
  {
    type: "caja-ahorro",
    title: "Caja de Ahorro",
    description:
      "Guarda tus monedas de forma segura y gana intereses diarios sin compromisos.",
    icon: FaPiggyBank,
    color: "var(--color-stat-3)",
    features: [
      "Acceso inmediato",
      "Interés diario",
      "Sin plazo mínimo",
      "100% líquido",
    ],
    delay: 0.3,
    url: "/dashboard/student/caja-de-ahorro/list",
  },
];
