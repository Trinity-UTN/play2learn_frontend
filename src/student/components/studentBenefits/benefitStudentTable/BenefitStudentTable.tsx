import { motion } from "framer-motion";
import { FaShoppingCart, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import type {
  BenefitStudentResponseInterface,
  BenefitPurchasedUsedResponse,
} from "../../../../benefit/types/benefit.types";
import { Button, Tooltip } from "@/shared";
import BenefitTableContent from "../../../../benefit/components/benefitTableContent/BenefitTableContent";
import { BENEFIT_STATUS } from "../../../../benefit/constants/benefit.constants";
import {
  validateBenefitPurchase,
  shouldShowBenefitStats,
} from "../../../../benefit/utils/benefit.validation";
import { isBenefitPurchasedUsed } from "../../../../benefit/utils/benefit.utils";
import { useCurrentStudent } from "../../../hooks/useCurrentStudent";
import styles from "./BenefitStudentTable.module.css";

interface BenefitStudentTableProps {
  benefits: (BenefitStudentResponseInterface | BenefitPurchasedUsedResponse)[];
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

  const getActionButton = (
    benefit: BenefitStudentResponseInterface | BenefitPurchasedUsedResponse
  ) => {
    if (isBenefitPurchasedUsed(benefit)) {
      return (
        <Button
          variant="ghost"
          size="sm"
          className={`${styles.actionButton} ${styles.disabledButton}`}
          disabled
        >
          <FaCheckCircle className={styles.buttonIcon} />
          Usado
        </Button>
      );
    }

    const studentBenefit = benefit as BenefitStudentResponseInterface;

    switch (studentBenefit.state) {
      case BENEFIT_STATUS.AVAILABLE: {
        const validation = validateBenefitPurchase(studentBenefit, wallet);
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
              !cannotPurchase ? () => handlePurchase(studentBenefit) : undefined
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
            onClick={() => handleRequestUse(studentBenefit)}
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

      case BENEFIT_STATUS.USED:
        return (
          <Button
            variant="ghost"
            size="sm"
            className={`${styles.actionButton} ${styles.disabledButton}`}
            disabled
          >
            <FaCheckCircle className={styles.buttonIcon} />
            Usado
          </Button>
        );

      default:
        return null;
    }
  };

  const showStatsColumns =
    benefits.length > 0 &&
    !isBenefitPurchasedUsed(benefits[0]) &&
    shouldShowBenefitStats(benefits[0] as BenefitStudentResponseInterface);

  const renderBenefitRow = (
    benefit: BenefitStudentResponseInterface | BenefitPurchasedUsedResponse
  ) => {
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

  const renderTableHeaders = () => {
    const isUsedBenefitList =
      benefits.length > 0 && isBenefitPurchasedUsed(benefits[0]);

    return (
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
          {isUsedBenefitList ? "Fecha de uso" : "Fecha de vencimiento"}
        </th>
        <th className={styles.tableHeader} style={{ width: "10%" }}>
          Acción
        </th>
      </tr>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>{renderTableHeaders()}</thead>
        <tbody className={styles.tableBody}>
          {benefits.map(renderBenefitRow)}
        </tbody>
      </table>
    </div>
  );
};

export default BenefitStudentTable;
