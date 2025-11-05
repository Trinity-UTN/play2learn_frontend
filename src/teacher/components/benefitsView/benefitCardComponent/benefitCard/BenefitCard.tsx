import { FaTrash, FaEye, FaCheck } from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../../shared/components/Card/CardComponent";
import BenefitCardContent from "../../../../../benefit/components/benefitCardContent/BenefitCardContent";
import type { TeacherBenefitType } from "../../../../../benefit/types/benefit.types";
import { isBenefitUseRequested } from "../../../../../benefit/utils/benefit.utils";
import { useBenefitTeacherActions } from "../../../../hooks/benefits/benefitList/useBenefitTeacherActions";
import { useBenefitTeacherData } from "../../../../hooks/benefits/benefitList/useBenefitTeacherData";
import styles from "./BenefitCard.module.css";

type BenefitCardProps = {
  benefit: TeacherBenefitType;
};

const BenefitCard = ({ benefit }: BenefitCardProps) => {
  const { handleDeleteBenefit, handleViewPurchases, handleAcceptUseBenefit } =
    useBenefitTeacherActions();
  const { loading } = useBenefitTeacherData();

  const isUseRequest = isBenefitUseRequested(benefit);

  // Extraer IDs según el tipo
  const benefitId = isUseRequest ? benefit.id : benefit.id;
  const actualBenefitId = isUseRequest ? benefit.benefitId : benefit.id;
  const benefitName = isUseRequest ? benefit.benefitName : benefit.name;

  return (
    <Card className={styles.benefitCard}>
      {/* Contenido reutilizable */}
      <BenefitCardContent benefit={benefit} />

      {/* Acciones dinámicas según el tipo */}
      <div className={styles.cardActions}>
        {isUseRequest ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              className={styles.acceptButton}
              onClick={() => handleAcceptUseBenefit(benefitId, benefitName)}
              disabled={loading}
            >
              <FaCheck className={styles.actionIcon} />
              Aceptar Uso
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={styles.viewRedemptionsButton}
              onClick={() => handleViewPurchases(actualBenefitId)}
            >
              <FaEye className={styles.actionIcon} />
              Ver Otros Canjes
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              size="sm"
              className={styles.viewRedemptionsButton}
              onClick={() => handleViewPurchases(benefitId)}
            >
              <FaEye className={styles.actionIcon} />
              Ver Canjes
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={styles.deleteButton}
              onClick={() => handleDeleteBenefit(benefitId, benefitName)}
              disabled={loading}
            >
              <FaTrash className={styles.actionIcon} />
              Eliminar
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default BenefitCard;
