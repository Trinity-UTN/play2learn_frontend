import { motion } from "framer-motion";
import CajaDeAhorroCard from "../CajaDeAhorroCard/CajaDeAhorroCard";
import styles from "./CajaDeAhorroList.module.css";
import { FaPiggyBank } from "react-icons/fa";
import type { CajaDeAhorroResponse } from "../../../types/cajaAhorro.type";
import type { PaginationInfo } from "../../../../shared/types/PaginacionType";
import PaginateComponent from "../../../../shared/components/PaginateComponent/PaginateComponent";

interface CajaDeAhorroListProps {
  cajasDeAhorro: CajaDeAhorroResponse[];
  userBalance: number;
  onDeposit: (cajaId: number, amount: number) => void;
  onWithdraw: (cajaId: number, amount: number) => void;
  paginationInfo: PaginationInfo | null;
}

const CajaDeAhorroList: React.FC<CajaDeAhorroListProps> = ({
  cajasDeAhorro,
  userBalance,
  onDeposit,
  onWithdraw,
  paginationInfo,
}) => {
  if (cajasDeAhorro.length === 0) {
    return (
      <motion.div
        className={styles.emptyState}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <FaPiggyBank className={styles.emptyIcon} />
        <h3>No tienes cajas de ahorro</h3>
        <p>Crea tu primera caja de ahorro para empezar a generar intereses</p>
      </motion.div>
    );
  }

  return (
    <div className={styles.container}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        Mis Cajas de Ahorro
      </motion.h2>
      <PaginateComponent
        background="transparent"
        backgroundPagination="rgba(255, 255, 255, 0.54)"
        {...(paginationInfo && {
          pagination: {
            currentPage: paginationInfo.currentPage,
            totalPages: paginationInfo.totalPages,
            pageSize: paginationInfo.pageSize,
            totalItems: paginationInfo.totalItems,
            onPageChange: paginationInfo.onPageChange,
            onPageSizeChange: paginationInfo.onPageSizeChange,
          },
        })}
      >
        <div className={styles.grid}>
          {cajasDeAhorro.map((caja, index) => (
            <CajaDeAhorroCard
              key={caja.id}
              cajaDeAhorro={caja}
              index={index}
              userBalance={userBalance}
              onDeposit={onDeposit}
              onWithdraw={onWithdraw}
            />
          ))}
        </div>
      </PaginateComponent>
    </div>
  );
};

export default CajaDeAhorroList;
