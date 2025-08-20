import { useEffect, useState, useMemo } from "react";
import { FaGlobe, FaUser, FaTshirt, FaHatWizard } from "react-icons/fa";
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

interface PreviewState {
  selectedBody: BodyPart | null;
  selectedShirt: BodyPart | null;
  selectedHat: BodyPart | null;
}

const StudentProfileAvatarView: React.FC = () => {
  const { currentStudent, updateStudentProfile, loading } = useCurrentStudent();
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

  useEffect(() => {
    if (currentStudent?.profile) {
      setPreviewState({
        selectedBody: currentStudent.profile.selectedBody,
        selectedShirt: currentStudent.profile.selectedShirt,
        selectedHat: currentStudent.profile.selectedHat,
      });
    }
  }, [currentStudent]);

  const filteredAspects = useMemo(() => {
    if (!currentStudent?.profile?.ownedAspects) return [];

    return currentStudent.profile.ownedAspects.filter((aspect) => {
      const matchesSearch = aspect.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        selectedFilter === "ALL" || aspect.type === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [currentStudent?.profile?.ownedAspects, searchTerm, selectedFilter]);

  const handleAspectClick = (aspect: BodyPart) => {
    const newPreviewState = { ...previewState };

    switch (aspect.type) {
      case "CUERPO":
        newPreviewState.selectedBody = aspect;
        break;
      case "REMERA":
        newPreviewState.selectedShirt = aspect;
        break;
      case "SOMBRERO":
        newPreviewState.selectedHat = aspect;
        break;
    }

    setPreviewState(newPreviewState);

    // Check if there are changes
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

    const updates: Array<{ aspectId: number; profileId: number }> = [];

    if (
      previewState.selectedBody?.id !==
        currentStudent.profile.selectedBody?.id &&
      previewState.selectedBody
    ) {
      updates.push({
        aspectId: previewState.selectedBody.id,
        profileId: currentStudent.profile.id,
      });
    }

    if (
      previewState.selectedShirt?.id !==
        currentStudent.profile.selectedShirt?.id &&
      previewState.selectedShirt
    ) {
      updates.push({
        aspectId: previewState.selectedShirt.id,
        profileId: currentStudent.profile.id,
      });
    }

    if (
      previewState.selectedHat?.id !== currentStudent.profile.selectedHat?.id &&
      previewState.selectedHat
    ) {
      updates.push({
        aspectId: previewState.selectedHat.id,
        profileId: currentStudent.profile.id,
      });
    }

    try {
      await updateStudentProfile(updates);
      setHasChanges(false);
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.inventorySection}>
          <div className={styles.inventoryHeader}>
            <h1 className={styles.title}>Avatar</h1>

            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Buscar aspectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterContainer}>
              {(["ALL", "CUERPO", "REMERA", "SOMBRERO"] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`${styles.filterButton} ${
                      selectedFilter === filter ? styles.filterButtonActive : ""
                    }`}
                  >
                    {filter === "ALL" ? (
                      <FaGlobe />
                    ) : filter === "CUERPO" ? (
                      <FaUser />
                    ) : filter === "REMERA" ? (
                      <FaTshirt />
                    ) : filter === "SOMBRERO" ? (
                      <FaHatWizard />
                    ) : null}
                  </button>
                )
              )}
            </div>
          </div>

          <div className={styles.aspectsGrid}>
            {filteredAspects.map((aspect) => {
              const isSelected =
                (aspect.type === "CUERPO" &&
                  previewState.selectedBody?.id === aspect.id) ||
                (aspect.type === "REMERA" &&
                  previewState.selectedShirt?.id === aspect.id) ||
                (aspect.type === "SOMBRERO" &&
                  previewState.selectedHat?.id === aspect.id);

              return (
                <div
                  key={aspect.id}
                  onClick={() => handleAspectClick(aspect)}
                  className={`${styles.aspectCard} ${
                    isSelected ? styles.aspectCardSelected : ""
                  }`}
                >
                  <div className={styles.aspectImageContainer}>
                    <img
                      src={aspect.image || "/placeholder.svg"}
                      alt={aspect.name}
                      className={styles.aspectImage}
                    />
                    {isSelected && (
                      <div className={styles.selectedOverlay}>✓</div>
                    )}
                  </div>
                  <div className={styles.aspectInfo}>
                    <h3 className={styles.aspectName}>{aspect.name}</h3>
                    <p className={styles.aspectType}>{aspect.type}</p>
                    <p className={styles.aspectPrice}>${aspect.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarWrapper}>
              {previewState.selectedBody && (
                <img
                  src={previewState.selectedBody.image || "/placeholder.svg"}
                  alt="Cuerpo"
                  className={`${styles.avatarImage} ${styles.avatarBody}`}
                />
              )}

              {previewState.selectedShirt && (
                <img
                  src={previewState.selectedShirt.image || "/placeholder.svg"}
                  alt="Remera"
                  className={`${styles.avatarImage} ${styles.avatarShirt}`}
                />
              )}

              {previewState.selectedHat && (
                <img
                  src={previewState.selectedHat.image || "/placeholder.svg"}
                  alt="Sombrero"
                  className={`${styles.avatarImage} ${styles.avatarHat}`}
                />
              )}
            </div>
          </div>

          <button
            onClick={handleSaveChanges}
            disabled={hasChanges ? loading : true}
            className={styles.saveButton}
          >
            {hasChanges && loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileAvatarView;
