import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import {
  getStudentAssignColumns,
  getStudentAssignActions,
  useListStudentView,
  type StudentResponseDto,
} from "@/admin";
import { Button, DataTable, itemVariants, containerVariants } from "@/shared";

import styles from "./ListStudentAssingView.module.css";

const ListStudentAssingView: React.FC = () => {
  const {
    loading,
    paginatedStudents,

    // pagination states/actions
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,

    navigate,
  } = useListStudentView();

  const columns = getStudentAssignColumns({
    styles,
  });
  const handleAssing = (data: StudentResponseDto) => {
    console.log(data);
  };
  const actions = getStudentAssignActions({
    styles,
    handleAssing,
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
          <h1 className={styles.title}>Asignación de Estudiantes</h1>
          <p className={styles.subtitle}>Asigna los estudiantes a la materia</p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/dashboard/subjects/list")}
        >
          Volver
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DataTable
          data={paginatedStudents?.results || []}
          columns={columns}
          actions={actions}
          loading={loading}
          searchable={true}
          searchPlaceholder="Buscar estudiantes..."
          searchValue={paginationParams.search || ""}
          onSearchChange={handleSearch}
          sortBy={paginationParams.order_by}
          sortOrder={paginationParams.order_type}
          onSort={handleSort}
          emptyStateIcon={<FaCalendarAlt />}
          emptyStateTitle="No se encontraron estudiantes"
          emptyStateSubtitle={
            paginationParams.search
              ? "Intenta con otros términos de búsqueda"
              : "Comienza creando un nuevo estudiante"
          }
          loadingText="Cargando estudiantes..."
          totalItems={paginatedStudents?.count}
          getRowKey={(student) => student.id}
          pagination={
            paginatedStudents
              ? {
                  currentPage: paginatedStudents.currentPage,
                  totalPages: paginatedStudents.totalPages,
                  pageSize: paginatedStudents.pageSize,
                  totalItems: paginatedStudents.count,
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

export default ListStudentAssingView;
