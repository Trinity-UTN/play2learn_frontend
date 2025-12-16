import type { PaginatedData } from "@/shared";
import type { BodyPart } from "./CurrentStudent.type";

export interface BuyAspect {
  aspectId: number;
  profileId: number;
}

export interface PaginatedAspectResponseInterface {
  data: PaginatedData<BodyPart>;
  message: string;
  errors: any;
  timestamp: string;
}
