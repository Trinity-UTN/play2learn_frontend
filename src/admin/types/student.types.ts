import type { PaginatedData } from "@/shared";
import type { CourseResponseDto } from "./course.types";
import type { UserResponseDto } from "@/user/services/login/LoginService";

export interface CreateStudentPayload {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  course_id: number;
  emailTutor: string;
  birthdate: string;
}

export interface UpdateStudentPayload {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  course_id: number;
  emailTutor: string;
  birthdate: string;
}

// Despues ver si esta interface es comun en otros response y sacarla de aca

export interface BodyPart {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
  available: boolean;
  bought?: boolean;
}

export interface Profile {
  id: number;
  selectedBody: BodyPart | null;
  selectedShirt: BodyPart | null;
  selectedHat: BodyPart | null;
  ownedAspects: BodyPart[];
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export interface Wallet {
  id: number;
  balance: number;
  invertedBalance: number;
  totalBalance: number;
}

export interface StudentResponseDto {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  birthdate: string;
  emailTutor: string;
  user: UserResponseDto;
  course: CourseResponseDto;
  active: boolean;
  profile: Profile;
  wallet: Wallet;
}

export interface PaginatedStudentResponse {
  data: PaginatedData<StudentResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}
