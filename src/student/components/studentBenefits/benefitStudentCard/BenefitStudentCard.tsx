import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import BenefitCardContent from "../../../../teacher/components/benefitsView/benefitCardComponent/benefitCardContent/BenefitCardContent";
import styles from "./BenefitStudentCard.module.css";

interface BenefitStudentCardProps {
  benefit: any;
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
      case "AVAILABLE":
        return (
          <Button
            variant="primary"
            size="sm"
            className={styles.actionButton}
            onClick={handlePurchase}
          >
            <FaShoppingCart className={styles.buttonIcon} />
            Canjear Beneficio
          </Button>
        );
      case "PURCHASED":
        return (
          <Button
            variant="secondary"
            size="sm"
            className={styles.actionButton}
            onClick={handleRequestUse}
          >
            <FaCheckCircle className={styles.buttonIcon} />
            Usar Beneficio
          </Button>
        );
      case "USE_REQUESTED":
        return (
          <Button
            variant="ghost"
            size="sm"
            className={styles.actionButton}
            disabled
          >
            Uso Solicitado
          </Button>
        );
      case "EXPIRED":
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
