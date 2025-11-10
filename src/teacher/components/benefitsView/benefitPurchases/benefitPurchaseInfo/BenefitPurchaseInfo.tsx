import { FaBook } from "react-icons/fa";
import Card from "../../../../../shared/components/Card/CardComponent";
import Badge from "../../../../../shared/components/Badge/BadgeComponent";
import type { BenefitResponseInterface } from "../../../../../benefit/types/benefit.types";
import { getSubjectColor } from "../../../../../shared/constants/subject.constants";
import {
  getIconByValue,
  getColorByValue,
  getCategoryColor,
} from "../../../../../benefit/utils/benefit.utils";
import styles from "./BenefitPurchaseInfo.module.css";

interface BenefitInfoProps {
  benefit: BenefitResponseInterface | null;
}

const BenefitPurchaseInfo: React.FC<BenefitInfoProps> = ({ benefit }) => {
  if (!benefit) {
    return null;
  }

  const name = benefit.name;
  const subjectName = benefit.subjectDto.name || "Sin materia";
  const categoryName = benefit.category || "General";
  const benefitIcon = benefit.icon || "default";
  const benefitColor = benefit.color || "#667eea";

  const subjectColor = getSubjectColor(subjectName);
  const categoryColor = getCategoryColor(categoryName);
  const BenefitIcon = getIconByValue(benefitIcon);
  const color = getColorByValue(benefitColor) ?? "#667eea";

  return (
    <Card className={styles.benefitInfoCard}>
      <div className={styles.infoHeader}>
        <div
          className={styles.iconContainer}
          style={{ backgroundColor: color }}
        >
          <BenefitIcon className={styles.benefitIcon} />
        </div>
        <div className={styles.infoContent}>
          <h3 className={styles.benefitName}>{name}</h3>
          <div className={styles.badges}>
            <Badge variant="custom" size="sm" customColor={categoryColor}>
              <FaBook className={styles.badgeIcon} />
              {categoryName}
            </Badge>
            <Badge variant="custom" size="sm" customColor={subjectColor}>
              <FaBook className={styles.badgeIcon} />
              {subjectName}
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
