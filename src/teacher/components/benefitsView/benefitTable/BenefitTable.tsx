import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import BenefitTableContent from "../../../../benefit/components/benefitTableContent/BenefitTableContent";
import type { BenefitResponseInterface } from "../../../../benefit/types/benefit.types";
import styles from "./BenefitTable.module.css";

type BenefitTableProps = {
  benefits: BenefitResponseInterface[];
};

const BenefitTable = ({ benefits }: BenefitTableProps) => {
  const renderBenefitRow = (benefit: BenefitResponseInterface) => {
    const actionButton = (
      <>
        <Button variant="primary" size="sm" className={styles.viewButton}>
          Ver Canjes
        </Button>
        <Button variant="ghost" size="sm" className={styles.deleteButton}>
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
