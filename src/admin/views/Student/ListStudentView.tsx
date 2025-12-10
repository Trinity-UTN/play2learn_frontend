import { motion } from "framer-motion";
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useListStudentView, type StudentResponseDto } from "@/admin";
import {
  Button,
  DataTable,
  type DataTableAction,
  type DataTableColumn,
  itemVariants,
  containerVariants,
} from "@/shared";

import styles from "./ListStudentView.module.css";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

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
  } = useListStudentView();

  //Definicion de los botones de Status
  const BtnStatusTrue = () => {
    return (
      <div className={styles.status} style={{ backgroundColor: "#059669" }}>
        Activo
      </div>
    );
  };

  const BtnStatusFalse = ({ student }: { student: StudentResponseDto }) => {
    return (
      <button
        className={styles.btnStatus}
        style={{ backgroundColor: "#dc2626" }}
        onClick={() => handleRestore(student)}
      >
        De baja
      </button>
    );
  };

  // Definición de columnas para la tabla
  const columns: DataTableColumn<StudentResponseDto>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      width: "100px",
      className: styles.idColumn,
      render: (student) => <span className={styles.idBadge}>{student.id}</span>,
    },
    {
      key: "name",
      label: "Nombre",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.wrapper}>
          <span>{student.name}</span>
        </div>
      ),
    },
    {
      key: "lastname",
      label: "Apellido",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.wrapper}>
          <span>{student.lastname}</span>
        </div>
      ),
    },
    {
      key: "dni",
      label: "DNI",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.centeredWrapper}>
          <span>{student.dni}</span>
        </div>
      ),
    },
    {
      key: "birthdate",
      label: "Fecha de nacimiento",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.centeredWrapper}>
          <span>{student.birthdate || "Sin asignar"}</span>
        </div>
      ),
    },
    {
      key: "user",
      label: "Email de Estudiante",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.wrapper}>
          <span>{student.user.email}</span>
        </div>
      ),
    },
    {
      key: "emailTutor",
      label: "Email de Tutor",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.wrapper}>
          <span>{student.emailTutor || "Sin asignar"}</span>
        </div>
      ),
    },
    {
      key: "course",
      label: "Curso",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.wrapper}>
          <span>
            {student.course.year.name} "{student.course.name}"
          </span>
        </div>
      ),
    },
    {
      key: "active",
      label: "Estado",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.wrapper}>
          {student.active ? (
            <BtnStatusTrue />
          ) : (
            <BtnStatusFalse student={student} />
          )}
        </div>
      ),
    },
  ];

  // Definición de acciones para la tabla
  const actions: DataTableAction<StudentResponseDto>[] = [
    {
      label: "Editar",
      icon: <FaEdit />,
      onClick: handleEdit,
      variant: "ghost",
      className: styles.editButton,
      title: "Modificar estudiante",
    },
    {
      label: "Eliminar",
      icon: <FaTrash />,
      onClick: handleDelete,
      variant: "ghost",
      className: styles.deleteButton,
      title: "Eliminar estudiante",
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

export default ListStudentView;
