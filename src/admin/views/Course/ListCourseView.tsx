import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { Button, DataTable, itemVariants, containerVariants } from "@/shared";
import { getCourseColumns, getCourseActions, useCourseView } from "@/admin";
import styles from "./ListCourseView.module.css";

const ViewCoursesView: React.FC = () => {
  const {
    loading,
    paginatedCourse,
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleEdit,
    handleDelete,
    navigate,
  } = useCourseView();

  const columns = getCourseColumns(styles);
  const actions = getCourseActions({ styles, handleEdit, handleDelete });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestión de Curso</h1>
          <p className={styles.subtitle}>
            Administra los cursos académicos del sistema
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/dashboard/courses/create")}
        >
          <FaPlus className={styles.buttonIcon} />
          Nuevo Curso
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DataTable
          data={paginatedCourse?.results || []}
          columns={columns}
          actions={actions}
          loading={loading}
          searchable={true}
          searchPlaceholder="Buscar cursos..."
          searchValue={paginationParams.search || ""}
          onSearchChange={handleSearch}
          sortBy={paginationParams.order_by}
          sortOrder={paginationParams.order_type}
          onSort={handleSort}
          emptyStateIcon={<FaCalendarAlt />}
          emptyStateTitle="No se encontraron cursos"
          emptyStateSubtitle={
            paginationParams.search
              ? "Intenta con otros términos de búsqueda"
              : "Comienza creando un nuevo cursos"
          }
          loadingText="Cargando cursos..."
          totalItems={paginatedCourse?.count}
          getRowKey={(course) => course.id}
          pagination={
            paginatedCourse
              ? {
                  currentPage: paginatedCourse.currentPage,
                  totalPages: paginatedCourse.totalPages,
                  pageSize: paginatedCourse.pageSize,
                  totalItems: paginatedCourse.count,
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

export default ViewCoursesView;
