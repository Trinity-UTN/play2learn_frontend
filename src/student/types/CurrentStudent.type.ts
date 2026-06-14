import type { StudentResponseDto as Student, BodyPart as BP } from "@/admin";

export interface CurrentStudent extends Student {}

export interface BodyPart extends BP {}

export interface NullAspect {
  id: -1;
  name: string;
  image: "";
  price: 0;
  type: "REMERA" | "SOMBRERO";
  available: true;
  isNull: true;
}

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

export interface LastRealizations {
  name: string;
  subject: string;
  result: string;
  reward: number;
  doneAgo: string;
}
export interface StatisticsStudentResponse {
  totalPoints: number;
  positionCourseRanking: number;
  totalActivitiesAvailable: number;
  lastRealizations: LastRealizations[];
}
