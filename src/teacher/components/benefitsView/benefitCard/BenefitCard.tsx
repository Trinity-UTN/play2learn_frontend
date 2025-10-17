import React from "react";
import { FaTrash, FaCoins } from "react-icons/fa";
import type { BenefitResponseInterface } from "../../../types/Benefits.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import {
  getIconByValue,
  getColorByValue,
  formatBenefitDate,
  calculateUsagePercentage,
} from "../../../utils/benefits.utils";
import styles from "./BenefitCard.module.css";

type BenefitCardProps = {
  benefit: BenefitResponseInterface;
};

const BenefitCard = ({ benefit }: BenefitCardProps) => {
  const usagePercentage =
    benefit.purchaseLimit && benefit.purchaseLimitPerStudent
      ? calculateUsagePercentage(
          benefit.purchaseLimitPerStudent,
          benefit.purchaseLimit
        )
      : 0;

  return (
    <Card className={styles.benefitCard}>
      {/* Icon and Title */}
      <div className={styles.benefitHeader}>
        <div
          className={styles.iconWrapper}
          style={{ backgroundColor: getColorByValue(benefit.color) }}
        >
          {React.createElement(getIconByValue(benefit.icon), {
            className: styles.benefitIcon,
          })}
        </div>
        <div className={styles.benefitInfo}>
          <h3 className={styles.benefitName}>{benefit.name}</h3>
          <p className={styles.benefitCategory}>{benefit.category}</p>
        </div>
      </div>

      {/* Description */}
      <p className={styles.benefitDescription}>{benefit.description}</p>
      <p className={styles.benefitDescription}>
        Fecha de finalización: {formatBenefitDate(benefit.endAt)}
      </p>

      {/* Cost and Usage */}
      <div className={styles.benefitStats}>
        <div className={styles.costSection}>
          <FaCoins className={styles.costIcon} />
          <span className={styles.costValue}>{benefit.cost} puntos</span>
        </div>
        <div className={styles.usageSection}>
          <span className={styles.usageText}>
            {benefit.purchaseLimitPerStudent ?? 0} uso
            {benefit.purchaseLimit && ` / ${benefit.purchaseLimit}`}
          </span>
          {benefit.purchaseLimit && benefit.purchaseLimitPerStudent && (
            <div className={styles.usageBar}>
              <div
                className={styles.usageProgress}
                style={{
                  width: `${usagePercentage}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.cardActions}>
        <Button variant="ghost" size="sm" className={styles.deleteButton}>
          <FaTrash className={styles.actionIcon} />
          Eliminar
        </Button>
      </div>
    </Card>
  );
};

export default BenefitCard;
