import type { StudentResponseDto as Student } from "../../admin/services/student/StudentService";

export interface CurrentStudent extends Student {}

export interface AvatarComponents {
  body: string;
  shirt: string;
  hat: string;
}
