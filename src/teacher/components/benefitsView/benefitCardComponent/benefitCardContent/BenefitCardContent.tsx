import { FaCoins, FaUsers, FaUser, FaCalendarAlt } from "react-icons/fa";
import Badge from "../../../../../shared/components/Badge/BadgeComponent";
import Tooltip from "../../../../../shared/components/Tooltip/TooltipComponent";
import type {
  BenefitResponseInterface,
  BenefitStudentResponseInterface,
  CreateBenefitInterface,
} from "../../../../../shared/types/Benefits.type";
import { formatBenefitDate } from "../../../../utils/benefits.utils";
import {
  formatPurchaseLimitText,
  formatPurchaseLimitPerStudentText,
  type BenefitCardVariant,
} from "../../../../utils/benefitCard.utils";
import { useBenefitCardData } from "../../../../hooks/benefits/useBenefitCardData";
import styles from "./BenefitCardContent.module.css";

type BenefitCardContentProps = {
  benefit:
    | BenefitResponseInterface
    | BenefitStudentResponseInterface
    | CreateBenefitInterface;
  isPreview?: boolean;
  variant?: BenefitCardVariant;
};

const BenefitCardContent = ({
  benefit,
  isPreview = false,
  variant = "teacher",
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
    descriptionText,
    subjectName,
    subjectColor,
    categoryColor,
  } = useBenefitCardData({ benefit, variant, isPreview });

  return (
    <div className={styles.contentContainer}>
      {/* Header con icono y nombre */}
      <div className={styles.benefitHeader}>
        <div
          className={styles.iconWrapper}
          style={{ backgroundColor: iconColor }}
        >
          <IconComponent className={styles.benefitIcon} />
        </div>
        <div className={styles.benefitInfo}>
          <h3 className={styles[`benefitName${styleSuffix}`]}>
            {benefit.name || (isPreview ? "Nombre del Beneficio" : "")}
          </h3>
          <div className={styles.benefitMeta}>
            {categoryColor && (
              <Badge variant="custom" size="sm" customColor={categoryColor}>
                {category?.label ||
                  (isPreview ? "Categoría" : benefit.category)}
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

      <Tooltip content={descriptionText}>
        <p className={styles[`benefitDescription${styleSuffix}`]}>
          {descriptionText}
        </p>
      </Tooltip>

      {/* Fecha de finalización */}
      {hasEndDate && (
        <div className={styles.endDateSection}>
          <FaCalendarAlt className={styles.endDateIcon} />
          <span className={styles.endDateText}>
            Finaliza:{" "}
            <strong>
              {benefit.endAt
                ? formatBenefitDate(benefit.endAt)
                : "Fecha no especificada"}
            </strong>
          </span>
        </div>
      )}

      {/* Estadísticas */}
      {showStats && (
        <div className={styles[`benefitStats${styleSuffix}`]}>
          {/* Costo */}
          <div className={styles.costSection}>
            <Tooltip content="Costo">
              <FaCoins className={styles[`costIcon${styleSuffix}`]} />
            </Tooltip>
            <span className={styles[`costValue${styleSuffix}`]}>
              {benefit.cost || 0} monedas
            </span>
          </div>

          {/* Límite total de canjes */}
          <div className={styles.limitSection}>
            <Tooltip content="Cantidad de veces que puede canjearse" long>
              <FaUsers className={styles.limitIcon} />
            </Tooltip>
            <span className={styles[`limitValue${styleSuffix}`]}>
              {formatPurchaseLimitText(purchaseLimit, variant)}
            </span>
          </div>

          {/* Límite por estudiante */}
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
