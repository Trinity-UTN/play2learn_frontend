import styles from "./PlazoFijoView.module.css";
import CreatePlazoFijoForm from "../../components/PlazoFijoView/CreatePlazoFijoForm/CreatePlazoFijoForm";
import PlazoFijoList from "../../components/PlazoFijoView/PlazoFijoList/PlazoFijoList";
import { PlazoFijoHeader } from "../../components/PlazoFijoView/PlazoFijoHeader/PlazoFijoHeader";
import { usePlazoFijoView } from "../../hooks/usePlazoFijo/usePlazoFijoView";
import PlazoFijoFilter from "../../components/PlazoFijoView/PlazoFijoFilter/PlazoFijoFilter";

const PlazoFijoView = () => {
  const {
    //Paginacion
    paginationInfo,
    handleFilter,
    //Valores del context API
    plazoFijos,
    //Valores internos
    userBalance,
    handleCreatePlazoFijo,
    filterStatus,
    setFilterStatus,
  } = usePlazoFijoView();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <PlazoFijoHeader />

        {/* Create Form */}
        <CreatePlazoFijoForm
          userBalance={userBalance ? userBalance : 0}
          onSubmit={handleCreatePlazoFijo}
        />

        {/* Filtro */}
        <PlazoFijoFilter
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          handleFilter={handleFilter}
        />
        {/* List */}
        <PlazoFijoList
          plazosFijos={plazoFijos?.results}
          paginationInfo={paginationInfo}
        />
      </div>
    </div>
  );
};

export default PlazoFijoView;
