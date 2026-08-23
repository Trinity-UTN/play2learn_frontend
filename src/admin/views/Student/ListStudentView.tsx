import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import {
  getStudentColumns,
  getStudentActions,
  useListStudentView,
} from "@/admin";
import {
  Button,
  DataTable,
  LoadingSpinnerComponent,
  itemVariants,
  containerVariants,
} from "@/shared";

import styles from "./ListStudentView.module.css";
import { YearCourseSelector } from "@/admin/components/YearCourseSelector/YearCourseSelector";

const ListStudentView: React.FC = () => {
  const {
    loading,
    paginatedStudents,

    // pagination states/actions
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,

    // student actions
    handleEdit,
    handleDelete,
    handleRestore,
    handleRestorePassword,
    navigate,

    year,
    onYearChange,
    courseId,
    onCourseChange,
    filteredCourses,
    years,
    subjectId,
    filteredSubjects,
    onSubjectChange,
  } = useListStudentView();

  const columns = getStudentColumns({
    styles,
    handleRestore,
  });

  const actions = getStudentActions({
    styles,
    handleEdit,
    handleDelete,
    handleRestorePassword,
  });

  if (loading && !paginatedStudents) {
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
          <h1 className={styles.title}>Gestión de Estudiantes</h1>
          <p className={styles.subtitle}>
            Administra los estudiantes del sistema
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/dashboard/students/create")}
        >
          <FaPlus className={styles.buttonIcon} />
          Nuevo Estudiante
        </Button>
      </motion.div>

      {/* Sacar a un componente */}

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
          filterChildren={
            <YearCourseSelector
              years={years}
              courses={filteredCourses}
              subjects={filteredSubjects}
              selectedYear={year}
              selectedCourse={courseId}
              selectedSubject={subjectId}
              onYearChange={onYearChange}
              onCourseChange={onCourseChange}
              onSubjectChange={onSubjectChange}
            />
          }
        />
      </motion.div>
    </motion.div>
  );
};

export default ListStudentView;
