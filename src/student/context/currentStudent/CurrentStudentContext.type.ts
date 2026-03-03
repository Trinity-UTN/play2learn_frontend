import type { Wallet } from "@/admin";
import type {
  CurrentStudent,
  AvatarComponents,
  StatisticsStudentResponse,
} from "../../types/CurrentStudent.type";

export interface CurrentStudentContextType {
  // Estados principales
  currentStudent: CurrentStudent | null;
  loading: boolean;
  loadingStatics: boolean;
  wallet: Wallet | undefined;
  statistics: StatisticsStudentResponse | undefined;
  // Funciones Principales
  getCurrentStudentByToken: () => Promise<void>;
  updateStudentProfile: (
    aspectUpdates: Array<{ aspectId: number | null; profileId: number }>
  ) => Promise<void>;
  unselectAspect: (
    profileId: number,
    typeAspect: "REMERA" | "SOMBRERO"
  ) => Promise<void>;

  getWalletByStudent: () => void;
  getStatisticsStudent: () => void;
  // Funciones de utilidad
  setCurrentStudent: React.Dispatch<
    React.SetStateAction<CurrentStudent | null>
  >;
  getAvatarComponents: () => AvatarComponents;
}
