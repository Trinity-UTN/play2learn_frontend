import type {
  CurrentStudent,
  UpdateProfilePayload,
} from "../../types/CurrentStudent.type";

export interface CurrentStudentContextType {
  // Estados principales
  loading: boolean;
  currentStudent: CurrentStudent | null;

  // Funciones Principales
  getCurrentStudent: () => Promise<void>;
  updateStudentProfile: (profileData: UpdateProfilePayload) => Promise<void>;

  // Funciones de utilidad
  setCurrentStudent: React.Dispatch<
    React.SetStateAction<CurrentStudent | null>
  >;
}
