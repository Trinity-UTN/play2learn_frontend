import { motion } from "framer-motion";
import { FaCheck, FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import Card from "../../../../../shared/components/Card/CardComponent";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../../shared/components/Tooltip/TooltipComponent";
import BenefitCardContent from "../../../../../benefit/components/benefitCardContent/BenefitCardContent";
import type { BenefitPurchaseSimpleResponse } from "../../../../../benefit/types/benefit.types";
import { formatPurchaseDate } from "../../../../utils/benefitPurchaseCard.utils";
import styles from "./BenefitPurchaseCard.module.css";

interface BenefitPurchaseCardProps {
  purchase: BenefitPurchaseSimpleResponse;
  onAcceptUse: (purchaseId: number) => void;
  loading: boolean;
}

const BenefitPurchaseCard: React.FC<BenefitPurchaseCardProps> = ({
  purchase,
  onAcceptUse,
  loading,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getActionButtons = () => {
    // CASO 1: Solicitud de uso pendiente (USE_REQUESTED)
    if (purchase.state === "USE_REQUESTED") {
      return (
        <Tooltip
          content="Confirmar que el estudiante ha usado este beneficio"
          position="top"
        >
          <Button
            variant="ghost"
            size="md"
            onClick={() => onAcceptUse(purchase.id)}
            disabled={loading}
            className={styles.acceptButton}
          >
            <FaCheck className={styles.actionIcon} />
            Aceptar uso del beneficio
          </Button>
        </Tooltip>
      );
    }

    // CASO 2: Beneficio ya usado (USED)
    if (purchase.state === "USED") {
      const usedDate = formatPurchaseDate((purchase as any).usedAt);
      return (
        <Tooltip
          content="Este beneficio ya fue utilizado por el estudiante"
          position="top"
        >
          <div className={styles.usedStatus}>
            <FaCheckCircle className={styles.usedIcon} />
            <div className={styles.statusContent}>
              <span className={styles.statusLabel}>Beneficio usado</span>
              <span className={styles.statusSubtext}>
                {usedDate
                  ? `El estudiante utilizó este beneficio el ${usedDate}`
                  : "El estudiante ya ha utilizado este beneficio"}
              </span>
            </div>
          </div>
        </Tooltip>
      );
    }

    // CASO 3: Beneficio comprado pero no usado (PURCHASED)
    if (purchase.state === "PURCHASED") {
      return (
        <Tooltip
          content="El estudiante ha canjeado este beneficio pero aún no ha solicitado usarlo"
          position="top"
        >
          <div className={styles.purchasedStatus}>
            <FaShoppingCart className={styles.purchasedIcon} />
            <div className={styles.statusContent}>
              <span className={styles.statusLabel}>
                Canjeado - Pendiente de Uso
              </span>
              <span className={styles.statusSubtext}>
                Esperando que el estudiante solicite su uso
              </span>
            </div>
          </div>
        </Tooltip>
      );
    }

    return null;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: purchase.state === "USE_REQUESTED" ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`${styles.purchaseCard} ${
          purchase.state !== "USE_REQUESTED" ? styles.disabledCard : ""
        }`}
      >
        <BenefitCardContent
          benefit={purchase}
          variant="teacher"
          isPurchase={true}
        />
        <div className={styles.cardActions}>{getActionButtons()}</div>
      </Card>
    </motion.div>
  );
};

export default BenefitPurchaseCard;
