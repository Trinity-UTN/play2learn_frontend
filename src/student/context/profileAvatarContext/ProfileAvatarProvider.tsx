import { useState, useEffect, useMemo, type ReactNode } from "react";
import { ProfileAvatarContext } from "./ProfileAvatarContext";
import type { ProfileAvatarContextType } from "./ProfileAvatarContext.type";
import type {
  BodyPart,
  NullAspect,
  AvatarComponentsPreview,
} from "../../types/CurrentStudent.type";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { useToaster } from "../../../shared/hooks/useToaster";

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

const filterTypes = ["ALL", "CUERPO", "REMERA", "SOMBRERO"] as const;

export const ProfileAvatarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { currentStudent, updateStudentProfile, unselectAspect } =
    useCurrentStudent();
  const { showConfirmation } = useConfirmation();
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<(typeof filterTypes)[number]>("ALL");
  const [previewState, setPreviewState] = useState<AvatarComponentsPreview>({
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
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    currentStudent?.profile?.ownedAspects,
    searchTerm,
    selectedFilter,
    sortBy,
  ]);

  // Funciones principales
  const handleAspectClick = (aspect: BodyPart | NullAspect) => {
    const newPreview = { ...previewState };

    switch (aspect.type) {
      case "CUERPO":
        newPreview.selectedBody = aspect as BodyPart;
        break;
      case "REMERA":
        newPreview.selectedShirt = (aspect as any).isNull ? null : aspect;
        break;
      case "SOMBRERO":
        newPreview.selectedHat = (aspect as any).isNull ? null : aspect;
        break;
    }

    setPreviewState(newPreview);

    const hasBodyChange =
      newPreview.selectedBody?.id !== currentStudent?.profile?.selectedBody?.id;
    const hasShirtChange =
      newPreview.selectedShirt?.id !==
      currentStudent?.profile?.selectedShirt?.id;
    const hasHatChange =
      newPreview.selectedHat?.id !== currentStudent?.profile?.selectedHat?.id;

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
      handleApiError(error, "Error al guardar cambios en el avatar");
    }
  };

  const handleSave = () => {
    showConfirmation({
      title: "Guardar cambios",
      message: "¿Está seguro que desea guardar los cambios?",
      type: "info",
      onConfirm: () => {
        handleSaveChanges();
        showToast({
          title: "Avatar cambiado",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  };

  const isAspectSelected = (aspect: BodyPart | NullAspect): boolean => {
    if ((aspect as any).isNull) {
      return aspect.type === "REMERA"
        ? previewState.selectedShirt === null
        : previewState.selectedHat === null;
    }

    return (
      (aspect.type === "CUERPO" &&
        previewState.selectedBody?.id === aspect.id) ||
      (aspect.type === "REMERA" &&
        previewState.selectedShirt?.id === aspect.id) ||
      (aspect.type === "SOMBRERO" && previewState.selectedHat?.id === aspect.id)
    );
  };

  const contextValue: ProfileAvatarContextType = {
    // Estados
    previewState,
    hasChanges,
    searchTerm,
    selectedFilter,
    sortBy,
    filterTypes,
    filteredAspects,
    showSortFilter,
    showInfoPopup,
    selectedAspectInfo,

    // Setters
    setSearchTerm,
    setSelectedFilter,
    setSortBy,
    setShowSortFilter,
    setShowInfoPopup,
    setSelectedAspectInfo,

    // Funciones principales
    handleAspectClick,
    handleSave,
    isAspectSelected,
  };

  return (
    <ProfileAvatarContext.Provider value={contextValue}>
      {children}
    </ProfileAvatarContext.Provider>
  );
};
