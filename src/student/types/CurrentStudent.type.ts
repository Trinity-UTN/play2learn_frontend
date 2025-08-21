import type {
  StudentResponseDto as Student,
  BodyPart,
} from "../../admin/services/student/StudentService";

export interface CurrentStudent extends Student {}

export interface AvatarComponentsPreview {
  selectedBody: BodyPart | null;
  selectedShirt: BodyPart | null;
  selectedHat: BodyPart | null;
}

export interface AvatarComponents {
  body: string;
  shirt: string;
  hat: string;
}
