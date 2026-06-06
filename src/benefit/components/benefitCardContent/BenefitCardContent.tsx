import {
  FaHashtag,
  FaCoins,
  FaUsers,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { Badge, Tooltip } from "@/shared";
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
    isUsedBenefit,
    usedAt,
    studentName,
    purchaseState,
    purchaseId,
  } = useBenefitCardData({ benefit, variant, isPreview, isPurchase });

  // CASO 1: isPurchaseCard - Mostrar estudiante y estado de compra
  if (isPurchaseCard) {
    const stateConfig = getPurchaseStateConfig(purchaseState);

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
            <h3 className={styles.studentNamePurchase}>{studentName}</h3>
            <div className={styles.benefitMeta}>
              <Badge
                variant="custom"
                size="sm"
                customColor={{ bg: "#f3f4f6", text: "#6b7280" }}
              >
                <FaHashtag className={styles.badgeIcon} />
                Canje Nº{purchaseId}
              </Badge>
              <Badge variant="custom" size="sm" customColor={stateConfig.color}>
                {stateConfig.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CASO 2: isUseRequest
  if (isUseRequest) {
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
            <h3 className={styles[`benefitName${styleSuffix}`]}>
              {benefitName}
            </h3>
            <div className={styles.benefitMeta}>
              <Badge variant="custom" size="sm" customColor={categoryColor}>
                Solicitud de Uso
              </Badge>
              {subjectName && subjectColor && (
                <Badge variant="custom" size="sm" customColor={subjectColor}>
                  {subjectName}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className={styles.requestInfo}>
          <FaUser className={styles.studentIcon} />
          <p className={styles[`benefitDescription${styleSuffix}`]}>
            Solicitado por: <strong>{studentName}</strong>
          </p>
        </div>
      </div>
    );
  }

  // CASO 3: isUsedBenefit - Beneficio usado
  if (isUsedBenefit) {
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
            <h3 className={styles[`benefitName${styleSuffix}`]}>
              {benefitName}
            </h3>
            <div className={styles.benefitMeta}>
              {category && categoryColor && (
                <Badge variant="custom" size="sm" customColor={categoryColor}>
                  {category.label}
                </Badge>
              )}
              {subjectName && subjectColor && (
                <Badge variant="custom" size="sm" customColor={subjectColor}>
                  {subjectName}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <p className={styles[`benefitDescription${styleSuffix}`]}>
          {descriptionText}
        </p>

        {usedAt && (
          <div className={styles.usedAtSection}>
            <FaCheckCircle className={styles.usedAtIcon} />
            <span className={styles.usedAtText}>
              Fecha de uso: <strong>{formatBenefitDate(usedAt)}</strong>
            </span>
          </div>
        )}
      </div>
    );
  }

  // CASO 4: Vista normal (beneficio estándar)
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
            {category && categoryColor && (
              <Badge variant="custom" size="sm" customColor={categoryColor}>
                {category.label}
              </Badge>
            )}
            {!category && isPreview && categoryColor && (
              <Badge variant="custom" size="sm" customColor={categoryColor}>
                Categoría {category}
              </Badge>
            )}
            {subjectName && subjectColor && (
              <Badge variant="custom" size="sm" customColor={subjectColor}>
                {subjectName}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <p className={styles[`benefitDescription${styleSuffix}`]}>
        {descriptionText}
      </p>

      {hasEndDate && "endAt" in benefit && benefit.endAt && (
        <div className={styles.endDateSection}>
          <FaCalendarAlt className={styles.endDateIcon} />
          <span className={styles.endDateText}>
            Finaliza: <strong>{formatBenefitDate(benefit.endAt)}</strong>
          </span>
        </div>
      )}

      {showStats && (
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
                variant,
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenefitCardContent;
