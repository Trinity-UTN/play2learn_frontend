import { motion } from "framer-motion";
import { FaShoppingCart, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import type { BenefitStudentResponseInterface } from "../../../../benefit/types/benefit.types";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import BenefitTableContent from "../../../../benefit/components/benefitTableContent/BenefitTableContent";
import { BENEFIT_STATUS } from "../../../../benefit/constants/benefit.constants";
import {
  validateBenefitPurchase,
  shouldShowBenefitStats,
} from "../../../../benefit/utils/benefit.validation";
import { useCurrentStudent } from "../../../hooks/useCurrentStudent";
import styles from "./BenefitStudentTable.module.css";

interface BenefitStudentTableProps {
  benefits: BenefitStudentResponseInterface[];
  onPurchase: (benefitId: number, benefitName: string, cost: number) => void;
  onRequestUse: (benefitId: number, benefitName: string) => void;
}

const BenefitStudentTable: React.FC<BenefitStudentTableProps> = ({
  benefits,
  onPurchase,
  onRequestUse,
}) => {
  const { wallet } = useCurrentStudent();

  const handlePurchase = (benefit: BenefitStudentResponseInterface) => {
    onPurchase(benefit.id, benefit.name, benefit.cost);
  };

  const handleRequestUse = (benefit: BenefitStudentResponseInterface) => {
    onRequestUse(benefit.id, benefit.name);
  };

  const getActionButton = (benefit: BenefitStudentResponseInterface) => {
    switch (benefit.state) {
      case BENEFIT_STATUS.AVAILABLE: {
        const validation = validateBenefitPurchase(benefit, wallet);
        const cannotPurchase = !validation.canPurchase;

        const button = (
          <Button
            variant={cannotPurchase ? "ghost" : "primary"}
            size="sm"
            className={`${styles.actionButton} ${
              cannotPurchase ? styles.disabledButton : ""
            }`}
            disabled={cannotPurchase}
            onClick={
              !cannotPurchase ? () => handlePurchase(benefit) : undefined
            }
          >
            <FaShoppingCart className={styles.buttonIcon} />
            {cannotPurchase ? "No disponible" : "Canjear"}
          </Button>
        );

        if (cannotPurchase) {
          return (
            <Tooltip
              content={validation.reason || "No puedes comprar este beneficio"}
              position="top"
            >
              {button}
            </Tooltip>
          );
        }

        return button;
      }
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

      case BENEFIT_STATUS.USE_REQUESTED: {
        return (
          <Button
            variant={"ghost"}
            size="sm"
            className={`${styles.actionButton} ${styles.disabledButton}`}
            disabled
          >
            <FaHourglassHalf className={styles.buttonIcon} />
            Uso solicitado
          </Button>
        );
      }

      case BENEFIT_STATUS.EXPIRED:
        const buttonExpired = (
          <Button
            variant={"ghost"}
            size="sm"
            className={`${styles.actionButton} ${styles.disabledButton}`}
            disabled
          >
            <FiXCircle className={styles.buttonIcon} />
            Vencido
          </Button>
        );
        return (
          <Tooltip content="El beneficio ha caducado" position="top">
            {buttonExpired}
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const showStatsColumns =
    benefits.length > 0 && shouldShowBenefitStats(benefits[0]);

  const renderBenefitRow = (benefit: BenefitStudentResponseInterface) => {
    return (
      <motion.tr
        key={benefit.id}
        className={styles.tableRow}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      >
        <BenefitTableContent
          benefit={benefit}
          variant="student"
          actionButton={getActionButton(benefit)}
          showStatsColumns={showStatsColumns}
        />
      </motion.tr>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader} style={{ width: "20%" }}>
              Beneficio
            </th>
            <th
              className={styles.tableHeader}
              style={{ width: showStatsColumns ? "25%" : "35%" }}
            >
              Descripción
            </th>
            {showStatsColumns && (
              <>
                <th className={styles.tableHeader} style={{ width: "10%" }}>
                  Costo
                </th>
                <th className={styles.tableHeader} style={{ width: "10%" }}>
                  Disponibles
                </th>
                <th className={styles.tableHeader} style={{ width: "10%" }}>
                  Mis Usos
                </th>
              </>
            )}
            <th
              className={styles.tableHeader}
              style={{ width: showStatsColumns ? "15%" : "20%" }}
            >
              Finaliza
            </th>
            <th className={styles.tableHeader} style={{ width: "10%" }}>
              Acción
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {benefits.map(renderBenefitRow)}
        </tbody>
      </table>
    </div>
  );
};

export default BenefitStudentTable;
