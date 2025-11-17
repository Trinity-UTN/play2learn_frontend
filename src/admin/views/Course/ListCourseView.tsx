import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import type { CourseResponseDto } from "../../services/course/CourseService";
import Button from "../../../shared/components/Button/ButtonComponent";
import { DataTable } from "../../../shared/components/DataTable";
import type {
  DataTableColumn,
  DataTableAction,
} from "../../../shared/components/DataTable";
import { useCourse } from "../../hooks/useCourse";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../shared/hooks/useToaster";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import styles from "./ListCourseView.module.css";

const ViewCoursesView: React.FC = () => {
  const {
    loading,
    paginatedCourse,
    getPaginatedCourse,
    deleteCourse,
    setSelectedCourse,
  } = useCourse();
  const {
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  } = usePaginationParams();
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPaginatedCourses = async () => {
      await getPaginatedCourse(paginationParams);
    };
    loadPaginatedCourses();
  }, [paginationParams, getPaginatedCourse]);

  const handleEdit = (course: CourseResponseDto) => {
    showConfirmation({
      title: "Modificar Curso",
      message: `¿Está seguro que desea modificar el curso "${course.name}"?`,
      type: "warning",
      onConfirm: () => {
        setSelectedCourse(course);
        navigate(`/dashboard/courses/edit/${course.id}`);
      },
    });
  };

  const handleDelete = (course: CourseResponseDto) => {
    showConfirmation({
      title: "Eliminar Curso",
      message: `¿Está seguro que desea eliminar el curso "${course.name}"?`,
      type: "danger",
      showDoubleConfirmation: true,
      onConfirm: async () => {
        await deleteCourse(course.id);
        await getPaginatedCourse(paginationParams);
        showToast({
          title: "Curso eliminado exitosamente",
          message: "El curso ha sido eliminado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  };

  // Definición de columnas para la tabla
  const columns: DataTableColumn<CourseResponseDto>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      width: "100px",
      className: styles.idColumn,
      render: (curso) => <span className={styles.idBadge}>{curso.id}</span>,
    },
    {
      key: "name",
      label: "Nombre del curso",
      sortable: true,
      className: styles.nameColumn,
      render: (course) => (
        <div className={styles.nameWrapper}>
          <span>{course.name}</span>
        </div>
      ),
    },
    {
      key: "year",
      label: "Nombre del Año",
      sortable: true,
      className: styles.nameColumn,
      render: (course) => (
        <div className={styles.nameWrapper}>
          <span>{course.year.name}</span>
        </div>
      ),
    },
  ];

  // Definición de acciones para la tabla
  const actions: DataTableAction<CourseResponseDto>[] = [
    {
      label: "Editar",
      icon: <FaEdit />,
      onClick: handleEdit,
      variant: "ghost",
      className: styles.editButton,
      title: "Modificar curso",
    },
    {
      label: "Eliminar",
      icon: <FaTrash />,
      onClick: handleDelete,
      variant: "ghost",
      className: styles.deleteButton,
      title: "Eliminar curso",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

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
