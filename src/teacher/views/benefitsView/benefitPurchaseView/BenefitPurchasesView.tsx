import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGift } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import BenefitPurchasesList from "../../../components/benefitsView/benefitPurchases/benefitPurchaseList/BenefitPurchaseList";
import { useBenefitPurchasesData } from "../../../hooks/benefits/benefitPurchase/useBenefitPurchaseData";
import { useBenefitPurchasesActions } from "../../../hooks/benefits/benefitPurchase/useBenefitPurchaseActions";
import styles from "./BenefitPurchasesView.module.css";

const BenefitPurchasesView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const benefitId = Number.parseInt(id || "0", 10);

  const {
    purchases,
    loading: loadingPurchases,
    refetch,
  } = useBenefitPurchasesData(benefitId);
  const { acceptUse, loading: acceptingUse } = useBenefitPurchasesActions();

  const handleBack = () => {
    navigate("/dashboard/teacher/beneficio/list");
  };

  const handleAcceptUse = async (benefitId: number) => {
    await acceptUse(benefitId);
    await refetch();
  };

  const benefitName =
    purchases.length > 0 ? purchases[0].benefitName : "Beneficio";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.purchasesView}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className={styles.header}>
        <Button
          variant="ghost"
          size="md"
          onClick={handleBack}
          className={styles.backButton}
        >
          <FaArrowLeft /> Volver
        </Button>
        <div className={styles.titleSection}>
          <div className={styles.titleIcon}>
            <FaGift />
          </div>
          <div>
            <h1 className={styles.title}>Canjes del Beneficio</h1>
            <p className={styles.subtitle}>{benefitName}</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants} className={styles.content}>
        {loadingPurchases ? (
          <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>Cargando canjes...</p>
          </div>
        ) : (
          <BenefitPurchasesList
            purchases={purchases}
            onAcceptUse={handleAcceptUse}
            loading={acceptingUse}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default BenefitPurchasesView;
