import { FaTrash, FaEye, FaCheck } from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../../shared/components/Card/CardComponent";
import BenefitCardContent from "../../../../../benefit/components/benefitCardContent/BenefitCardContent";
import type { TeacherBenefitType } from "../../../../../benefit/types/benefit.types";
import { isBenefitUseRequested } from "../../../../../benefit/utils/benefit.utils";
import {
  getBenefitIds,
  getBenefitName,
  type BenefitActionHandlers,
} from "../../../../utils/benefitList.utils";
import styles from "./BenefitCard.module.css";

type BenefitCardProps = {
  benefit: TeacherBenefitType;
  actions: BenefitActionHandlers;
  loading?: boolean;
};

const BenefitCard: React.FC<BenefitCardProps> = ({
  benefit,
  actions,
  loading = false,
}) => {
  const isUseRequest = isBenefitUseRequested(benefit);
  const { benefitId, actualBenefitId } = getBenefitIds(benefit);
  const name = getBenefitName(benefit);

  return (
    <Card className={styles.benefitCard}>
      <BenefitCardContent benefit={benefit} isPurchase={false} />

      <div className={styles.cardActions}>
        {isUseRequest ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              className={styles.acceptButton}
              onClick={() => actions.onAcceptUse(benefitId, name)}
              disabled={loading}
            >
              <FaCheck className={styles.actionIcon} />
              Aceptar uso
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className={styles.viewRedemptionsButtonUR}
              onClick={() => actions.onViewPurchases(actualBenefitId)}
            >
              <FaEye className={styles.actionIcon} />
              Ver otros canjes
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              size="sm"
              className={styles.viewRedemptionsButton}
              onClick={() => actions.onViewPurchases(benefitId)}
            >
              <FaEye className={styles.actionIcon} />
              Ver Canjes
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={styles.deleteButton}
              onClick={() => actions.onDelete(benefitId, name)}
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
