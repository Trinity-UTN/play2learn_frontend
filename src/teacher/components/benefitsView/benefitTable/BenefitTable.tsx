import { motion } from "framer-motion";
import {
  FaCoins,
  FaUsers,
  FaUser,
  FaCalendarAlt,
  FaTrash,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import type { BenefitResponseInterface } from "../../../../shared/types/Benefits.type";
import {
  getIconByValue,
  getColorByValue,
  formatBenefitDate,
  getCategoryByValue,
} from "../../../utils/benefits.utils";
import styles from "./BenefitTable.module.css";

type BenefitTableProps = {
  benefits: BenefitResponseInterface[];
};

const BenefitTable = ({ benefits }: BenefitTableProps) => {
  const renderBenefitRow = (benefit: BenefitResponseInterface) => {
    const IconComponent = getIconByValue(benefit.icon);
    const iconColor = getColorByValue(benefit.color);
    const category = getCategoryByValue(benefit.category);

    return (
      <motion.tr
        key={benefit.id}
        className={styles.tableRow}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ backgroundColor: "rgba(0, 123, 255, 0.02)" }}
      >
        {/* Icono + Nombre */}
        <td className={styles.tableCell}>
          <div className={styles.benefitInfo}>
            <div
              className={styles.iconWrapper}
              style={{ backgroundColor: iconColor }}
            >
              <IconComponent className={styles.benefitIcon} />
            </div>
            <div className={styles.benefitDetails}>
              <span className={styles.benefitName}>{benefit.name}</span>
              <span className={styles.benefitCategory}>
                {category?.label || benefit.category}
              </span>
            </div>
          </div>
        </td>

        {/* Descripción */}
        <td className={styles.tableCell}>
          <Tooltip content={benefit.description} position="top">
            <p className={styles.benefitDescription}>{benefit.description}</p>
          </Tooltip>
        </td>

        {/* Costo */}
        <td className={`${styles.tableCell} ${styles.centeredCell}`}>
          <div className={styles.statItem}>
            <FaCoins className={styles.costIcon} />
            <span className={styles.statValue}>{benefit.cost}</span>
          </div>
        </td>

        {/* Límite total */}
        <td className={`${styles.tableCell} ${styles.centeredCell}`}>
          {benefit.purchaseLimit ? (
            <div className={styles.statItem}>
              <FaUsers className={styles.limitIcon} />
              <span className={styles.statValue}>{benefit.purchaseLimit}</span>
            </div>
          ) : (
            <Tooltip content={"Sin límite"} position="top">
              <span className={styles.emptyValue}>—</span>
            </Tooltip>
          )}
        </td>

        {/* Límite por estudiante */}
        <td className={`${styles.tableCell} ${styles.centeredCell}`}>
          {benefit.purchaseLimitPerStudent ? (
            <div className={styles.statItem}>
              <FaUser className={styles.limitPerStudentIcon} />
              <span className={styles.statValue}>
                {benefit.purchaseLimitPerStudent}
              </span>
            </div>
          ) : (
            <Tooltip content={"Sin límite"} position="top">
              <span className={styles.emptyValue}>—</span>
            </Tooltip>
          )}
        </td>

        {/* Fecha de finalización */}
        <td className={`${styles.tableCell} ${styles.centeredCell}`}>
          <div className={styles.dateSection}>
            <FaCalendarAlt className={styles.dateIcon} />
            <span className={styles.dateValue}>
              {formatBenefitDate(benefit.endAt)}
            </span>
          </div>
        </td>

        {/* Acciones */}
        <td className={`${styles.tableCell} ${styles.centeredCell}`}>
          <div className={styles.actions}>
            <Button variant="primary" size="sm" className={styles.viewButton}>
              Ver Canjes
            </Button>
            <Button variant="ghost" size="sm" className={styles.deleteButton}>
              <FaTrash />
            </Button>
          </div>
        </td>
      </motion.tr>
    );
  };

  return (
    <Card className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>Beneficio</th>
            <th className={styles.tableHeader}>Descripción</th>
            <th className={styles.tableHeader}>Costo</th>
            <th className={styles.tableHeader}>Límite Total</th>
            <th className={styles.tableHeader}>Límite p/ Est</th>
            <th className={styles.tableHeader}>Fecha Fin</th>
            <th className={styles.tableHeader}>Acciones</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {benefits.map(renderBenefitRow)}
        </tbody>
      </table>
    </Card>
  );
};

export default BenefitTable;
