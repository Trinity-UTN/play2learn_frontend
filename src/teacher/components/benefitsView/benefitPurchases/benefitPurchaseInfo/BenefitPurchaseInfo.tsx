import { FaBook } from "react-icons/fa";
import Card from "../../../../../shared/components/Card/CardComponent";
import Badge from "../../../../../shared/components/Badge/BadgeComponent";
import { getSubjectColor } from "../../../../../shared/constants/subject.constants";
import {
  getIconByValue,
  getColorByValue,
} from "../../../../../benefit/utils/benefit.utils";
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
  const BenefitIcon = getIconByValue(purchase.benefitIcon);
  const benefitColor = getColorByValue(purchase.benefitColor) ?? "#667eea";

  return (
    <Card className={styles.benefitInfoCard}>
      <div className={styles.infoHeader}>
        <div
          className={styles.iconContainer}
          style={{ backgroundColor: benefitColor }}
        >
          <BenefitIcon className={styles.benefitIcon} />
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
