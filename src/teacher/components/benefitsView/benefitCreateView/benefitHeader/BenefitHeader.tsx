import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import styles from "./BenefitHeader.module.css";

type BenefitHeaderProps = {
  previewMode: boolean;
  setPreviewMode: (value: boolean) => void;
};

const BenefitHeader = ({ previewMode, setPreviewMode }: BenefitHeaderProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.header}>
      <div>
        <h1 className={styles.title}>Crear Nuevo Beneficio</h1>
        <p className={styles.subtitle}>
          Diseña una recompensa para motivar a los estudiantes
        </p>
      </div>
      <div className={styles.headerActions}>
        <Button
          variant="outline"
          onClick={() => setPreviewMode(!previewMode)}
          className={styles.previewButton}
        >
          <FaInfoCircle className={styles.buttonIcon} />
          {previewMode ? "Ocultar Vista Previa" : "Vista Previa"}
        </Button>
      </div>
    </motion.div>
  );
};

export default BenefitHeader;
