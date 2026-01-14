import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { getStudentAssignColumns } from "@/admin";
import { Button, DataTable, itemVariants, containerVariants } from "@/shared";

import styles from "./ListStudentAssingView.module.css";
import { useStudentAssingment } from "@/admin/hooks/hooksUI/Subject/useStudentAssingment";

const ListStudentAssingView: React.FC = () => {
  const {
    students,
    navigate,
    loading,
    handleAssign,
    handleUnassign,
    subject,
    handleSearch,
    handleSort,
    // sortConfig,
    searchTerm,
  } = useStudentAssingment();

  const columns = getStudentAssignColumns({
    styles,
    handleAssign,
    handleUnassign,
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div>
          <h1 className={styles.title}>Asignación de Estudiantes</h1>
          <p className={styles.subtitle}>
            Asigna los estudiantes a la materia
            <strong>"{subject?.name}"</strong> de {subject.course.year.name}{" "}
            {subject.course.name}
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/dashboard/subjects/list")}
        >
          Volver
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DataTable
          data={students || []}
          columns={columns}
          loading={loading}
          searchable={true}
          searchPlaceholder="Buscar estudiantes..."
          onSearchChange={handleSearch}
          searchValue={searchTerm}
          onSort={handleSort}
          emptyStateIcon={<FaCalendarAlt />}
          emptyStateTitle="No se encontraron estudiantes"
          loadingText="Cargando estudiantes..."
          totalItems={students?.length}
          getRowKey={(student) => student.id}
        />
      </motion.div>
    </motion.div>
  );
};

export default ListStudentAssingView;
