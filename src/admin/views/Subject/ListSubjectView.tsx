import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import {
  getSubjectActions,
  getSubjectColumns,
  useListSubjectView,
} from "@/admin";
import {
  Button,
  DataTable,
  LoadingSpinnerComponent,
  itemVariants,
  containerVariants,
} from "@/shared";
import styles from "./ListSubjectView.module.css";

const ListSubjectView: React.FC = () => {
  const {
    // states
    paginatedSubjects,
    loading,

    // pagination
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,

    // actions
    handleEdit,
    handleDelete,
    navigate,
    handleRestore,
  } = useListSubjectView();

  const columns = getSubjectColumns({ styles, handleRestore });
  const actions = getSubjectActions({
    styles,
    handleEdit,
    handleDelete,
  });
  if (loading && !paginatedSubjects) {
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
          <h1 className={styles.title}>Gestión de Materias</h1>
          <p className={styles.subtitle}>
            Administra las materias pertenecientes a cursos en particular
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/dashboard/subjects/create")}
        >
          <FaPlus className={styles.buttonIcon} />
          Nueva Materia
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DataTable
          data={paginatedSubjects?.results || []}
          columns={columns}
          actions={actions}
          loading={loading}
          searchable={true}
          searchPlaceholder="Buscar materias..."
          searchValue={paginationParams.search || ""}
          onSearchChange={handleSearch}
          sortBy={paginationParams.order_by}
          sortOrder={paginationParams.order_type}
          onSort={handleSort}
          emptyStateIcon={<FaCalendarAlt />}
          emptyStateTitle="No se encontraron materias"
          emptyStateSubtitle={
            paginationParams.search
              ? "Intenta con otros términos de búsqueda"
              : "Comienza creando una nueva materia"
          }
          loadingText="Cargando materias..."
          totalItems={paginatedSubjects?.count}
          getRowKey={(subject) => subject.id}
          pagination={
            paginatedSubjects
              ? {
                  currentPage: paginatedSubjects.currentPage,
                  totalPages: paginatedSubjects.totalPages,
                  pageSize: paginatedSubjects.pageSize,
                  totalItems: paginatedSubjects.count,
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

export default ListSubjectView;
