import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import ConfirmationModal from "../../../shared/components/ConfirmationModal/ConfirmationModal";
import { DataTable } from "../../../shared/components/DataTable";
import type {
  DataTableColumn,
  DataTableAction,
} from "../../../shared/components/DataTable";
import { useCourse } from "../../hooks/useCourse";
import type { CourseResponseDto } from "../../services/course/CourseService";
import styles from "./ListCourseView.module.css";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";

const ViewCoursesView: React.FC = () => {
  const navigate = useNavigate();
  const {
    loading,
    getPaginatedCourse,
    deleteCourse,
    paginatedCourse,
    setSelectedCourse,
  } = useCourse();
  const {
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  } = usePaginationParams();
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "warning" as "warning" | "danger",
    isOpen: false,
    showDoubleConfirmation: false,
    onConfirm: () => {},
  });

  useEffect(() => {
    const loadPaginatedCourses = async () => {
      try {
        await getPaginatedCourse(paginationParams);
      } catch (error) {
        console.error("Error al cargar cursos paginados:", error);
      }
    };
    loadPaginatedCourses();
  }, [paginationParams, getPaginatedCourse]);

  const handleEdit = (course: CourseResponseDto) => {
    setAlertConfig({
      title: "Modificar Curso",
      message: `¿Está seguro que desea modificar el curso "${course.name}"?`,
      type: "warning",
      isOpen: true,
      showDoubleConfirmation: false,
      onConfirm: () => {
        setSelectedCourse(course);
        navigate(`/dashboard/courses/edit/${course.id}`);
        setAlertConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDelete = (course: CourseResponseDto) => {
    setAlertConfig({
      title: "Eliminar Curso",
      message: `¿Está seguro que desea eliminar el curso "${course.name}"?`,
      type: "danger",
      isOpen: true,
      showDoubleConfirmation: true,
      onConfirm: async () => {
        try {
          await deleteCourse(course.id);
          // Recargar la página actual después de eliminar
          await getPaginatedCourse(paginationParams);
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error al eliminar curso:", error);
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        }
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

      <ConfirmationModal
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        isOpen={alertConfig.isOpen}
        showDoubleConfirmation={alertConfig.showDoubleConfirmation}
        doubleConfirmationText="¿Está completamente seguro? Esta acción no se puede deshacer."
        onConfirm={alertConfig.onConfirm}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </motion.div>
  );
};

export default ViewCoursesView;
