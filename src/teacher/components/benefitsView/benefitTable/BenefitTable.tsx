import { motion } from "framer-motion";
import { FaTrash, FaEye } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import BenefitTableContent from "../../../../benefit/components/benefitTableContent/BenefitTableContent";
import type { TeacherBenefitType } from "../../../../benefit/types/benefit.types";
import { useBenefitTeacherActions } from "../../../hooks/benefits/benefitList/useBenefitTeacherActions";
import { useBenefitTeacherData } from "../../../hooks/benefits/benefitList/useBenefitTeacherData";
import styles from "./BenefitTable.module.css";

type BenefitTableProps = {
  benefits: TeacherBenefitType[];
};

const BenefitTable = ({ benefits }: BenefitTableProps) => {
  const { handleDeleteBenefit, handleViewPurchases } =
    useBenefitTeacherActions();
  const { loading } = useBenefitTeacherData();

  const renderBenefitRow = (benefit: TeacherBenefitType) => {
    const benefitId = "benefitId" in benefit ? benefit.benefitId : benefit.id;
    const benefitName =
      "benefitName" in benefit ? benefit.benefitName : benefit.name;

    const actionButton = (
      <>
        <Button
          variant="primary"
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
          showStatsColumns={true}
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
