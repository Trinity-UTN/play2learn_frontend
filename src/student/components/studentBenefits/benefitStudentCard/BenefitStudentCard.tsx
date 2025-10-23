import { FaShoppingCart, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import type { BenefitStudentResponseInterface } from "../../../../shared/types/Benefits.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import BenefitCardContent from "../../../../teacher/components/benefitsView/benefitCardComponent/benefitCardContent/BenefitCardContent";
import { BENEFIT_STATUS } from "../../../constants/benefitStudent.constants";
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
  const handlePurchase = () => {
    onPurchase(benefit.id, benefit.name, benefit.cost);
  };

  const handleRequestUse = () => {
    onRequestUse(benefit.id, benefit.name);
  };

  const getActionButton = () => {
    switch (benefit.state) {
      case BENEFIT_STATUS.AVAILABLE: {
        const noPurchasesLeft = benefit.purchasesLeftByStudent === 0;

        const button = (
          <Button
            variant={noPurchasesLeft ? "ghost" : "primary"}
            size="sm"
            className={`${styles.actionButton} ${
              noPurchasesLeft ? styles.disabledButton : ""
            }`}
            disabled={noPurchasesLeft}
            onClick={!noPurchasesLeft ? handlePurchase : undefined}
          >
            <FaShoppingCart className={styles.buttonIcon} />
            {noPurchasesLeft ? "Sin compras disponibles" : "Canjear beneficio"}
          </Button>
        );

        if (noPurchasesLeft) {
          return (
            <Tooltip
              content="Ya utilizaste todas tus compras disponibles para este beneficio"
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
        const button = (
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
            {button}
          </Tooltip>
        );
      case BENEFIT_STATUS.EXPIRED:
        return (
          <Button
            variant="ghost"
            size="sm"
            className={styles.actionButton}
            disabled
          >
            Vencido
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
