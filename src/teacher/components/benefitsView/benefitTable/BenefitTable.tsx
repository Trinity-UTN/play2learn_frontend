import { motion } from "framer-motion";
import { FaTrash, FaEye, FaCheck } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import BenefitTableContent from "../../../../benefit/components/benefitTableContent/BenefitTableContent";
import type { TeacherBenefitType } from "../../../../benefit/types/benefit.types";
import { isBenefitUseRequested } from "../../../../benefit/utils/benefit.utils";
import { useBenefitTeacherActions } from "../../../hooks/benefits/benefitList/useBenefitTeacherActions";
import { useBenefitTeacherData } from "../../../hooks/benefits/benefitList/useBenefitTeacherData";
import styles from "./BenefitTable.module.css";

type BenefitTableProps = {
  benefits: TeacherBenefitType[];
};

const BenefitTable = ({ benefits }: BenefitTableProps) => {
  const { handleDeleteBenefit, handleViewPurchases, handleAcceptUseBenefit } =
    useBenefitTeacherActions();
  const { loading } = useBenefitTeacherData();

  // Detectar si hay solicitudes de uso en la lista
  const hasUseRequests = benefits.some(isBenefitUseRequested);

  const renderBenefitRow = (benefit: TeacherBenefitType) => {
    const isUseRequest = isBenefitUseRequested(benefit);

    // Extraer IDs según el tipo
    const benefitId = isUseRequest ? benefit.id : benefit.id;
    const actualBenefitId = isUseRequest ? benefit.benefitId : benefit.id;
    const benefitName = isUseRequest ? benefit.benefitName : benefit.name;

    const actionButton = isUseRequest ? (
      <>
        <Button
          variant="ghost"
          size="sm"
          className={styles.acceptButton}
          onClick={() => handleAcceptUseBenefit(benefitId, benefitName)}
          disabled={loading}
        >
          <FaCheck /> Aceptar
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className={styles.viewButton}
          onClick={() => handleViewPurchases(actualBenefitId)}
        >
          <FaEye /> Canjes
        </Button>
      </>
    ) : (
      <>
        <Button
          variant="secondary"
          size="sm"
          className={styles.viewButton}
          onClick={() => handleViewPurchases(benefitId)}
        >
          <FaEye /> Ver Canjes
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={styles.deleteButton}
          onClick={() => handleDeleteBenefit(benefitId, benefitName)}
          disabled={loading}
        >
          <FaTrash />
        </Button>
      </>
    );

    return (
      <motion.tr
        key={benefit.id}
        className={styles.tableRow}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ backgroundColor: "rgba(0, 123, 255, 0.02)" }}
      >
        <BenefitTableContent
          benefit={benefit}
          variant="teacher"
          actionButton={actionButton}
          showStatsColumns={!isUseRequest}
        />
      </motion.tr>
    );
  };

  return (
    <Card className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>Beneficio</th>
            <th className={styles.tableHeader}>
              {hasUseRequests ? "Estudiante" : "Descripción"}
            </th>
            {!hasUseRequests && (
              <>
                <th className={styles.tableHeader}>Costo</th>
                <th className={styles.tableHeader}>Límite Total</th>
                <th className={styles.tableHeader}>Límite p/ Est</th>
                <th className={styles.tableHeader}>Fecha Fin</th>
              </>
            )}
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
