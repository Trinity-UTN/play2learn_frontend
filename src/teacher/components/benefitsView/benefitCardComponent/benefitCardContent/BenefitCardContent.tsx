import { FaCoins, FaUsers, FaUser, FaCalendarAlt } from "react-icons/fa";
import Tooltip from "../../../../../shared/components/Tooltip/TooltipComponent";
import type {
  BenefitResponseInterface,
  CreateBenefitInterface,
} from "../../../../types/Benefits.type";
import {
  getIconByValue,
  getColorByValue,
  getCategoryByValue,
  formatBenefitDate,
} from "../../../../utils/benefits.utils";
import styles from "./BenefitCardContent.module.css";

type BenefitCardContentProps = {
  benefit: BenefitResponseInterface | CreateBenefitInterface;
  isPreview?: boolean;
};

const BenefitCardContent = ({
  benefit,
  isPreview = false,
}: BenefitCardContentProps) => {
  const IconComponent = getIconByValue(benefit.icon);
  const iconColor = getColorByValue(benefit.color);
  const category = getCategoryByValue(benefit.category);

  // Helper para verificar si es un BenefitResponseInterface
  const isResponse = (b: any): b is BenefitResponseInterface => "id" in b;

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
          <h3 className={styles.benefitName}>
            {benefit.name || (isPreview ? "Nombre del Beneficio" : "")}
          </h3>
          <p className={styles.benefitCategory}>
            {category?.label ||
              (isPreview ? "Selecciona una categoría" : benefit.category)}
          </p>
        </div>
      </div>

      {/* Descripción */}
      <p className={styles.benefitDescription}>
        {benefit.description ||
          (isPreview ? "Descripción del beneficio aparecerá aquí..." : "")}
      </p>

      {/* Fecha de finalización */}
      {(isResponse(benefit) || benefit.endAt) && (
        <div className={styles.endDateSection}>
          <FaCalendarAlt className={styles.endDateIcon} />
          <span className={styles.endDateText}>
            Finaliza:{" "}
            <strong>
              {isResponse(benefit)
                ? formatBenefitDate(benefit.endAt)
                : benefit.endAt
                ? formatBenefitDate(benefit.endAt)
                : "Fecha no especificada"}
            </strong>
          </span>
        </div>
      )}

      {/* Estadísticas */}
      <div className={styles.benefitStats}>
        {/* Costo */}
        <div className={styles.costSection}>
          <Tooltip content="Costo">
            <FaCoins className={styles.costIcon} />
          </Tooltip>
          <span className={styles.costValue}>{benefit.cost || 0} puntos</span>
        </div>

        {/* Límite total de canjes */}
        <div className={styles.limitSection}>
          <Tooltip content="Cantidad de veces que puede canjearse" long>
            <FaUsers className={styles.limitIcon} />
          </Tooltip>
          <span className={styles.limitValue}>
            {benefit.purchaseLimit
              ? `Puede canjearse hasta ${benefit.purchaseLimit} ${
                  benefit.purchaseLimit > 1 ? "veces" : "vez"
                }`
              : "Sin límite de canjes"}
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
          <span className={styles.limitPerStudentValue}>
            {benefit.purchaseLimitPerStudent
              ? `Máx. ${benefit.purchaseLimitPerStudent} por estudiante`
              : "Sin límite por estudiante"}
          </span>
        </div>
      </div>
    </>
  );
};

export default BenefitCardContent;
