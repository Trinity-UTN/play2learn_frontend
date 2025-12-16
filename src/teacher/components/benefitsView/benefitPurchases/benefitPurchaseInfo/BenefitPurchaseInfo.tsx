import { FaBook, FaGift } from "react-icons/fa";
import { Card, Badge, getSubjectColor } from "@/shared";
import type { TeacherBenefitType } from "../../../../../benefit/types/benefit.types";
import {
  getIconByValue,
  getColorByValue,
  getCategoryColor,
  isFullTeacherBenefit,
  getBenefitDisplayName,
  getBenefitSubjectName,
} from "../../../../../benefit/utils/benefit.utils";
import styles from "./BenefitPurchaseInfo.module.css";

interface BenefitInfoProps {
  benefit: TeacherBenefitType | null;
}

const BenefitPurchaseInfo: React.FC<BenefitInfoProps> = ({ benefit }) => {
  if (!benefit || !isFullTeacherBenefit(benefit)) {
    const fallbackName = benefit ? getBenefitDisplayName(benefit) : "Beneficio";
    const fallbackSubject = benefit
      ? getBenefitSubjectName(benefit) || "Sin materia"
      : "Sin materia";

    return (
      <Card className={styles.benefitInfoCard}>
        <div className={styles.infoHeader}>
          <div
            className={styles.iconContainer}
            style={{ backgroundColor: "#94a3b8" }}
          >
            <FaGift className={styles.benefitIcon} />
          </div>
          <div className={styles.infoContent}>
            <h3 className={styles.benefitName}>{fallbackName}</h3>
            <div className={styles.badges}>
              <Badge
                variant="custom"
                size="sm"
                customColor={{ bg: "#e5e7eb", text: "#374151" }}
              >
                <FaBook className={styles.badgeIcon} />
                {fallbackSubject}
              </Badge>
            </div>
          </div>
        </div>
        <p className={styles.infoDescription}>
          Estás viendo los canjes de este beneficio
        </p>
      </Card>
    );
  }

  // Aquí TypeScript sabe 100% que benefit es BenefitResponseInterface
  const { name, subjectDto, category, icon, color } = benefit;
  const subjectName = subjectDto?.name || "Sin materia";
  const categoryName = category || "General";
  const benefitIcon = icon || "default";
  const benefitColor = color || "#667eea";

  const subjectColor = getSubjectColor(subjectName);
  const categoryColor = getCategoryColor(categoryName);
  const BenefitIcon = getIconByValue(benefitIcon);
  const bgColor = getColorByValue(benefitColor) ?? "#667eea";

  return (
    <Card className={styles.benefitInfoCard}>
      <div className={styles.infoHeader}>
        <div
          className={styles.iconContainer}
          style={{ backgroundColor: bgColor }}
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
