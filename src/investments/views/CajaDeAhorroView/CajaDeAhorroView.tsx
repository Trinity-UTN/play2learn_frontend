import { AnimatePresence } from "framer-motion";
import styles from "./CajaDeAhorroView.module.css";
import CreateCajaDeAhorroForm from "../../components/CajaDeAhorroView/CreateCajaDeAhorroForm/CreateCajaDeAhorroForm";
import CajaDeAhorroList from "../../components/CajaDeAhorroView/CajaDeAhorroList/CajaDeAhorroList";
import CajaDeAhorroHeader from "../../components/CajaDeAhorroView/CajaDeAhorroHeader/CajaDeAhorroHeader";
import { useCajaDeAhorroView } from "../../hooks/useCajaDeAhorro/useCajaDeAhorroView";

const CajaDeAhorroView = () => {
  const {
    cajaDeAhorro,
    userBalance,
    openForm,
    paginationInfo,
    totalSaved,
    totalInterest,
    activeCajas,
    setOpenForm,
    handleCreateCaja,
    handleDeposit,
    handleWithdraw,
    handleDelete,
  } = useCajaDeAhorroView();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <CajaDeAhorroHeader
          open={openForm}
          setOpen={setOpenForm}
          activeCajas={activeCajas}
          totalInterest={totalInterest}
          totalSaved={totalSaved}
        />
        {/* Create Form */}
        <AnimatePresence>
          {openForm && (
            <CreateCajaDeAhorroForm
              userBalance={userBalance}
              onSubmit={handleCreateCaja}
            />
          )}
        </AnimatePresence>

        {/* List */}
        {cajaDeAhorro && (
          <CajaDeAhorroList
            cajasDeAhorro={cajaDeAhorro.results}
            userBalance={userBalance}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            onDelete={handleDelete}
            paginationInfo={paginationInfo}
          />
        )}
      </div>
    </div>
  );
};

export default CajaDeAhorroView;
