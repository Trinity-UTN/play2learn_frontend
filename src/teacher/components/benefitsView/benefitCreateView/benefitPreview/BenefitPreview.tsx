import React from "react";
import { motion } from "framer-motion";
import { FaCoins } from "react-icons/fa";
import Card from "../../../../../shared/components/Card/CardComponent";
import type { CreateBenefitInterface } from "../../../../types/Benefits.type";
import {
  getIconByValue,
  getCategoryByValue,
  getColorByValue,
} from "../../../../utils/benefits.utils";
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
          {/* Preview Header */}
          <div className={styles.previewHeader}>
            <span className={styles.statusBadge}>Activo</span>
          </div>

          {/* Preview Content */}
          <div className={styles.previewContent}>
            <div
              className={styles.previewIconWrapper}
              style={{ backgroundColor: getColorByValue(formData.color) }}
            >
              {React.createElement(getIconByValue(formData.icon), {
                className: styles.previewIcon,
              })}
            </div>
            <div className={styles.previewInfo}>
              <h4 className={styles.previewName}>
                {formData.name || "Nombre del Beneficio"}
              </h4>
              <p className={styles.previewCategory}>
                {getCategoryByValue(formData.category)?.label ||
                  "Selecciona una categoría"}
              </p>
            </div>
          </div>

          <p className={styles.previewDescription}>
            {formData.description ||
              "Descripción del beneficio aparecerá aquí..."}
          </p>

          <div className={styles.previewStats}>
            <div className={styles.previewCost}>
              <FaCoins className={styles.previewCostIcon} />
              <span>{formData.cost || "0"} puntos</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BenefitPreview;
