import { useEffect, useState, useMemo } from "react";
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
                <AspectHeader title={getTitle()} icon={getTitleIcon()} />

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
