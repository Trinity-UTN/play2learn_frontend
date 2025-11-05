import { FaTrash } from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../../shared/components/Card/CardComponent";
import BenefitCardContent from "../../../../../benefit/components/benefitCardContent/BenefitCardContent";
import type { BenefitResponseInterface } from "../../../../../benefit/types/benefit.types";
import styles from "./BenefitCard.module.css";

type BenefitCardProps = {
  benefit: BenefitResponseInterface;
};

const BenefitCard = ({ benefit }: BenefitCardProps) => {
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
          // onClick={() => navigate(`/admin/benefits/${benefit.id}/redemptions`)}
        >
          Ver Canjes
        </Button>

        <Button variant="ghost" size="sm" className={styles.deleteButton}>
          <FaTrash className={styles.actionIcon} />
          Eliminar
        </Button>
      </div>
    </Card>
  );
};

export default BenefitCard;
