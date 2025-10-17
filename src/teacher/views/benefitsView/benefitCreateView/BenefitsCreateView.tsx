import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGift, FaSave } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import BenefitHeader from "../../../components/benefitsView/benefitCreateView/benefitHeader/BenefitHeader";
import BenefitBasicForm from "../../../components/benefitsView/benefitCreateView/benefitBasicForm/BenefitBasicForm";
import BenefitAppearance from "../../../components/benefitsView/benefitCreateView/benefitAppearance/BenefitAppearance";
import BenefitConfiguration from "../../../components/benefitsView/benefitCreateView/benefitConfiguration/BenefitConfiguration";
import BenefitPreview from "../../../components/benefitsView/benefitCreateView/benefitPreview/BenefitPreview";
import { useSubject } from "../../../../admin/hooks/useSubject";
import { useBenefitForm } from "../../../hooks/benefits/useBenefitForm";
import { useBenefitSubmit } from "../../../hooks/benefits/useBenefitSubmit";
import styles from "./BenefitsCreateView.module.css";

const BenefitCreateView: React.FC = (): ReactElement => {
  const [previewMode, setPreviewMode] = useState(false);
  const { subjects, getSubjectByTeacher } = useSubject();

  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useBenefitForm();

  const { handleSubmit } = useBenefitSubmit(formData, validateForm, resetForm);

  useEffect(() => {
    getSubjectByTeacher();
  }, [getSubjectByTeacher]);

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
      <BenefitHeader
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
      />

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
              <BenefitBasicForm
                formData={formData}
                errors={errors}
                touched={touched}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {/* Category and Appearance */}
              <BenefitAppearance formData={formData} onChange={handleChange} />

              {/* Configuration */}
              <BenefitConfiguration
                formData={formData}
                errors={errors}
                touched={touched}
                subjects={subjects}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {/* Submit */}
              <div className={styles.submitSection}>
                <Button
                  type="submit"
                  variant="secondary"
                  className={styles.submitButton}
                >
                  <FaSave className={styles.buttonIcon} />
                  Crear Beneficio
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={styles.cancelButton}
                  onClick={resetForm}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Preview */}
        {previewMode && <BenefitPreview formData={formData} />}
      </div>
    </motion.div>
  );
};

export default BenefitCreateView;
