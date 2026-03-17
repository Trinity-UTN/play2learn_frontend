import { motion, type Variants } from "framer-motion";
import { FaGamepad, FaFire, FaStar } from "react-icons/fa";
import ActivitiesHeader from "../../components/activities/activitiesHeader/ActivitiesHeader";
import ActivitiesStats from "../../components/activities/activitiesStats/ActivitiesStats";
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
    sortBy
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

  const statsVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <ActivitiesHeader itemVariants={itemVariants} />

      {/* <motion.div variants={itemVariants} className={styles.statsSection}>
        <ActivitiesStats
          statsVariants={statsVariants}
          color="var(--color-stat-1)"
          icon={<FaGamepad />}
          value={activities.length}
          label="Actividades"
        />
        <ActivitiesStats
          statsVariants={statsVariants}
          color="var(--color-stat-2)"
          icon={<FaStar />}
          value={activities.filter((a) => a.isPopular).length}
          label="Populares"
        />
        <ActivitiesStats
          statsVariants={statsVariants}
          color="var(--color-stat-3)"
          icon={<FaFire />}
          value={activities.filter((a) => a.isNew).length}
          label="Nuevas"
        />

      </motion.div> */}

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
