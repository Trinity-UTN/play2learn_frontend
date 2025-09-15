import type { Wallet } from "../../../admin/services/student/StudentService";
import type {
  CurrentStudent,
  AvatarComponents,
} from "../../types/CurrentStudent.type";

export interface CurrentStudentContextType {
  // Estados principales
  loading: boolean;
  currentStudent: CurrentStudent | null;
  wallet: Wallet | undefined;
  // Funciones Principales
  getCurrentStudent: () => Promise<void>;
  updateStudentProfile: (
    aspectUpdates: Array<{ aspectId: number | null; profileId: number }>
  ) => Promise<void>;
  unselectAspect: (
    profileId: number,
    typeAspect: "REMERA" | "SOMBRERO"
  ) => Promise<void>;

  getWalletByStudent: () => void;

  // Funciones de utilidad
  setCurrentStudent: React.Dispatch<
    React.SetStateAction<CurrentStudent | null>
  >;
  getAvatarComponents: () => AvatarComponents;
}
