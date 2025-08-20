import type {
  CurrentStudent,
  AvatarComponents,
} from "../../types/CurrentStudent.type";

export interface CurrentStudentContextType {
  // Estados principales
  loading: boolean;
  currentStudent: CurrentStudent | null;

  // Funciones Principales
  getCurrentStudent: () => Promise<void>;
  updateStudentProfile: (
    aspectUpdates: Array<{ aspectId: number | null; profileId: number }>
  ) => Promise<void>;

  // Funciones de utilidad
  setCurrentStudent: React.Dispatch<
    React.SetStateAction<CurrentStudent | null>
  >;
  getAvatarComponents: () => AvatarComponents;
}
