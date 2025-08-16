import { motion } from "framer-motion";
import Card from "../../../../../shared/components/Card/CardComponent";
import styles from "./BenefitPreview.module.css";
import React from "react";
import { FaCoins } from "react-icons/fa";
import { useBenefitUI } from "../../../../hooks/useBenefitUI";

const BenefitPreview = () => {
  const { getColor, getSelectedIcon, getSelectedCategory, formData } =
    useBenefitUI();
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
              style={{ backgroundColor: getColor(formData.color) }}
            >
              {React.createElement(getSelectedIcon(formData.icon), {
                className: styles.previewIcon,
              })}
            </div>
            <div className={styles.previewInfo}>
              <h4 className={styles.previewName}>
                {formData.name || "Nombre del Beneficio"}
              </h4>
              <p className={styles.previewCategory}>
                {getSelectedCategory()?.label || "Selecciona una categoría"}
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
            {/* {formData.duration && (
                    <div className={styles.previewDuration}>
                      Duración: {formData.duration}
                    </div>
                  )} */}
          </div>

          {/* {formData.restrictions.some((r) => r.trim()) && (
                  <div className={styles.previewRestrictions}>
                    <span className={styles.previewRestrictionsTitle}>
                      Restricciones:
                    </span>
                    <ul className={styles.previewRestrictionsList}>
                      {formData.restrictions
                        .filter((r) => r.trim())
                        .slice(0, 2)
                        .map((restriction, idx) => (
                          <li key={idx}>{restriction}</li>
                        ))}
                    </ul>
                  </div>
                )} */}
        </div>
      </Card>
    </motion.div>
  );
};

export default BenefitPreview;
