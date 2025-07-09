import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import Card from "../../../shared/components/Card/CardComponent";
import ConfirmationModal from "../../../shared/components/ConfirmationModal/ConfirmationModal";
import Input from "../../../shared/components/Input/InputComponent";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import { useYear } from "../../hooks/useYear";
import type { GetYearPayload } from "../../services/year/YearService";
import styles from "./ListYearView.module.css";

const ListYearView: React.FC = () => {
  const navigate = useNavigate();
  const { loading, getYear, deleteYear, years } = useYear();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "name">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "warning" as "warning" | "danger",
    isOpen: false,
    showDoubleConfirmation: false,
    onConfirm: () => {},
  });

  // Comentado: Configuración de paginación para uso futuro
  // const [paginationParams, setPaginationParams] = useState<GetPaginatedYearPayload>({
  //   page: 1,
  //   page_size: 10,
  //   order_by: "id",
  //   order_type: "asc",
  //   search: "",
  //   filters: [],
  //   filtersValues: [],
  // })

  useEffect(() => {
    const loadYears = async () => {
      try {
        await getYear();
      } catch (error) {
        console.error("Error al cargar años:", error);
      }
    };

    loadYears();
  }, []);

  // Filtrado y ordenamiento local por ahora
  const filteredAndSortedYears =
    years
      ?.filter((year: GetYearPayload) =>
        year.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      ?.sort((a: GetYearPayload, b: GetYearPayload) => {
        const aValue = sortBy === "id" ? a.id : a.name.toLowerCase();
        const bValue = sortBy === "id" ? b.id : b.name.toLowerCase();

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }) || [];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Funciones de paginación para uso futuro
  // const handlePageChange = (page: number) => {
  //   setPaginationParams((prev) => ({
  //     ...prev,
  //     page,
  //   }))
  // }

  // const handlePageSizeChange = (pageSize: number) => {
  //   setPaginationParams((prev) => ({
  //     ...prev,
  //     page_size: pageSize,
  //     page: 1,
  //   }))
  // }

  const handleSort = (column: "id" | "name") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }

    // Lógica de ordenamiento para API
    // setPaginationParams((prev) => ({
    //   ...prev,
    //   order_by: column,
    //   order_type: prev.order_by === column && prev.order_type === "asc" ? "desc" : "asc",
    //   page: 1,
    // }))
  };

  const getSortIcon = (column: "id" | "name") => {
    if (sortBy !== column) {
      return <FaSort className={styles.sortIcon} />;
    }
    return sortOrder === "asc" ? (
      <FaSortUp className={styles.sortIcon} />
    ) : (
      <FaSortDown className={styles.sortIcon} />
    );
  };

  const handleEdit = (year: GetYearPayload) => {
    setAlertConfig({
      title: "Modificar Año",
      message: `¿Está seguro que desea modificar el año "${year.name}"?`,
      type: "warning",
      isOpen: true,
      showDoubleConfirmation: false,
      onConfirm: () => {
        navigate(`/years/edit/${year.id}`);
        setAlertConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDelete = (year: GetYearPayload) => {
    setAlertConfig({
      title: "Eliminar Año",
      message: `¿Está seguro que desea eliminar el año "${year.name}"?`,
      type: "danger",
      isOpen: true,
      showDoubleConfirmation: true,
      onConfirm: async () => {
        try {
          console.log(`Eliminando año con ID: ${year.id}`);
          await deleteYear(year.id);
          await getYear();
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Error al eliminar año:", error);
        }
      },
    });
  };

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
        <Button variant="primary" onClick={() => navigate("/years/create")}>
          <FaPlus className={styles.buttonIcon} />
          Nuevo Año
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className={styles.tableCard}>
          <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <Input
                placeholder="Buscar años..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.resultsInfo}>
              {searchTerm ? (
                <span>
                  Mostrando {filteredAndSortedYears.length} de{" "}
                  {years?.length || 0} años
                </span>
              ) : (
                <span>Total: {years?.length || 0} años</span>
              )}
            </div>
          </div>

          <div className={styles.tableWrapper}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <LoadingSpinnerComponent text="Cargando años..." />
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th
                      className={`${styles.idColumn} ${styles.sortableHeader}`}
                      onClick={() => handleSort("id")}
                    >
                      <div className={styles.headerContent}>
                        ID
                        {getSortIcon("id")}
                      </div>
                    </th>
                    <th
                      className={`${styles.nameColumn} ${styles.sortableHeader}`}
                      onClick={() => handleSort("name")}
                    >
                      <div className={styles.headerContent}>
                        Nombre del Año
                        {getSortIcon("name")}
                      </div>
                    </th>
                    <th className={styles.actionsColumn}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedYears.length > 0 ? (
                    filteredAndSortedYears.map(
                      (year: GetYearPayload, index: number) => (
                        <motion.tr
                          key={year.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={styles.tableRow}
                        >
                          <td className={styles.idCell}>
                            <span className={styles.idBadge}>{year.id}</span>
                          </td>
                          <td className={styles.nameCell}>
                            <div className={styles.nameWrapper}>
                              <FaCalendarAlt className={styles.yearIcon} />
                              <span>{year.name}</span>
                            </div>
                          </td>
                          <td className={styles.actionsCell}>
                            <div className={styles.actions}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(year)}
                                className={styles.editButton}
                                title="Modificar año"
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(year)}
                                className={styles.deleteButton}
                                title="Eliminar año"
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan={3} className={styles.emptyState}>
                        <div className={styles.emptyContent}>
                          <FaCalendarAlt className={styles.emptyIcon} />
                          <p>No se encontraron años</p>
                          <small>
                            {searchTerm
                              ? "Intenta con otros términos de búsqueda"
                              : "Comienza creando un nuevo año"}
                          </small>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Paginación para uso futuro */}
          {/* {paginatedYears && paginatedYears.totalPages > 0 && !loading && (
            <PaginationComponent
              currentPage={paginatedYears.currentPage}
              totalPages={paginatedYears.totalPages}
              pageSize={paginatedYears.pageSize}
              totalItems={paginatedYears.totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )} */}
        </Card>
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

export default ListYearView;
