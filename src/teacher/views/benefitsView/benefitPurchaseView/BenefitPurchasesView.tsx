import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import BenefitPurchaseInfo from "../../../components/benefitsView/benefitPurchases/benefitPurchaseInfo/BenefitPurchaseInfo";
import BenefitPurchaseFilters from "../../../components/benefitsView/benefitPurchases/benefitPurchasesFilters/BenefitPurchaseFilters";
import BenefitPurchaseList from "../../../components/benefitsView/benefitPurchases/benefitPurchaseList/BenefitPurchaseList";
import { useBenefitPurchaseData } from "../../../hooks/benefits/benefitPurchase/useBenefitPurchaseData";
import { useBenefitPurchasesActions } from "../../../hooks/benefits/benefitPurchase/useBenefitPurchaseActions";
import styles from "./BenefitPurchasesView.module.css";

const BenefitPurchasesView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const benefitId = Number.parseInt(id || "0", 10);

  const {
    loading,
    activeFilter,
    setActiveFilter,
    filteredPurchases,
    paginationInfo,
    hasPagination,
    refetch,
  } = useBenefitPurchaseData(benefitId);

  const { acceptUse, loading: acceptingUse } = useBenefitPurchasesActions();

  const handleBack = () => {
    navigate("/dashboard/teacher/beneficio/list");
  };

  const handleAcceptUse = async (purchaseId: number) => {
    await acceptUse(purchaseId);
    await refetch();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const firstPurchase =
    filteredPurchases.length > 0 ? filteredPurchases[0] : null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.purchasesView}
    >
      {/* Botón Volver */}
      <motion.div
        variants={itemVariants}
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

      {/* Info del Beneficio */}
      {firstPurchase && (
        <motion.div variants={itemVariants}>
          <BenefitPurchaseInfo purchase={firstPurchase} />
        </motion.div>
      )}

      {/* Filtros - SOLO SI HAY PAGINACIÓN */}
      {hasPagination && (
        <motion.div variants={itemVariants}>
          <BenefitPurchaseFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div variants={itemVariants} className={styles.content}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Cargando canjes...</p>
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              No hay canjes para mostrar con el filtro seleccionado
            </p>
          </div>
        ) : (
          <BenefitPurchaseList
            purchases={filteredPurchases}
            paginationInfo={paginationInfo}
            onAcceptUse={handleAcceptUse}
            loading={acceptingUse}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default BenefitPurchasesView;
