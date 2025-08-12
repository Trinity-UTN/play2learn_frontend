// import Badge from "../../../../shared/components/Badge/BadgeComponent";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import type { BenefitResponse } from "../../../types/BeneficeType";
import styles from "./BenefitCard.module.css";

import {
  FaEdit,
  FaTrash,
  //   FaEye,
  FaCoins,
  FaGraduationCap,
  //   FaCrown,
} from "react-icons/fa";

type Props = {
  benefit: BenefitResponse;
};

const BenefitCard = ({ benefit }: Props) => {
  return (
    <Card className={styles.benefitCard}>
      {/* Header */}
      <div className={styles.cardHeader}>
        {/* <div className={styles.badges}>
          {benefit.isPremium && (
            <Badge variant="warning" className={styles.premiumBadge}>
              <FaCrown className={styles.badgeIcon} />
              Premium
            </Badge>
          )}
          {benefit.isLimited && (
            <Badge variant="secondary" className={styles.limitedBadge}>
              Limitado
            </Badge>
          )}
        </div> */}
        {/* <Badge variant={benefit.status === "Activo" ? "success" : "secondary"}>
          {benefit.status}
        </Badge> */}
      </div>

      {/* Icon and Title */}
      <div className={styles.benefitHeader}>
        <div
          className={styles.iconWrapper}
          style={{ backgroundColor: "#8b5cf6" }}
        >
          <FaGraduationCap className={styles.benefitIcon} />
        </div>
        <div className={styles.benefitInfo}>
          <h3 className={styles.benefitName}>{benefit.name}</h3>
          {/* <p className={styles.benefitCategory}>{benefit.category}</p> */}
        </div>
      </div>

      {/* Description */}
      <p className={styles.benefitDescription}>{benefit.description}</p>

      {/* Cost and Usage */}
      <div className={styles.benefitStats}>
        <div className={styles.costSection}>
          <FaCoins className={styles.costIcon} />
          <span className={styles.costValue}>{benefit.cost} puntos</span>
        </div>
        <div className={styles.usageSection}>
          <span className={styles.usageText}>
            {benefit.totalRedeemableAmount ? benefit.totalRedeemableAmount : 0}{" "}
            uso
            {/* {benefit. !== 1 ? "s" : ""} */}
            {benefit.totalRedeemableAmount &&
              ` / ${benefit.totalRedeemableAmount}`}
          </span>
          {benefit.totalRedeemableAmount && (
            <div className={styles.usageBar}>
              <div
                className={styles.usageProgress}
                style={{
                  width: `${
                    (benefit.redeemableAmountPerStudent /
                      benefit.totalRedeemableAmount) *
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
        <Button variant="ghost" size="sm" className={styles.actionButton}>
          <FaEdit className={styles.actionIcon} />
          Editar
        </Button>
        <Button variant="ghost" size="sm" className={styles.deleteButton}>
          <FaTrash className={styles.actionIcon} />
          Eliminar
        </Button>
      </div>
    </Card>
  );
};

export default BenefitCard;
