import { motion } from "framer-motion";
import { FaTrash, FaEye, FaCheck } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import BenefitTableContent from "../../../../benefit/components/benefitTableContent/BenefitTableContent";
import type { TeacherBenefitType } from "../../../../benefit/types/benefit.types";
import { tableRowVariants } from "../../../constants/animations/benefitTeacher.animations";
import { isBenefitUseRequested } from "../../../../benefit/utils/benefit.utils";
import {
  getBenefitIds,
  getBenefitName,
  hasUseRequests,
  type BenefitActionHandlers,
} from "../../../utils/benefitList.utils";
import styles from "./BenefitTable.module.css";

type BenefitTableProps = {
  benefits: TeacherBenefitType[];
  actions: BenefitActionHandlers;
  loading?: boolean;
};

const BenefitTable: React.FC<BenefitTableProps> = ({
  benefits,
  actions,
  loading = false,
}) => {
  const showStudentColumn = hasUseRequests(benefits);

  return (
    <Card className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>Beneficio</th>
            <th
              className={`${styles.tableHeader} ${
                showStudentColumn ? styles.requestStudentHeader : ""
              }`.trim()}
            >
              {showStudentColumn ? "Estudiante" : "Descripción"}
            </th>
            {!showStudentColumn && (
              <>
                <th className={styles.tableHeader}>Costo</th>
                <th className={styles.tableHeader}>Límite</th>
                <th className={styles.tableHeader}>Límite Est.</th>
                <th className={styles.tableHeader}>Fecha Fin</th>
              </>
            )}
            <th className={styles.tableHeader}>Acciones</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {benefits.map((benefit) => {
            const isUseRequest = isBenefitUseRequested(benefit);
            const { benefitId, actualBenefitId } = getBenefitIds(benefit);
            const name = getBenefitName(benefit);

            const actionButtons = isUseRequest ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${styles.actionButton} ${styles.acceptButton}`}
                  onClick={() => actions.onAcceptUse(benefitId, name)}
                  disabled={loading}
                >
                  <FaCheck /> Aceptar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${styles.actionButton} ${styles.viewButton}`}
                  onClick={() => actions.onViewPurchases(actualBenefitId)}
                >
                  <FaEye /> Canjes
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${styles.actionButton} ${styles.viewButton}`}
                  onClick={() => actions.onViewPurchases(benefitId)}
                >
                  <FaEye /> Ver Canjes
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => actions.onDelete(benefitId, name)}
                  disabled={loading}
                >
                  <FaTrash />
                </Button>
              </>
            );

            return (
              <motion.tr
                key={benefit.id}
                variants={tableRowVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={styles.tableRow}
              >
                <BenefitTableContent
                  benefit={benefit}
                  variant="teacher"
                  actionButton={actionButtons}
                  showStatsColumns={!isUseRequest}
                />
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default BenefitTable;
