import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus, FaUser } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import ConfirmationModal from "../../../shared/components/ConfirmationModal/ConfirmationModal";
import { DataTable } from "../../../shared/components/DataTable";
import type {
  DataTableColumn,
  DataTableAction,
} from "../../../shared/components/DataTable";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import { useSubject } from "../../hooks/useSubject";
import type { SubjectResponseDto } from "../../services/subject/SubjectService";
import styles from "./ListSubjectView.module.css";

const ListSubjectView: React.FC = () => {
  const navigate = useNavigate();
  const {
    loading,
    setSelectedSubject,
    getPaginatedSubject,
    deleteSubject,
    paginatedSubjects,
  } = useSubject();
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
    const loadPaginatedSubjects = async () => {
      try {
        await getPaginatedSubject(paginationParams);
      } catch (error) {
        console.error("Error al cargar materias paginadas:", error);
      }
    };
    loadPaginatedSubjects();
  }, [paginationParams, getPaginatedSubject]);

  const handleEdit = (subject: SubjectResponseDto) => {
    setAlertConfig({
      title: "Modificar Materia",
      message: `¿Está seguro que desea modificar la materia "${subject.name}"?`,
      type: "warning",
      isOpen: true,
      showDoubleConfirmation: false,
      onConfirm: () => {
        setSelectedSubject(subject);
        navigate(`/dashboard/subjects/edit/${subject.id}`);
        setAlertConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDelete = (subject: SubjectResponseDto) => {
    setAlertConfig({
      title: "Eliminar Materia",
      message: `¿Está seguro que desea eliminar la materia "${subject.name}"?`,
      type: "danger",
      isOpen: true,
      showDoubleConfirmation: true,
      onConfirm: async () => {
        try {
          //console.log(`Eliminando materia con ID: ${subject.id}`); // TODO: REMOVE_DEBUG
          await deleteSubject(subject.id);
          // Recargar la página actual después de eliminar
          await getPaginatedSubject(paginationParams);
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error al eliminar materia:", error);
        }
      },
    });
  };

  // Definición de columnas para la tabla
  const columns: DataTableColumn<SubjectResponseDto>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      width: "100px",
      className: styles.idColumn,
      render: (subject) => <span className={styles.idBadge}>{subject.id}</span>,
    },
    {
      key: "name",
      label: "Nombre",
      sortable: true,
      className: styles.nameColumn,
      render: (subject) => (
        <div className={styles.nameCell}>
          <div className={styles.nameWrapper}>
            <span>{subject.name}</span>
          </div>
        </div>
      ),
    },
    {
      key: "course",
      label: "Curso",
      sortable: true,
      className: styles.nameColumn,
      render: (subject) => (
        <div className={styles.nameCell}>
          <div className={styles.nameWrapper}>
            <span>{subject.course?.name || "Sin asignar"}</span>
          </div>
        </div>
      ),
    },
    {
      key: "teacher",
      label: "Profesor",
      sortable: true,
      className: styles.nameColumn,
      render: (subject) => (
        <div className={styles.nameCell}>
          <div className={styles.nameWrapper}>
            <FaUser
              className={
                subject.teacher?.name
                  ? styles.teacherIcon
                  : styles.teacherIconUnassigned
              }
            />
            <span>
              {subject.teacher?.name + " " + subject.teacher?.lastname ||
                "Sin asignar"}
            </span>
          </div>
        </div>
      ),
    },
  ];

  // Definición de acciones para la tabla
  const actions: DataTableAction<SubjectResponseDto>[] = [
    {
      label: "Editar",
      icon: <FaEdit />,
      onClick: handleEdit,
      variant: "ghost",
      className: styles.editButton,
      title: "Modificar materia",
    },
    {
      label: "Eliminar",
      icon: <FaTrash />,
      onClick: handleDelete,
      variant: "ghost",
      className: styles.deleteButton,
      title: "Eliminar materia",
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

export default ListSubjectView;
