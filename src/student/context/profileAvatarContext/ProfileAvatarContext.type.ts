import type {
  BodyPart,
  NullAspect,
  AvatarComponentsPreview,
} from "../../types/CurrentStudent.type";

// Filtros posibles (reusamos los mismos que en el componente original)
export type AvatarFilterType = "ALL" | "CUERPO" | "REMERA" | "SOMBRERO";

export interface ProfileAvatarContextType {
  // Estados principales
  previewState: AvatarComponentsPreview;
  hasChanges: boolean;
  searchTerm: string;
  selectedFilter: AvatarFilterType;
  sortBy: "name" | "type";
  filterTypes: readonly AvatarFilterType[];
  showSortFilter: boolean;
  showInfoPopup: boolean;
  selectedAspectInfo: BodyPart | null;
  filteredAspects: (BodyPart | NullAspect)[];

  // Setters
  setSearchTerm: (term: string) => void;
  setSelectedFilter: (filter: AvatarFilterType) => void;
  setSortBy: (sort: "name" | "type") => void;
  setShowSortFilter: (show: boolean) => void;
  setShowInfoPopup: (show: boolean) => void;
  setSelectedAspectInfo: (aspect: BodyPart | null) => void;

  // Funciones principales
  handleAspectClick: (aspect: BodyPart | NullAspect) => void;
  handleSaveChanges: () => Promise<void>;
  isAspectSelected: (aspect: BodyPart | NullAspect) => boolean;
}
