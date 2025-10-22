import { motion } from "framer-motion";
import {
  FaCoins,
  FaUsers,
  FaUser,
  FaCalendarAlt,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import { BENEFIT_STATUS } from "../../../constants/benefitStudent.constants";
import {
  getIconByValue,
  getColorByValue,
  formatBenefitDate,
  getCategoryByValue,
} from "../../../../teacher/utils/benefits.utils";
import styles from "./BenefitStudentTable.module.css";

interface BenefitStudentTableProps {
  benefits: any[];
  onPurchase: (benefitId: number, benefitName: string, cost: number) => void;
  onRequestUse: (benefitId: number, benefitName: string) => void;
}

const BenefitStudentTable: React.FC<BenefitStudentTableProps> = ({
  benefits,
  onPurchase,
  onRequestUse,
}) => {
  const handlePurchase = (benefit: any) => {
    onPurchase(benefit.id, benefit.name, benefit.cost);
  };

  const handleRequestUse = (benefit: any) => {
    onRequestUse(benefit.id, benefit.name);
  };

  const getActionButton = (benefit: any) => {
    switch (benefit.state) {
      case BENEFIT_STATUS.AVAILABLE:
        return (
          <Button
            variant="primary"
            size="sm"
            className={styles.actionButton}
            onClick={() => handlePurchase(benefit)}
          >
            <FaShoppingCart className={styles.buttonIcon} />
            Canjear
          </Button>
        );
      case BENEFIT_STATUS.PURCHASED:
        return (
          <Button
            variant="secondary"
            size="sm"
            className={styles.actionButton}
            onClick={() => handleRequestUse(benefit)}
          >
            <FaCheckCircle className={styles.buttonIcon} />
            Usar
          </Button>
        );
      case BENEFIT_STATUS.USE_REQUESTED:
        return (
          <Button
            variant="ghost"
            size="sm"
            className={styles.actionButton}
            disabled
          >
            Solicitado
          </Button>
        );
      case BENEFIT_STATUS.EXPIRED:
        return (
          <Button
            variant="ghost"
            size="sm"
            className={styles.actionButton}
            disabled
          >
            Vencido
          </Button>
        );
      default:
        return null;
    }
  };

  const renderBenefitRow = (benefit: any) => {
    const IconComponent = getIconByValue(benefit.icon);
    const iconColor = getColorByValue(benefit.color);
    const category = getCategoryByValue(benefit.category);

    return (
      <motion.tr
        key={benefit.id}
        className={styles.tableRow}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
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
          <p className={styles.benefitDescription}>{benefit.description}</p>
        </td>

        {/* Costo */}
        <td className={styles.tableCell}>
          <div className={styles.statItem}>
            <FaCoins className={styles.costIcon} />
            <span className={styles.statValue}>{benefit.cost}</span>
          </div>
        </td>

        {/* Canjes disponibles */}
        <td className={styles.tableCell}>
          {benefit.purchasesLeft !== null ? (
            <div className={styles.statItem}>
              <FaUsers className={styles.limitIcon} />
              <span className={styles.statValue}>{benefit.purchasesLeft}</span>
            </div>
          ) : (
            <span className={styles.emptyValue}>Sin limites</span>
          )}
        </td>

        {/* Mis usos */}
        <td className={styles.tableCell}>
          {benefit.purchasesLeftByStudent !== null ? (
            <div className={styles.statItem}>
              <FaUser className={styles.limitPerStudentIcon} />
              <span className={styles.statValue}>
                {benefit.purchasesLeftByStudent}
              </span>
            </div>
          ) : (
            <span className={styles.emptyValue}>Sin limites</span>
          )}
        </td>

        {/* Fecha de finalización */}
        <td className={styles.tableCell}>
          <div className={styles.dateSection}>
            <FaCalendarAlt className={styles.dateIcon} />
            <span className={styles.dateValue}>
              {formatBenefitDate(benefit.endAt)}
            </span>
          </div>
        </td>

        {/* Acciones */}
        <td className={styles.tableCell}>
          <div className={styles.actions}>{getActionButton(benefit)}</div>
        </td>
      </motion.tr>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeader}>Beneficio</th>
              <th className={styles.tableHeader}>Descripción</th>
              <th className={styles.tableHeader}>Costo</th>
              <th className={styles.tableHeader}>Disponibles</th>
              <th className={styles.tableHeader}>Mis Usos</th>
              <th className={styles.tableHeader}>Finaliza</th>
              <th className={styles.tableHeader}>Acción</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {benefits.map(renderBenefitRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BenefitStudentTable;
