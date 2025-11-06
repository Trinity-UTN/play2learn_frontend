import { FaGift, FaBook } from "react-icons/fa";
import Card from "../../../../../shared/components/Card/CardComponent";
import Badge from "../../../../../shared/components/Badge/BadgeComponent";
import { getSubjectColor } from "../../../../../shared/constants/subject.constants";
import type { BenefitPurchaseSimpleResponse } from "../../../../../benefit/types/benefit.types";
import styles from "./BenefitPurchaseInfo.module.css";

interface BenefitInfoProps {
  purchase: BenefitPurchaseSimpleResponse | null;
}

const BenefitPurchaseInfo: React.FC<BenefitInfoProps> = ({ purchase }) => {
  if (!purchase) {
    return null;
  }

  const subjectColor = getSubjectColor(purchase.subjectName);

  return (
    <Card className={styles.benefitInfoCard}>
      <div className={styles.infoHeader}>
        <div className={styles.iconContainer}>
          <FaGift className={styles.giftIcon} />
        </div>
        <div className={styles.infoContent}>
          <h3 className={styles.benefitName}>{purchase.benefitName}</h3>
          <div className={styles.badges}>
            <Badge variant="custom" size="sm" customColor={subjectColor}>
              <FaBook className={styles.badgeIcon} />
              {purchase.subjectName}
            </Badge>
          </div>
        </div>
      </div>
      <p className={styles.infoDescription}>
        Estás viendo los canjes de este beneficio
      </p>
    </Card>
  );
};

export default BenefitPurchaseInfo;
