import { motion, AnimatePresence } from "framer-motion";
import styles from "./ActionsView.module.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ActionHeader from "../../components/ActionsView/ActionsHeader/ActionsHeader";
import ActionsGrid from "../../components/ActionsView/ActionsGrid/ActionsGrid";
import { useActionsView } from "../../hooks/useActions/useActionsView";
import { BackButton } from "@/shared";

const ActionsView = () => {
  const {
    actions,
    isLoading,
    filterRisk,
    setFilterRisk,
    handleFilter,
    paginationInfo,
  } = useActionsView();

  if (!actions?.results || isLoading) {
    return <LoadingScreen key="loading" titulo="Cargando Acciones" />;
  }
  return (
    <div className={styles.container}>
      <BackButton />
      <AnimatePresence mode="wait">
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.content}
        >
          <ActionHeader
            totalActions={actions.results.length}
            filterRisk={filterRisk}
            onFilterChange={setFilterRisk}
            handleFilter={handleFilter}
          />
          <ActionsGrid
            actions={actions.results}
            paginationInfo={paginationInfo}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ActionsView;
