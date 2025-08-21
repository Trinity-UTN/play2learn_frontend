import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaUser, FaTshirt, FaHatWizard } from "react-icons/fa";
import Avatar from "../../components/common/Avatar/AvatarComponent";
import ActionButtons from "../../components/profileAvatar/actionButtons/ActionButtons";
import AspectHeader from "../../components/profileAvatar/aspectHeader/AspectHeader";
import AspectGrid from "../../components/profileAvatar/aspectGrid/AspectGrid";
import AspectPopup from "../../components/profileAvatar/aspectPopup/AspectPopup";
import AspectSearchBar from "../../components/profileAvatar/aspectSearchBar/AspectSearchBar";
import AspectSorter from "../../components/profileAvatar/aspectSorter/AspectSorter";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import styles from "./StudentProfileAvatarView.module.css";
import { useProfileAvatar } from "../../hooks/useProfileAvatar";

const getFilterIcon = (filter: "ALL" | "CUERPO" | "REMERA" | "SOMBRERO") => {
  switch (filter) {
    case "ALL":
      return <FaGlobe />;
    case "CUERPO":
      return <FaUser />;
    case "REMERA":
      return <FaTshirt />;
    case "SOMBRERO":
      return <FaHatWizard />;
  }
};

const StudentProfileAvatarView: React.FC = () => {
  const { currentStudent, loading } = useCurrentStudent();
  const {
    previewState,
    searchTerm,
    selectedFilter,
    sortBy,
    filterTypes,
    showSortFilter,
    showInfoPopup,
    selectedAspectInfo,
    hasChanges,
    filteredAspects,
    setSearchTerm,
    setSelectedFilter,
    setSortBy,
    setShowSortFilter,
    setShowInfoPopup,
    setSelectedAspectInfo,
    handleAspectClick,
    handleSaveChanges,
    isAspectSelected,
  } = useProfileAvatar();

  const getTitle = () => {
    switch (selectedFilter) {
      case "ALL":
        return "ASPECTOS";
      case "CUERPO":
        return "CUERPO";
      case "REMERA":
        return "REMERA";
      case "SOMBRERO":
        return "SOMBRERO";
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando inventario...</p>
      </div>
    );
  }

  if (!currentStudent?.profile) {
    return (
      <div className={styles.errorContainer}>
        <p>No se pudo cargar el perfil del estudiante</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showInfoPopup && selectedAspectInfo && (
          <AspectPopup
            aspect={selectedAspectInfo}
            onClose={() => setShowInfoPopup(false)}
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.inventorySection}>
              <div className={styles.inventoryHeader}>
                <AspectHeader
                  title={getTitle()}
                  icon={getFilterIcon(selectedFilter)}
                />

                <div className={styles.searchContainer}>
                  <AspectSearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />

                  <AspectSorter
                    showSortFilter={showSortFilter}
                    sortBy={sortBy}
                    selectedFilter={selectedFilter}
                    filterTypes={filterTypes}
                    onToggleSortFilter={() =>
                      setShowSortFilter(!showSortFilter)
                    }
                    onSortChange={setSortBy}
                    onFilterChange={(filter) => {
                      setSelectedFilter(filter);
                      setSearchTerm("");
                    }}
                    onReset={() => {
                      setSortBy("name");
                      setSelectedFilter("ALL");
                      setSearchTerm("");
                    }}
                    onApply={() => setShowSortFilter(false)}
                    getFilterIcon={getFilterIcon}
                  />
                </div>
              </div>

              <AspectGrid
                aspects={filteredAspects}
                isAspectSelected={isAspectSelected}
                onAspectClick={handleAspectClick}
                onInfoClick={(aspect) => {
                  setSelectedAspectInfo(aspect);
                  setShowInfoPopup(true);
                }}
              />
              <ActionButtons
                hasChanges={hasChanges}
                loading={loading}
                onSave={handleSaveChanges}
              />
            </div>

            <div className={styles.avatarPreviewSection}>
              <div className={styles.avatarPreviewContainer}>
                <Avatar
                  size={"preview"}
                  showRing={true}
                  previewState={previewState}
                  className={styles.previewAvatar}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default StudentProfileAvatarView;
