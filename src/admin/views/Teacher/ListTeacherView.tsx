import { motion } from "framer-motion";
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import { DataTable } from "../../../shared/components/DataTable";
import type {
  DataTableColumn,
  DataTableAction,
} from "../../../shared/components/DataTable";
import { useListTeacherView, type TeacherResponseDto } from "@/admin";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
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

  //Definicion de los botones de Status
  const BtnStatusTrue = () => {
    return (
      <div className={styles.status} style={{ backgroundColor: "#059669" }}>
        Activo
      </div>
    );
  };
  const BtnStatusFalse = ({ teacher }: { teacher: TeacherResponseDto }) => {
    return (
      <button
        className={styles.btnStatus}
        style={{ backgroundColor: "#dc2626" }}
        onClick={() => handleRestore(teacher)}
      >
        De baja
      </button>
    );
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
      label: "Nombre",
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
      label: "Apellido",
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
      label: "DNI",
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
      label: "Email",
      sortable: true,
      className: styles.nameColumn,
      render: (teacher) => (
        <div className={styles.nameWrapper}>
          <span>{teacher.user.email}</span>
        </div>
      ),
    },
    {
      key: "active",
      label: "Estado",
      sortable: true,
      className: styles.nameColumn,
      render: (teacher) => (
        <div className={styles.nameWrapper}>
          {teacher.active ? (
            <BtnStatusTrue />
          ) : (
            <BtnStatusFalse teacher={teacher} />
          )}
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
    {
      label: "Restaurar contraseña",
      icon: <MdOutlineSettingsBackupRestore />,
      onClick: handleRestorePassword,
      variant: "ghost",
      className: styles.restoreButton,
      title: "Restaurar contraseña",
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
