import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import LoadingSpinnerComponent from "../../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import BenefitPurchaseInfo from "../../../components/benefitsView/benefitPurchases/benefitPurchaseInfo/BenefitPurchaseInfo";
import BenefitPurchaseFilters from "../../../components/benefitsView/benefitPurchases/benefitPurchasesFilters/BenefitPurchaseFilters";
import BenefitPurchaseList from "../../../components/benefitsView/benefitPurchases/benefitPurchaseList/BenefitPurchaseList";
import {
  benefitPurchasesContainerVariants,
  benefitItemVariants,
} from "../../../constants/animations/benefitTeacher.animations";
import { useBenefitPurchaseView } from "../../../hooks/benefits/benefitPurchase/useBenefitPurchaseView";
import styles from "./BenefitPurchasesView.module.css";

const BenefitPurchasesView: React.FC = () => {
  const {
    selectedBenefit,
    loading,
    activeFilter,
    setActiveFilter,
    filteredPurchases,
    paginationInfo,
    hasPagination,
    handleBack,
    handleAcceptUse,
  } = useBenefitPurchaseView();

  return (
    <motion.div
      variants={benefitPurchasesContainerVariants}
      initial="hidden"
      animate="visible"
      className={styles.purchasesView}
    >
      {/* Botón Volver */}
      <motion.div
        variants={benefitItemVariants}
        className={styles.backButtonContainer}
      >
        <Button
          variant="ghost"
          size="md"
          onClick={handleBack}
          className={styles.backButton}
        >
          <FaArrowLeft /> Volver a Beneficios
        </Button>
      </motion.div>

      {/* Información del Beneficio */}
      <motion.div variants={benefitItemVariants}>
        <BenefitPurchaseInfo benefit={selectedBenefit} />
      </motion.div>

      {/* Filtros - Solo si hay paginación */}
      {hasPagination && (
        <motion.div variants={benefitItemVariants} className={styles.filters}>
          <BenefitPurchaseFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>
      )}

      {/* Lista de Canjes */}
      <motion.div variants={benefitItemVariants} className={styles.content}>
        {loading ? (
          <LoadingSpinnerComponent color="#f76300" />
        ) : (
          <BenefitPurchaseList
            purchases={filteredPurchases}
            paginationInfo={paginationInfo}
            onAcceptUse={handleAcceptUse}
            loading={loading}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default BenefitPurchasesView;
