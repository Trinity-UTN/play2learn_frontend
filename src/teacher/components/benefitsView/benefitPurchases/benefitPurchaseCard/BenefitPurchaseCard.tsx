import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import Card from "../../../../../shared/components/Card/CardComponent";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../../shared/components/Tooltip/TooltipComponent";
import BenefitCardContent from "../../../../../benefit/components/benefitCardContent/BenefitCardContent";
import type { BenefitPurchaseSimpleResponse } from "../../../../../benefit/types/benefit.types";
import {
  getPurchaseVisualState,
  formatPurchaseDate,
} from "../../../../utils/benefitPurchaseCard.utils";
import { canAcceptBenefitUse } from "../../../../../benefit/utils/benefitPurchase.utils";
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
  const canAccept = canAcceptBenefitUse(purchase.state);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getActionButton = () => {
    const {
      icon: StateIcon,
      label,
      tooltip,
      colorKey,
    } = getPurchaseVisualState(purchase);
    const usedDate = formatPurchaseDate((purchase as any).usedAt);

    // Caso: solicitud de uso -> botón accionable
    if (purchase.state === "USE_REQUESTED") {
      return (
        <Button
          variant="primary"
          size="md"
          onClick={() => onAcceptUse(purchase.id)}
          disabled={loading}
          className={styles.acceptButton}
        >
          <FaCheck /> Aceptar Uso del Beneficio
        </Button>
      );
    }

    return (
      <Tooltip content={tooltip} position="top">
        <div
          className={
            colorKey === "used"
              ? styles.usedIndicator
              : colorKey === "purchased"
              ? styles.purchasedIndicator
              : styles.purchasedIndicator
          }
        >
          {StateIcon && <StateIcon className={styles.stateIcon} />}
          <div className={styles.stateContent}>
            <span className={styles.stateLabel}>{label}</span>
            {usedDate && colorKey === "used" && (
              <span className={styles.usedDate}>{usedDate}</span>
            )}
          </div>
        </div>
      </Tooltip>
    );
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: canAccept ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`${styles.purchaseCard} ${
          !canAccept ? styles.disabled : ""
        }`}
      >
        <BenefitCardContent
          benefit={purchase}
          variant="teacher"
          isPurchase={true}
        />
        <div className={styles.cardActions}>{getActionButton()}</div>
      </Card>
    </motion.div>
  );
};

export default BenefitPurchaseCard;
