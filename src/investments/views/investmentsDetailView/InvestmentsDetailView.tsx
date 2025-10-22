import { motion } from "framer-motion";
import { FaArrowLeft, FaChartLine } from "react-icons/fa";
import styles from "./InvestmentsDetailView.module.css";

interface InvestmentDetailViewProps {
  investmentId?: number;
  onBack?: () => void;
}

const InvestmentDetailView: React.FC<InvestmentDetailViewProps> = ({
  investmentId,
  onBack,
}) => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className={styles.backButton} onClick={onBack}>
          <FaArrowLeft />
          <span>Volver a Inversiones</span>
        </button>

        <div className={styles.placeholder}>
          <FaChartLine className={styles.placeholderIcon} />
          <h2>Detalles de la Inversión #{investmentId}</h2>
          <p>
            Esta sección mostrará el gráfico y análisis detallado de la
            inversión.
          </p>
          <p className={styles.comingSoon}>Próximamente...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default InvestmentDetailView;
