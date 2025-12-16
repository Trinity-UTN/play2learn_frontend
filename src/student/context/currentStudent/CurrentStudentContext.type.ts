import type { Wallet } from "@/admin";
import type {
  CurrentStudent,
  AvatarComponents,
  StatisticsStudentResponse,
} from "../../types/CurrentStudent.type";

export interface CurrentStudentContextType {
  // Estados principales
  loading: boolean;
  currentStudent: CurrentStudent | null;
  wallet: Wallet | undefined;
  statistics: StatisticsStudentResponse | undefined;
  // Funciones Principales
  getCurrentStudent: () => Promise<void>;
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
