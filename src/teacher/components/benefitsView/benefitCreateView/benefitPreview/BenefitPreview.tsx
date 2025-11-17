import { motion } from "framer-motion";
import Card from "../../../../../shared/components/Card/CardComponent";
import BenefitCardContent from "../../../../../benefit/components/benefitCardContent/BenefitCardContent";
import type { CreateBenefitInterface } from "../../../../../benefit/types/benefit.types";
import styles from "./BenefitPreview.module.css";

type BenefitPreviewProps = {
  formData: CreateBenefitInterface;
};

const BenefitPreview = ({ formData }: BenefitPreviewProps) => {
  const previewVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={previewVariants}
      initial="hidden"
      animate="visible"
      className={styles.previewSection}
    >
      <Card className={styles.previewCard}>
        <h3 className={styles.previewTitle}>Vista Previa</h3>
        <div className={styles.benefitPreview}>
          {/* Status Badge
          <div className={styles.previewHeader}>
            <span className={styles.statusBadge}>Activo</span>
          </div> */}

          {/* Contenido reutilizable */}
          <BenefitCardContent benefit={formData} isPreview />
        </div>
      </Card>
    </motion.div>
  );
};

export default BenefitPreview;
