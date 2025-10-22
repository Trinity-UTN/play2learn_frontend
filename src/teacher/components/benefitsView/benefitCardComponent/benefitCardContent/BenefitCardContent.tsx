import { FaCoins, FaUsers, FaUser, FaCalendarAlt } from "react-icons/fa";
import Tooltip from "../../../../../shared/components/Tooltip/TooltipComponent";
import type {
  BenefitResponseInterface,
  BenefitStudentResponseInterface,
  CreateBenefitInterface,
} from "../../../../../shared/types/Benefits.type";
import {
  getIconByValue,
  getColorByValue,
  getCategoryByValue,
  formatBenefitDate,
} from "../../../../utils/benefits.utils";
import {
  getPurchaseLimit,
  getPurchaseLimitPerStudent,
  formatPurchaseLimitText,
  formatPurchaseLimitPerStudentText,
  isTeacherBenefit,
  isStudentBenefit,
  type BenefitCardVariant,
} from "../../../../utils/benefitCard.utils";
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
  const IconComponent = getIconByValue(benefit.icon);
  const iconColor = getColorByValue(benefit.color);
  const category = getCategoryByValue(benefit.category);

  const styleSuffix = variant === "student" ? "Student" : "Teacher";

  const purchaseLimit = getPurchaseLimit(benefit);
  const purchaseLimitPerStudent = getPurchaseLimitPerStudent(benefit);

  const hasEndDate =
    isTeacherBenefit(benefit) || isStudentBenefit(benefit) || benefit.endAt;

  return (
    <>
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
          <p className={styles[`benefitCategory${styleSuffix}`]}>
            {category?.label ||
              (isPreview ? "Selecciona una categoría" : benefit.category)}
          </p>
        </div>
      </div>

      {/* Descripción */}
      <p className={styles[`benefitDescription${styleSuffix}`]}>
        {benefit.description ||
          (isPreview ? "Descripción del beneficio aparecerá aquí..." : "")}
      </p>

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
    </>
  );
};

export default BenefitCardContent;
