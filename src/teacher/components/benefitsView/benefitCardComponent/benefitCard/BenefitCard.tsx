import { FaTrash, FaEye } from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../../shared/components/Card/CardComponent";
import BenefitCardContent from "../../../../../benefit/components/benefitCardContent/BenefitCardContent";
import type { TeacherBenefitType } from "../../../../../benefit/types/benefit.types";
import { useBenefitTeacherActions } from "../../../../hooks/benefits/benefitList/useBenefitTeacherActions";
import { useBenefitTeacherData } from "../../../../hooks/benefits/benefitList/useBenefitTeacherData";
import styles from "./BenefitCard.module.css";

type BenefitCardProps = {
  benefit: TeacherBenefitType;
};

const BenefitCard = ({ benefit }: BenefitCardProps) => {
  const { handleDeleteBenefit, handleViewPurchases } =
    useBenefitTeacherActions();
  const { loading } = useBenefitTeacherData();

  const benefitId = "benefitId" in benefit ? benefit.benefitId : benefit.id;
  const benefitName =
    "benefitName" in benefit ? benefit.benefitName : benefit.name;

  return (
    <Card className={styles.benefitCard}>
      {/* Contenido reutilizable */}
      <BenefitCardContent benefit={benefit} />

      {/* Acciones */}
      <div className={styles.cardActions}>
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
      </div>
    </Card>
  );
};

export default BenefitCard;
