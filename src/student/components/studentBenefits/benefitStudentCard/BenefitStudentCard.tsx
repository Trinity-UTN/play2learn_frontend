import { FaShoppingCart, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import type { BenefitStudentResponseInterface } from "../../../../benefit/types/benefit.types";
import { Button, Card, Tooltip } from "@/shared";
import BenefitCardContent from "../../../../benefit/components/benefitCardContent/BenefitCardContent";
import { BENEFIT_STATUS } from "../../../../benefit/constants/benefit.constants";
import { validateBenefitPurchase } from "../../../../benefit/utils/benefit.validation";
import { useCurrentStudent } from "../../../hooks/useCurrentStudent";
import styles from "./BenefitStudentCard.module.css";

interface BenefitStudentCardProps {
  benefit: BenefitStudentResponseInterface;
  onPurchase: (benefitId: number, benefitName: string, cost: number) => void;
  onRequestUse: (benefitId: number, benefitName: string) => void;
}

const BenefitStudentCard: React.FC<BenefitStudentCardProps> = ({
  benefit,
  onPurchase,
  onRequestUse,
}) => {
  const { wallet } = useCurrentStudent();

  const handlePurchase = () => {
    onPurchase(benefit.id, benefit.name, benefit.cost);
  };

  const handleRequestUse = () => {
    onRequestUse(benefit.id, benefit.name);
  };

  const getActionButton = () => {
    switch (benefit.state) {
      case BENEFIT_STATUS.AVAILABLE: {
        const validation = validateBenefitPurchase(benefit, wallet);
        const cannotPurchase = !validation.canPurchase;

        const button = (
          <Button
            variant={cannotPurchase ? "ghost" : "primary"}
            size="sm"
            className={`${styles.actionButton} ${
              cannotPurchase ? styles.disabledButton : ""
            }`}
            disabled={cannotPurchase}
            onClick={!cannotPurchase ? handlePurchase : undefined}
          >
            <FaShoppingCart className={styles.buttonIcon} />
            {cannotPurchase ? "No disponible" : "Canjear beneficio"}
          </Button>
        );

        if (cannotPurchase) {
          return (
            <Tooltip
              content={validation.reason || "No puedes comprar este beneficio"}
              position="top"
            >
              {button}
            </Tooltip>
          );
        }

        return button;
      }
      case BENEFIT_STATUS.PURCHASED:
        return (
          <Button
            variant="secondary"
            size="sm"
            className={styles.actionButton}
            onClick={handleRequestUse}
          >
            <FaCheckCircle className={styles.buttonIcon} />
            Usar beneficio
          </Button>
        );
      case BENEFIT_STATUS.USE_REQUESTED:
        const buttonUseRequested = (
          <Button
            variant={"ghost"}
            size="sm"
            className={`${styles.actionButton} ${styles.disabledButton}`}
            disabled
          >
            <FaHourglassHalf className={styles.buttonIcon} />
            Uso solicitado
          </Button>
        );
        return (
          <Tooltip
            content="El docente debe aprobar tu solicitud de uso del beneficio"
            position="top"
          >
            {buttonUseRequested}
          </Tooltip>
        );
      case BENEFIT_STATUS.EXPIRED:
        const buttonExpired = (
          <Button
            variant={"ghost"}
            size="sm"
            className={`${styles.actionButton} ${styles.disabledButton}`}
            disabled
          >
            <FiXCircle className={styles.buttonIcon} />
            Vencido
          </Button>
        );
        return (
          <Tooltip content="El beneficio ha caducado" position="top">
            {buttonExpired}
          </Tooltip>
        );
      case BENEFIT_STATUS.USED:
        return (
          <Button
            variant="ghost"
            size="sm"
            className={`${styles.actionButton} ${styles.disabledButton}`}
            disabled
          >
            <FaCheckCircle className={styles.buttonIcon} />
            Usado
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={styles.benefitCard}>
      <BenefitCardContent benefit={benefit} variant="student" />

      {/* Acción */}
      <div className={styles.cardActions}>{getActionButton()}</div>
    </Card>
  );
};

export default BenefitStudentCard;
