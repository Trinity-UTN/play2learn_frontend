import { motion } from "framer-motion";
import { FaCalendarAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import type { YearResponseDto } from "../../types/year.types";
import {
  Button,
  DataTable,
  type DataTableAction,
  type DataTableColumn,
} from "@/shared";
import styles from "./ListYearView.module.css";
import { useListYear } from "@/admin";

const ListYearView: React.FC = () => {
  const {
    loading,
    paginatedYears,
    handleEdit,
    handleDelete,
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleSearch,
    navigate,
  } = useListYear();

  // Definición de columnas para la tabla
  const columns: DataTableColumn<YearResponseDto>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      width: "100px",
      className: styles.idColumn,
      render: (year) => <span className={styles.idBadge}>{year.id}</span>,
    },
    {
      key: "name",
      label: "Nombre del Año",
      sortable: true,
      className: styles.nameColumn,
      render: (year) => (
        <div className={styles.nameWrapper}>
          <span>{year.name}</span>
        </div>
      ),
    },
  ];

  // Definición de acciones para la tabla
  const actions: DataTableAction<YearResponseDto>[] = [
    {
      label: "Editar",
      icon: <FaEdit />,
      onClick: handleEdit,
      variant: "ghost",
      className: styles.editButton,
      title: "Modificar año",
    },
    {
      label: "Eliminar",
      icon: <FaTrash />,
      onClick: handleDelete,
      variant: "ghost",
      className: styles.deleteButton,
      title: "Eliminar año",
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
          <h1 className={styles.title}>Gestión de Años</h1>
          <p className={styles.subtitle}>
            Administra los años académicos del sistema
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/dashboard/years/create")}
        >
          <FaPlus className={styles.buttonIcon} />
          Nuevo Año
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DataTable
          data={paginatedYears?.results || []}
          columns={columns}
          actions={actions}
          loading={loading}
          searchable={true}
          searchPlaceholder="Buscar años..."
          searchValue={paginationParams.search || ""}
          onSearchChange={handleSearch}
          sortBy={paginationParams.order_by}
          sortOrder={paginationParams.order_type}
          onSort={handleSort}
          emptyStateIcon={<FaCalendarAlt />}
          emptyStateTitle="No se encontraron años"
          emptyStateSubtitle={
            paginationParams.search
              ? "Intenta con otros términos de búsqueda"
              : "Comienza creando un nuevo año"
          }
          loadingText="Cargando años..."
          totalItems={paginatedYears?.count}
          getRowKey={(year) => year.id}
          pagination={
            paginatedYears
              ? {
                  currentPage: paginatedYears.currentPage,
                  totalPages: paginatedYears.totalPages,
                  pageSize: paginatedYears.pageSize,
                  totalItems: paginatedYears.count,
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

export default ListYearView;
