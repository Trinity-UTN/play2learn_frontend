// import Badge from "../../../../shared/components/Badge/BadgeComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import type { BenefitResponseInterface } from "../../../types/BenefitType";
import styles from "./BenefitCard.module.css";
import { useBenefitUI } from "../../../hooks/useBenefitUI";
import { FaTrash, FaCoins } from "react-icons/fa";
import React from "react";

type Props = {
  benefit: BenefitResponseInterface;
};

const BenefitCard = ({ benefit }: Props) => {
  const { getColor, getSelectedIcon } = useBenefitUI();
  const fechaFormateada = new Date(benefit.endAt).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <Card className={styles.benefitCard}>
      {/* Icon and Title */}
      <div className={styles.benefitHeader}>
        <div
          className={styles.iconWrapper}
          style={{ backgroundColor: getColor(benefit.color) }}
        >
          {React.createElement(getSelectedIcon(benefit.icon), {
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
        Fecha de finalizacion: {fechaFormateada}
      </p>

      {/* Cost and Usage */}
      <div className={styles.benefitStats}>
        <div className={styles.costSection}>
          <FaCoins className={styles.costIcon} />
          <span className={styles.costValue}>{benefit.cost} puntos</span>
        </div>
        <div className={styles.usageSection}>
          <span className={styles.usageText}>
            {benefit.purchaseLimitPerStudent
              ? benefit.purchaseLimitPerStudent
              : 0}{" "}
            uso
            {/* {benefit. !== 1 ? "s" : ""} */}
            {benefit.purchaseLimit && ` / ${benefit.purchaseLimit}`}
          </span>
          {benefit.purchaseLimit && benefit.purchaseLimitPerStudent && (
            <div className={styles.usageBar}>
              <div
                className={styles.usageProgress}
                style={{
                  width: `${
                    (benefit.purchaseLimitPerStudent / benefit.purchaseLimit) *
                    100
                  }%`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Duration and Restrictions */}
      {/* {benefit.duration && (
        <div className={styles.benefitDetails}>
          <span className={styles.duration}>Duración: {benefit.duration}</span>
        </div>
      )} */}

      {/* PROXIMO SPRINT */}
      {/* {benefit.restrictions && benefit.restrictions.length > 0 && (
        <div className={styles.restrictions}>
          <span className={styles.restrictionsTitle}>Restricciones:</span>
          <ul className={styles.restrictionsList}>
            {benefit.restrictions.slice(0, 2).map((restriction, idx) => (
              <li key={idx} className={styles.restrictionItem}>
                {restriction}
              </li>
            ))}
            {benefit.restrictions.length > 2 && (
              <li className={styles.moreRestrictions}>
                +{benefit.restrictions.length - 2} más
              </li>
            )}
          </ul>
        </div>
      )} */}

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
