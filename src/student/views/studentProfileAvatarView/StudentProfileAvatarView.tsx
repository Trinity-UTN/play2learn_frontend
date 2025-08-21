import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGlobe,
  FaUser,
  FaTshirt,
  FaHatWizard,
  FaSearch,
  FaTimes,
  FaInfoCircle,
  FaSave,
} from "react-icons/fa";
import Avatar from "../../components/common/Avatar/AvatarComponent";
import AspectPopup from "../../components/profileAvatar/aspects/aspectPopup/AspectPopup";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import styles from "./StudentProfileAvatarView.module.css";

interface BodyPart {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
  available: boolean;
}

interface NullAspect {
  id: -1;
  name: string;
  image: "";
  price: 0;
  type: "REMERA" | "SOMBRERO";
  available: true;
  isNull: true;
}

interface PreviewState {
  selectedBody: BodyPart | null;
  selectedShirt: BodyPart | null;
  selectedHat: BodyPart | null;
}

const StudentProfileAvatarView: React.FC = () => {
  const { currentStudent, updateStudentProfile, unselectAspect, loading } =
    useCurrentStudent();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "ALL" | "CUERPO" | "REMERA" | "SOMBRERO"
  >("ALL");
  const [previewState, setPreviewState] = useState<PreviewState>({
    selectedBody: null,
    selectedShirt: null,
    selectedHat: null,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "type">("type");
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [selectedAspectInfo, setSelectedAspectInfo] = useState<BodyPart | null>(
    null
  );

  const filterTypes = ["ALL", "CUERPO", "REMERA", "SOMBRERO"] as const;

  const nullAspects: NullAspect[] = [
    {
      id: -1,
      name: "Sin remera",
      image: "",
      price: 0,
      type: "REMERA",
      available: true,
      isNull: true,
    },
    {
      id: -1,
      name: "Sin sombrero",
      image: "",
      price: 0,
      type: "SOMBRERO",
      available: true,
      isNull: true,
    },
  ];

  useEffect(() => {
    if (currentStudent?.profile) {
      setPreviewState({
        selectedBody: currentStudent.profile.selectedBody,
        selectedShirt: currentStudent.profile.selectedShirt,
        selectedHat: currentStudent.profile.selectedHat,
      });
    }
  }, [currentStudent]);

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

  const getTitleIcon = () => {
    return getFilterIcon(selectedFilter);
  };

  const getFilterIcon = (filter: (typeof filterTypes)[number]) => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.sortFilterContainer}`)) {
        setShowSortFilter(false);
      }
      if (
        !target.closest(`.${styles.infoPopup}`) &&
        !target.closest(`.${styles.infoButton}`)
      ) {
        setShowInfoPopup(false);
      }
    };

    if (showSortFilter || showInfoPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSortFilter, showInfoPopup]);

  const filteredAspects = useMemo(() => {
    if (!currentStudent?.profile?.ownedAspects) return [];

    let filtered = currentStudent.profile.ownedAspects.filter((aspect) => {
      const matchesSearch = aspect.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        selectedFilter === "ALL" || aspect.type === selectedFilter;
      return matchesSearch && matchesFilter;
    });

    if (
      !searchTerm &&
      (selectedFilter === "REMERA" || selectedFilter === "SOMBRERO")
    ) {
      const nullAspect = nullAspects.find(
        (aspect) => aspect.type === selectedFilter
      );
      if (nullAspect) {
        filtered.unshift(nullAspect as any);
      }
    }

    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
      }

      return comparison;
    });

    return filtered;
  }, [
    currentStudent?.profile?.ownedAspects,
    searchTerm,
    selectedFilter,
    sortBy,
  ]);

  const handleAspectClick = (aspect: BodyPart | NullAspect) => {
    const newPreviewState = { ...previewState };

    switch (aspect.type) {
      case "CUERPO":
        newPreviewState.selectedBody = aspect as BodyPart;
        break;
      case "REMERA":
        newPreviewState.selectedShirt = (aspect as any).isNull
          ? null
          : (aspect as BodyPart);
        break;
      case "SOMBRERO":
        newPreviewState.selectedHat = (aspect as any).isNull
          ? null
          : (aspect as BodyPart);
        break;
    }

    setPreviewState(newPreviewState);

    const hasBodyChange =
      newPreviewState.selectedBody?.id !==
      currentStudent?.profile?.selectedBody?.id;
    const hasShirtChange =
      newPreviewState.selectedShirt?.id !==
      currentStudent?.profile?.selectedShirt?.id;
    const hasHatChange =
      newPreviewState.selectedHat?.id !==
      currentStudent?.profile?.selectedHat?.id;

    setHasChanges(hasBodyChange || hasShirtChange || hasHatChange);
  };

  const handleSaveChanges = async () => {
    if (!currentStudent?.profile?.id || !hasChanges) return;

    try {
      // CUERPO
      if (
        previewState.selectedBody?.id !==
          currentStudent.profile.selectedBody?.id &&
        previewState.selectedBody
      ) {
        await updateStudentProfile([
          {
            aspectId: previewState.selectedBody.id,
            profileId: currentStudent.profile.id,
          },
        ]);
      }

      // REMERA
      if (
        previewState.selectedShirt?.id !==
        currentStudent.profile.selectedShirt?.id
      ) {
        if (previewState.selectedShirt === null) {
          await unselectAspect(currentStudent.profile.id, "REMERA");
        } else {
          await updateStudentProfile([
            {
              aspectId: previewState.selectedShirt.id,
              profileId: currentStudent.profile.id,
            },
          ]);
        }
      }

      // SOMBRERO
      if (
        previewState.selectedHat?.id !== currentStudent.profile.selectedHat?.id
      ) {
        if (previewState.selectedHat === null) {
          await unselectAspect(currentStudent.profile.id, "SOMBRERO");
        } else {
          await updateStudentProfile([
            {
              aspectId: previewState.selectedHat.id,
              profileId: currentStudent.profile.id,
            },
          ]);
        }
      }

      setHasChanges(false);
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
    }
  };

  const isAspectSelected = (aspect: BodyPart | NullAspect) => {
    if ((aspect as any).isNull) {
      if (aspect.type === "REMERA") {
        return previewState.selectedShirt === null;
      }
      if (aspect.type === "SOMBRERO") {
        return previewState.selectedHat === null;
      }
    } else {
      return (
        (aspect.type === "CUERPO" &&
          previewState.selectedBody?.id === aspect.id) ||
        (aspect.type === "REMERA" &&
          previewState.selectedShirt?.id === aspect.id) ||
        (aspect.type === "SOMBRERO" &&
          previewState.selectedHat?.id === aspect.id)
      );
    }
    return false;
  };

  const showActionButtons = selectedFilter !== "ALL";

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
                <div className={styles.titleContainer}>
                  <h1 className={styles.title}>
                    <span className={styles.titleIcon}>{getTitleIcon()}</span>
                    {getTitle()}
                  </h1>
                </div>

                <div className={styles.searchContainer}>
                  <div className={styles.searchInputWrapper}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="Buscar aspectos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={styles.searchInput}
                    />
                  </div>
                  <div className={styles.sortFilterContainer}>
                    <button
                      className={`${styles.sortFilterButton} ${
                        showSortFilter ? styles.sortFilterButtonActive : ""
                      }`}
                      onClick={() => setShowSortFilter(!showSortFilter)}
                    >
                      <span>ORDENAR Y FILTRAR</span>
                    </button>

                    {showSortFilter && (
                      <div className={styles.sortFilterDropdown}>
                        <div className={styles.sortFilterSection}>
                          <h4 className={styles.sortFilterTitle}>
                            ORDENAR POR
                          </h4>
                          <div className={styles.sortOptions}>
                            <button
                              className={`${styles.sortOption} ${
                                sortBy === "name" ? styles.sortOptionActive : ""
                              }`}
                              onClick={() => setSortBy("name")}
                            >
                              NOMBRE
                            </button>
                            <button
                              className={`${styles.sortOption} ${
                                sortBy === "type" ? styles.sortOptionActive : ""
                              }`}
                              onClick={() => setSortBy("type")}
                            >
                              TIPO
                            </button>
                          </div>
                        </div>

                        <div className={styles.sortFilterSection}>
                          <h4 className={styles.sortFilterTitle}>
                            FILTRAR POR TIPO
                          </h4>
                          <div className={styles.filterOptions}>
                            {filterTypes.map((filter) => (
                              <button
                                key={filter}
                                onClick={() => {
                                  setSelectedFilter(filter);
                                  setSearchTerm("");
                                }}
                                className={`${styles.filterOption} ${
                                  selectedFilter === filter
                                    ? styles.filterOptionActive
                                    : ""
                                }`}
                              >
                                <span className={styles.filterIcon}>
                                  {getFilterIcon(filter)}
                                </span>
                                <span>
                                  {filter === "ALL" ? "TODOS" : filter}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className={styles.sortFilterActions}>
                          <button
                            className={styles.resetButton}
                            onClick={() => {
                              setSortBy("name");
                              setSelectedFilter("ALL");
                              setSearchTerm("");
                            }}
                          >
                            RESETEAR
                          </button>
                          <button
                            className={styles.applyButton}
                            onClick={() => setShowSortFilter(false)}
                          >
                            APLICAR
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.aspectsGrid}>
                {filteredAspects.map((aspect, index) => {
                  const isSelected = isAspectSelected(aspect);
                  const isNullAspect = (aspect as any).isNull;

                  return (
                    <div
                      key={
                        isNullAspect
                          ? `null-${aspect.type}-${index}`
                          : aspect.id
                      }
                      onClick={() => handleAspectClick(aspect)}
                      className={`${styles.aspectCard} ${
                        isSelected ? styles.aspectCardSelected : ""
                      } ${isNullAspect ? styles.aspectCardNull : ""}`}
                    >
                      {!isNullAspect && (
                        <button
                          className={styles.aspectInfoButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAspectInfo(aspect as BodyPart);
                            setShowInfoPopup(true);
                          }}
                        >
                          <FaInfoCircle />
                        </button>
                      )}
                      <div className={styles.aspectImageContainer}>
                        {isNullAspect ? (
                          <div className={styles.nullAspectIcon}>
                            <FaTimes />
                          </div>
                        ) : (
                          <img
                            src={aspect.image || "/placeholder.svg"}
                            alt={aspect.name}
                            className={styles.aspectImage}
                          />
                        )}
                        {isSelected && (
                          <div className={styles.selectedOverlay}>✓</div>
                        )}
                      </div>
                      <div className={styles.aspectInfo}>
                        <h3 className={styles.aspectName}>{aspect.name}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>

              {showActionButtons && (
                <div className={styles.actionButtons}>
                  <button
                    onClick={handleSaveChanges}
                    disabled={!hasChanges || loading}
                    className={styles.saveButtonGrid}
                  >
                    <FaSave />
                    <span>
                      {hasChanges && loading
                        ? "Guardando..."
                        : "Guardar Cambios"}
                    </span>
                  </button>
                </div>
              )}

              {!showActionButtons && (
                <div className={styles.actionButtons}>
                  <button
                    onClick={handleSaveChanges}
                    disabled={!hasChanges || loading}
                    className={styles.saveButtonGrid}
                  >
                    <FaSave />
                    <span>
                      {hasChanges && loading
                        ? "Guardando..."
                        : "Guardar Cambios"}
                    </span>
                  </button>
                </div>
              )}
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
