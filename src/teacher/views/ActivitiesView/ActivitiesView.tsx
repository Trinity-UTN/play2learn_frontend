import { motion, type Variants } from "framer-motion";
import ActivitiesHeader from "../../components/activities/activitiesHeader/ActivitiesHeader";
import ActivitiesFilter from "../../components/activities/activitiesFilter/ActivitiesFilter";
import ActivitiesGrid from "../../components/activities/activitiesGrid/ActivitiesGrid";
import { activities } from "../../data/DataActivity";
import { useActivityFilters } from "../../hooks/activities/useActivityFilters";
import { useFilteredActivities } from "../../hooks/activities/useFilteredActivities";
import styles from "./ActivitiesView.module.css";

const ActivitiesView: React.FC = () => {
  const { searchTerm, setSearchTerm, sortBy, setSortBy } = useActivityFilters();
  const filteredActivities = useFilteredActivities(
    activities,
    searchTerm,
    sortBy,
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
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
      <ActivitiesHeader itemVariants={itemVariants} />

      <ActivitiesFilter
        itemVariants={itemVariants}
        searchTerm={searchTerm}
        searchPlaceholder="Buscar actividades..."
        sortBy={sortBy}
        onSearchChange={(value: string) => setSearchTerm(value)}
        onSortChange={(value: string) => setSortBy(value)}
      />

      <ActivitiesGrid
        itemVariants={itemVariants}
        filteredActivities={filteredActivities}
        noResultTitle="No se encontraron actividades"
        noResultText="Intenta ajustar los filtros o términos de búsqueda para encontrar actividades."
      />
    </motion.div>
  );
};

export default ActivitiesView;
