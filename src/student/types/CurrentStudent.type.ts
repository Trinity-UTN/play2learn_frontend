import type { StudentResponseDto as Student } from "../../admin/services/student/StudentService";

export interface CurrentStudent extends Student {}

export interface UpdateProfilePayload {
  selectedBody?: number | null;
  selectedShirt?: number | null;
  selectedHat?: number | null;
}
