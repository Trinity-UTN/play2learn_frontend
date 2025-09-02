import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { FaGift, FaSave } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import styles from "./BenefitsCreateView.module.css";
import BenefitHeader from "../../../components/benefitsView/benefitCreateView/benefitHeader/BenefitHeader";
import BenefitBasicForm from "../../../components/benefitsView/benefitCreateView/benefitBasicForm/BenefitBasicForm";
import BenefitAppearance from "../../../components/benefitsView/benefitCreateView/benefitAppearance/BenefitAppearance";
import BenefitConfiguration from "../../../components/benefitsView/benefitCreateView/benefitConfiguration/BenefitConfiguration";
// import BenefitRestrictions from "../../components/benefitsView/benefitCreateView/benefitRestrictions/BenefitRestrictions";
import BenefitPreview from "../../../components/benefitsView/benefitCreateView/benefitPreview/BenefitPreview";
import { useBenefitUI } from "../../../hooks/useBenefitUI";

const BenefitCreateView: React.FC = (): ReactElement => {
  const { handleSubmit, previewMode } = useBenefitUI();
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      {/* Header */}
      <BenefitHeader />

      <div className={styles.contentLayout}>
        {/* Form */}
        <motion.div variants={itemVariants} className={styles.formSection}>
          <Card className={styles.formCard}>
            <div className={styles.cardHeader}>
              <FaGift className={styles.headerIcon} />
              <h2 className={styles.cardTitle}>Información del Beneficio</h2>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Basic Info */}
              <BenefitBasicForm />
              {/* Category and Appearance */}
              <BenefitAppearance />
              {/* Configuration */}
              <BenefitConfiguration />

              {/* Restrictions */}

              {/* <BenefitRestrictions/> */}

              {/* Submit */}
              <div className={styles.submitSection}>
                <Button
                  type="submit"
                  variant="secondary"
                  className={styles.submitButton}
                >
                  <FaSave className={styles.buttonIcon} />
                  {""}
                  Crear Beneficio
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={styles.cancelButton}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Preview */}
        {previewMode && <BenefitPreview />}
      </div>
    </motion.div>
  );
};

export default BenefitCreateView;
