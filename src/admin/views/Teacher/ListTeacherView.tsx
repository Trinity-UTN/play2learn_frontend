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
import { useTeacher } from "../../hooks/useTeacher";
import type { TeacherResponseDto } from "../../services/teacher/TeacherService";
import styles from "./ListTeacherView.module.css";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";

const ViewTeacherView: React.FC = () => {
  const navigate = useNavigate();

  const { loading, getPaginatedTeacher, deleteTeacher, paginatedTeacher } =
    useTeacher();
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
    const loadPaginatedTeacher = async () => {
      try {
        await getPaginatedTeacher(paginationParams);
      } catch (error) {
        console.error("Error al cargar docentes paginados:", error);
      }
    };
    loadPaginatedTeacher();
  }, [paginationParams, getPaginatedTeacher]);

  const handleEdit = (teacher: TeacherResponseDto) => {
    setAlertConfig({
      title: "Modificar Docente",
      message: `¿Está seguro que desea modificar el docente "${teacher.name}"?`,
      type: "warning",
      isOpen: true,
      showDoubleConfirmation: false,
      onConfirm: () => {
        navigate(`/dashboard/teachers/edit/${teacher.id}`);
        setAlertConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDelete = (teacher: TeacherResponseDto) => {
    setAlertConfig({
      title: "Eliminar Docente",
      message: `¿Está seguro que desea eliminar el docente "${teacher.name}"?`,
      type: "danger",
      isOpen: true,
      showDoubleConfirmation: true,
      onConfirm: async () => {
        try {
          await deleteTeacher(teacher.id);
          // Recargar la página actual después de eliminar
          await getPaginatedTeacher(paginationParams);
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error al eliminar docente:", error);
        }
      },
    });
  };

  // Definición de columnas para la tabla
  const columns: DataTableColumn<TeacherResponseDto>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      width: "100px",
      className: styles.idColumn,
      render: (teacher) => <span className={styles.idBadge}>{teacher.id}</span>,
    },
    {
      key: "name",
      label: "Nombre del docente",
      sortable: true,
      className: styles.nameColumn,
      render: (teacher) => (
        <div className={styles.nameWrapper}>
          <span>{teacher.name}</span>
        </div>
      ),
    },
    {
      key: "lastname",
      label: "Apellido del docente",
      sortable: true,
      className: styles.nameColumn,
      render: (teacher) => (
        <div className={styles.nameWrapper}>
          <span>{teacher.lastname}</span>
        </div>
      ),
    },
    {
      key: "dni",
      label: "DNI del docente",
      sortable: true,
      className: styles.nameColumn,
      render: (teacher) => (
        <div className={styles.nameWrapper}>
          <span>{teacher.dni}</span>
        </div>
      ),
    },
    {
      key: "user",
      label: "Email del docente",
      sortable: true,
      className: styles.nameColumn,
      render: (teacher) => (
        <div className={styles.nameWrapper}>
          <span>{teacher.user.email}</span>
        </div>
      ),
    },
  ];

  // Definición de acciones para la tabla
  const actions: DataTableAction<TeacherResponseDto>[] = [
    {
      label: "Editar",
      icon: <FaEdit />,
      onClick: handleEdit,
      variant: "ghost",
      className: styles.editButton,
      title: "Modificar docente",
    },
    {
      label: "Eliminar",
      icon: <FaTrash />,
      onClick: handleDelete,
      variant: "ghost",
      className: styles.deleteButton,
      title: "Eliminar docente",
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
          <h1 className={styles.title}>Gestión de Docente</h1>
          <p className={styles.subtitle}>
            Administra los docentes académicos del sistema
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/dashboard/teacher/create")}
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

export default ViewTeacherView;
