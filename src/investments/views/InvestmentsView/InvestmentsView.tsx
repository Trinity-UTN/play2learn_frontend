import { motion } from "framer-motion";
import { FaChartLine, FaClock, FaPiggyBank, FaRocket } from "react-icons/fa";
import InvestmentTypeCard from "../../components/InvestmentsView/InvestmentsTypeCard/InvestmentsTypeCard";
import styles from "./InvestmentsView.module.css";
import { useNavigate } from "react-router-dom";
export type InvestmentType = "acciones" | "plazo-fijo" | "caja-ahorro";

interface InvestmentsViewProps {
  onSelectType?: (type: InvestmentType) => void;
}

const InvestmentsView: React.FC<InvestmentsViewProps> = ({ onSelectType }) => {
  const navigate = useNavigate();
  const handleTypeClick = (type: InvestmentType, url: string) => {
    if (onSelectType) {
      onSelectType(type);
    }
    navigate(url);
  };
  const investmentTypes = [
    {
      type: "acciones" as InvestmentType,
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
      type: "plazo-fijo" as InvestmentType,
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
      url: "/dashboard/student/actions/list",
    },
    {
      type: "caja-ahorro" as InvestmentType,
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
      url: "/dashboard/student/actions/list",
    },
  ];

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <motion.div
            className={styles.iconContainer}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <FaRocket className={styles.headerIcon} />
          </motion.div>
          <h1 className={styles.title}>Centro de Inversiones</h1>
          <p className={styles.subtitle}>Elige cómo hacer crecer tus monedas</p>
        </div>

        {/* Investment Types Grid */}
        <div className={styles.typesGrid}>
          {investmentTypes.map((item) => (
            <InvestmentTypeCard
              key={item.type}
              {...item}
              onClick={() => handleTypeClick(item.type, item.url)}
            />
          ))}
        </div>

        {/* Educational Banner */}
        <motion.div
          className={styles.educationalBanner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className={styles.bannerIcon}>💡</div>
          <div className={styles.bannerContent}>
            <h3>¿No sabes por dónde empezar?</h3>
            <p>
              Visita nuestra sección de <strong>Educación Financiera</strong>{" "}
              para aprender sobre cada tipo de inversión y tomar decisiones
              inteligentes.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InvestmentsView;
