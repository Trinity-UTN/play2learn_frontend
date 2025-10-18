import React from "react";
import {
  FaTrash,
  FaCoins,
  FaUsers,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import type { BenefitResponseInterface } from "../../../types/Benefits.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import {
  getIconByValue,
  getColorByValue,
  formatBenefitDate,
} from "../../../utils/benefits.utils";
import styles from "./BenefitCard.module.css";

type BenefitCardProps = {
  benefit: BenefitResponseInterface;
};

const BenefitCard = ({ benefit }: BenefitCardProps) => {
  return (
    <Card className={styles.benefitCard}>
      {/* Titulo */}
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

      {/* Descripción */}
      <p className={styles.benefitDescription}>{benefit.description}</p>

      {/* Fecha de finalización */}
      <div className={styles.endDateSection}>
        <FaCalendarAlt className={styles.endDateIcon} />
        <span className={styles.endDateText}>
          Finaliza: <strong>{formatBenefitDate(benefit.endAt)}</strong>
        </span>
      </div>

      {/* Otros atributos */}
      <div className={styles.benefitStats}>
        {/* Costo */}
        <div className={styles.costSection}>
          <Tooltip content="Costo">
            <FaCoins className={styles.costIcon} />
          </Tooltip>
          <span className={styles.costValue}>{benefit.cost} puntos</span>
        </div>

        {/* Límite total de canjes */}
        {benefit.purchaseLimit && (
          <div className={styles.limitSection}>
            <Tooltip content="Cantidad de veces que puede canjearse" long>
              <FaUsers className={styles.limitIcon} />
            </Tooltip>
            <span className={styles.limitValue}>
              Puede canjearse hasta {benefit.purchaseLimit}{" "}
              {benefit.purchaseLimit > 1 ? "veces" : "vez"}
            </span>
          </div>
        )}

        {/* Límite por estudiante */}
        {benefit.purchaseLimitPerStudent && (
          <div className={styles.limitPerStudentSection}>
            <Tooltip
              content="Cantidad de veces que puede canjearlo un estudiante"
              long
            >
              <FaUser className={styles.limitPerStudentIcon} />
            </Tooltip>
            <span className={styles.limitPerStudentValue}>
              Máx. {benefit.purchaseLimitPerStudent} por estudiante
            </span>
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className={styles.cardActions}>
        {/* 
          TODO: Implementar navegación a página de canjes
        */}
        <Button
          variant="primary"
          size="sm"
          className={styles.viewRedemptionsButton}
          // onClick={() => navigate(`/admin/benefits/${benefit.id}/redemptions`)}
        >
          Ver Canjes
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
