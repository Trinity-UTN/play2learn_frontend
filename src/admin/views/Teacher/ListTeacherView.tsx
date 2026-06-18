import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import {
  Button,
  DataTable,
  LoadingSpinnerComponent,
  itemVariants,
  containerVariants,
} from "@/shared";
import {
  getTeacherColumns,
  getTeacherActions,
  useListTeacherView,
} from "@/admin";
import styles from "./ListTeacherView.module.css";

const ListTeacherView: React.FC = () => {
  const {
    loading,
    paginatedTeacher,
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleEdit,
    handleDelete,
    handleRestore,
    handleRestorePassword,
    navigate,
  } = useListTeacherView();

  const columns = getTeacherColumns(styles, handleRestore);
  const actions = getTeacherActions({
    styles,
    handleEdit,
    handleDelete,
    handleRestorePassword,
  });

  if (loading && !paginatedTeacher) {
    return <LoadingSpinnerComponent />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Docente</h1>
          <p className={styles.subtitle}>
            Administra los docentes académicos del sistema
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/dashboard/teachers/create")}
        >
          <FaPlus className={styles.buttonIcon} />
          Nuevo Docente
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DataTable
          data={paginatedTeacher?.results || []}
          columns={columns}
          actions={actions}
          loading={loading}
          searchable={true}
          searchPlaceholder="Buscar docentes..."
          searchValue={paginationParams.search || ""}
          onSearchChange={handleSearch}
          sortBy={paginationParams.order_by}
          sortOrder={paginationParams.order_type}
          onSort={handleSort}
          emptyStateIcon={<FaCalendarAlt />}
          emptyStateTitle="No se encontraron docentes"
          emptyStateSubtitle={
            paginationParams.search
              ? "Intenta con otros términos de búsqueda"
              : "Comienza creando un nuevo docente"
          }
          loadingText="Cargando docentes..."
          totalItems={paginatedTeacher?.count}
          getRowKey={(teacher) => teacher.id}
          pagination={
            paginatedTeacher
              ? {
                  currentPage: paginatedTeacher.currentPage,
                  totalPages: paginatedTeacher.totalPages,
                  pageSize: paginatedTeacher.pageSize,
                  totalItems: paginatedTeacher.count,
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

export default ListTeacherView;
