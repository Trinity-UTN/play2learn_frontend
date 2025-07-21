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
import { useStudent } from "../../hooks/useStudent";
import type { StudentResponseDto } from "../../services/student/StudentService";
import styles from "./ListStudentView.module.css";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";

const ListStudentView: React.FC = () => {
  const navigate = useNavigate();

  const {
    loading,
    getPaginatedStudent,
    deleteStudent,
    paginatedStudents,
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
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "warning" as "warning" | "danger",
    isOpen: false,
    showDoubleConfirmation: false,
    onConfirm: () => {},
  });

  useEffect(() => {
    const loadPaginatedStudents = async () => {
      try {
        await getPaginatedStudent(paginationParams);
      } catch (error) {
        console.error("Error al cargar estudiantes paginados:", error); // TODO: REMOVE_DEBUG
      }
    };
    loadPaginatedStudents();
  }, [paginationParams, getPaginatedStudent]);

  const handleEdit = (student: StudentResponseDto) => {
    setAlertConfig({
      title: "Modificar Estudiante",
      message: `¿Está seguro que desea modificar el estudiante "${student.name} ${student.lastname}"?`,
      type: "warning",
      isOpen: true,
      showDoubleConfirmation: false,
      onConfirm: () => {
        setSelectedStudent(student);
        navigate(`/dashboard/students/edit/${student.id}`);
        setAlertConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDelete = (student: StudentResponseDto) => {
    setAlertConfig({
      title: "Eliminar Estudiante",
      message: `¿Está seguro que desea eliminar el estudiante "${student.name} ${student.lastname}"?`,
      type: "danger",
      isOpen: true,
      showDoubleConfirmation: true,
      onConfirm: async () => {
        try {
          await deleteStudent(student.id);
          await getPaginatedStudent(paginationParams);
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error al eliminar estudiante:", error); // TODO: REMOVE_DEBUG
        }
      },
    });
  };

  //Implementar cuando este listo el restaurar
  const handleRestore = (student: StudentResponseDto) => {
    setAlertConfig({
      title: "Restaurar Estudiante",
      message: `¿Está seguro que desea restaurar el estudiante "${student.name}"?`,
      type: "warning",
      isOpen: true,
      showDoubleConfirmation: true,
      onConfirm: async () => {
        try {
          await restoreStudent(student.id);
          await getPaginatedStudent(paginationParams);
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error al restaurar estudiante:", error); // TODO: REMOVE_DEBUG
        }
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
        <div className={styles.nameWrapper}>
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
        <div className={styles.nameWrapper}>
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
        <div className={styles.nameWrapper}>
          <span>{student.dni}</span>
        </div>
      ),
    },
    {
      key: "user",
      label: "Email",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.nameWrapper}>
          <span>{student.user.email}</span>
        </div>
      ),
    },
    {
      key: "course",
      label: "Curso",
      sortable: true,
      className: styles.nameColumn,
      render: (student) => (
        <div className={styles.nameWrapper}>
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
        <div className={styles.nameWrapper}>
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

      <ConfirmationModal
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        isOpen={alertConfig.isOpen}
        showDoubleConfirmation={alertConfig.showDoubleConfirmation}
        doubleConfirmationText="¿Está completamente seguro?"
        onConfirm={alertConfig.onConfirm}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </motion.div>
  );
};

export default ListStudentView;
