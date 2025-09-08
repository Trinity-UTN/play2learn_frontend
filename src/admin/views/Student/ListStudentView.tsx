import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import type { StudentResponseDto } from "../../services/student/StudentService";
import Button from "../../../shared/components/Button/ButtonComponent";
import { DataTable } from "../../../shared/components/DataTable";
import type {
  DataTableColumn,
  DataTableAction,
} from "../../../shared/components/DataTable";
import { useStudent } from "../../hooks/useStudent";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../shared/hooks/useToaster";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import styles from "./ListStudentView.module.css";

const ListStudentView: React.FC = () => {
  const {
    loading,
    paginatedStudents,
    getPaginatedStudent,
    deleteStudent,
    setSelectedStudent,
    restoreStudent,
  } = useStudent();
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
    const loadPaginatedStudents = async () => {
      await getPaginatedStudent(paginationParams);
    };
    loadPaginatedStudents();
  }, [paginationParams, getPaginatedStudent]);

  const handleEdit = (student: StudentResponseDto) => {
    showConfirmation({
      title: "Modificar Estudiante",
      message: `¿Está seguro que desea modificar el estudiante "${student.name} ${student.lastname}"?`,
      type: "warning",
      onConfirm: () => {
        setSelectedStudent(student);
        navigate(`/dashboard/students/edit/${student.id}`);
      },
    });
  };

  const handleDelete = (student: StudentResponseDto) => {
    showConfirmation({
      title: "Eliminar Estudiante",
      message: `¿Está seguro que desea eliminar el estudiante "${student.name} ${student.lastname}"?`,
      type: "danger",
      showDoubleConfirmation: true,
      onConfirm: async () => {
        await deleteStudent(student.id);
        await getPaginatedStudent(paginationParams);
        showToast({
          title: "Estudiante eliminado exitosamente",
          message: "El estudiante ha sido eliminado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  };

  const handleRestore = (student: StudentResponseDto) => {
    showConfirmation({
      title: "Restaurar Estudiante",
      message: `¿Está seguro que desea restaurar el estudiante "${student.name} ${student.lastname}"?`,
      type: "warning",
      onConfirm: async () => {
        await restoreStudent(student.id);
        await getPaginatedStudent(paginationParams);
        showToast({
          title: "Estudiante restaurado exitosamente",
          message: "El estudiante ha sido restaurado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  };

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
