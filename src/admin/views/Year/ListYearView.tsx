import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { Button, DataTable, itemVariants, containerVariants } from "@/shared";
import styles from "./ListYearView.module.css";
import { getYearColumns, getYearActions, useListYear } from "@/admin";

const ListYearView: React.FC = () => {
  const {
    loading,
    paginatedYears,
    handleEdit,
    handleDelete,
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleSearch,
    navigate,
  } = useListYear();

  const columns = getYearColumns(styles);
  const actions = getYearActions({
    styles,
    handleEdit,
    handleDelete,
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Años</h1>
          <p className={styles.subtitle}>
            Administra los años académicos del sistema
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/dashboard/years/create")}
        >
          <FaPlus className={styles.buttonIcon} />
          Nuevo Año
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DataTable
          data={paginatedYears?.results || []}
          columns={columns}
          actions={actions}
          loading={loading}
          searchable={true}
          searchPlaceholder="Buscar años..."
          searchValue={paginationParams.search || ""}
          onSearchChange={handleSearch}
          sortBy={paginationParams.order_by}
          sortOrder={paginationParams.order_type}
          onSort={handleSort}
          emptyStateIcon={<FaCalendarAlt />}
          emptyStateTitle="No se encontraron años"
          emptyStateSubtitle={
            paginationParams.search
              ? "Intenta con otros términos de búsqueda"
              : "Comienza creando un nuevo año"
          }
          loadingText="Cargando años..."
          totalItems={paginatedYears?.count}
          getRowKey={(year) => year.id}
          pagination={
            paginatedYears
              ? {
                  currentPage: paginatedYears.currentPage,
                  totalPages: paginatedYears.totalPages,
                  pageSize: paginatedYears.pageSize,
                  totalItems: paginatedYears.count,
                  onPageChange: handlePageChange,
                  onPageSizeChange: handlePageSizeChange,
                }
              : undefined
          }
        />
      </motion.div>
    </motion.div>
  );
};

export default ListYearView;
