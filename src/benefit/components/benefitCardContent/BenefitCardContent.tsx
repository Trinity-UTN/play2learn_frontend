import {
  FaHashtag,
  FaCoins,
  FaUsers,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import Badge from "../../../shared/components/Badge/BadgeComponent";
import Tooltip from "../../../shared/components/Tooltip/TooltipComponent";
import type {
  BenefitResponseInterface,
  BenefitStudentResponseInterface,
  CreateBenefitInterface,
  TeacherBenefitType,
} from "../../types/benefit.types";
import {
  formatBenefitDate,
  formatPurchaseLimitText,
  formatPurchaseLimitPerStudentText,
} from "../../utils/benefit.utils";
import { getPurchaseStateConfig } from "../../utils/benefitCard.utils";
import type { BenefitVariant } from "../../types/benefit.types";
import { useBenefitCardData } from "../../hooks/useBenefitCardData";
import styles from "./BenefitCardContent.module.css";

type BenefitCardContentProps = {
  benefit:
    | BenefitResponseInterface
    | BenefitStudentResponseInterface
    | CreateBenefitInterface
    | TeacherBenefitType;
  isPreview?: boolean;
  variant?: BenefitVariant;
  isPurchase?: boolean;
};

const BenefitCardContent = ({
  benefit,
  isPreview = false,
  variant = "teacher",
  isPurchase = false,
}: BenefitCardContentProps) => {
  const {
    IconComponent,
    iconColor,
    category,
    styleSuffix,
    purchaseLimit,
    purchaseLimitPerStudent,
    hasEndDate,
    showStats,
    benefitName,
    benefitCost,
    descriptionText,
    subjectName,
    subjectColor,
    categoryColor,
    isUseRequest,
    isPurchaseCard,
    studentName,
    purchaseState,
    purchaseId,
  } = useBenefitCardData({ benefit, variant, isPreview, isPurchase });

  if (isPurchaseCard) {
    const stateConfig = getPurchaseStateConfig(purchaseState);

    return (
      <div className={styles.purchaseContent}>
        <div className={styles.purchaseHeader}>
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: iconColor }}
          >
            <IconComponent className={styles.benefitIcon} />
          </div>
          <div className={styles.purchaseInfo}>
            <h3 className={styles.studentNamePurchase}>{studentName}</h3>
            <div className={styles.purchaseBadges}>
              <Badge variant="custom" size="sm" customColor={stateConfig.color}>
                {stateConfig.label}
              </Badge>
              <Badge
                variant="custom"
                size="sm"
                customColor={{ bg: "#f3f4f6", text: "#6b7280" }}
              >
                <FaHashtag className={styles.badgeIcon} />
                Canje #{purchaseId}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista normal (no purchase)
  return (
    <div className={styles.contentContainer}>
      <div className={styles.benefitHeader}>
        <div
          className={styles.iconWrapper}
          style={{ backgroundColor: iconColor }}
        >
          <IconComponent className={styles.benefitIcon} />
        </div>
        <div className={styles.benefitInfo}>
          <h3 className={styles[`benefitName${styleSuffix}`]}>{benefitName}</h3>
          <div className={styles.benefitMeta}>
            {isUseRequest ? (
              <Badge variant="custom" size="sm" customColor={categoryColor}>
                Solicitud de Uso
              </Badge>
            ) : (
              <>
                {category && categoryColor && (
                  <Badge variant="custom" size="sm" customColor={categoryColor}>
                    {category.label}
                  </Badge>
                )}
                {!category && isPreview && categoryColor && (
                  <Badge variant="custom" size="sm" customColor={categoryColor}>
                    Categoría
                  </Badge>
                )}
              </>
            )}
            {subjectName && subjectColor && (
              <Badge variant="custom" size="sm" customColor={subjectColor}>
                {subjectName}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {isUseRequest && studentName ? (
        <div className={styles.requestInfo}>
          <FaUser className={styles.studentIcon} />
          <p className={styles[`benefitDescription${styleSuffix}`]}>
            Solicitado por: <strong>{studentName}</strong>
          </p>
        </div>
      ) : (
        <p className={styles[`benefitDescription${styleSuffix}`]}>
          {descriptionText}
        </p>
      )}

      {hasEndDate && "endAt" in benefit && benefit.endAt && (
        <div className={styles.endDateSection}>
          <FaCalendarAlt className={styles.endDateIcon} />
          <span className={styles.endDateText}>
            Finaliza: <strong>{formatBenefitDate(benefit.endAt)}</strong>
          </span>
        </div>
      )}

      {showStats && !isUseRequest && (
        <div className={styles[`benefitStats${styleSuffix}`]}>
          <div className={styles.costSection}>
            <Tooltip content="Costo">
              <FaCoins className={styles[`costIcon${styleSuffix}`]} />
            </Tooltip>
            <span className={styles[`costValue${styleSuffix}`]}>
              {benefitCost} monedas
            </span>
          </div>

          <div className={styles.limitSection}>
            <Tooltip content="Cantidad de veces que puede canjearse" long>
              <FaUsers className={styles.limitIcon} />
            </Tooltip>
            <span className={styles[`limitValue${styleSuffix}`]}>
              {formatPurchaseLimitText(purchaseLimit, variant)}
            </span>
          </div>

          <div className={styles.limitPerStudentSection}>
            <Tooltip
              content="Cantidad de veces que puede canjearlo un estudiante"
              long
            >
              <FaUser className={styles.limitPerStudentIcon} />
            </Tooltip>
            <span className={styles[`limitPerStudentValue${styleSuffix}`]}>
              {formatPurchaseLimitPerStudentText(
                purchaseLimitPerStudent,
                variant
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenefitCardContent;
