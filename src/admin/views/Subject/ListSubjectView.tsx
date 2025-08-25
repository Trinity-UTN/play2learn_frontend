import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus, FaUser } from "react-icons/fa";
import type { SubjectResponseDto } from "../../services/subject/SubjectService";
import Button from "../../../shared/components/Button/ButtonComponent";
import { DataTable } from "../../../shared/components/DataTable";
import type {
  DataTableColumn,
  DataTableAction,
} from "../../../shared/components/DataTable";
import { useSubject } from "../../hooks/useSubject";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import styles from "./ListSubjectView.module.css";

const ListSubjectView: React.FC = () => {
  const {
    loading,
    paginatedSubjects,
    setSelectedSubject,
    getPaginatedSubject,
    deleteSubject,
  } = useSubject();
  const {
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  } = usePaginationParams();
  const { showConfirmation } = useConfirmation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPaginatedSubjects = async () => {
      try {
        await getPaginatedSubject(paginationParams);
      } catch (error) {
        console.error("Error al cargar materias paginadas:", error); // TODO: REMOVE_DEBUG
      }
    };
    loadPaginatedSubjects();
  }, [paginationParams, getPaginatedSubject]);

  const handleEdit = (subject: SubjectResponseDto) => {
    showConfirmation({
      title: "Modificar Materia",
      message: `¿Está seguro que desea modificar la materia "${subject.name}"?`,
      type: "warning",
      onConfirm: () => {
        setSelectedSubject(subject);
        navigate(`/dashboard/subjects/edit/${subject.id}`);
      },
    });
  };

  const handleDelete = (subject: SubjectResponseDto) => {
    showConfirmation({
      title: "Eliminar Materia",
      message: `¿Está seguro que desea eliminar la materia "${subject.name}"?`,
      type: "danger",
      showDoubleConfirmation: true,
      onConfirm: async () => {
        try {
          await deleteSubject(subject.id);
          await getPaginatedSubject(paginationParams);
        } catch (error) {
          console.error("Error al eliminar materia:", error); // TODO: REMOVE_DEBUG
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
      key: "year",
      label: "Año",
      sortable: true,
      className: styles.nameColumn,
      render: (subject) => (
        <div className={styles.nameCell}>
          <div className={styles.nameWrapper}>
            <span>{subject.course?.year?.name || "Sin asignar"}</span>
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
    </motion.div>
  );
};

export default ListSubjectView;
