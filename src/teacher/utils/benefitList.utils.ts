import {
  isBenefitUseRequested,
  getBenefitDisplayName,
} from "../../benefit/utils/benefit.utils";
import type {
  BenefitResponseInterface,
  TeacherBenefitType,
} from "../../benefit/types/benefit.types";

export type BenefitActionHandlers = {
  onDelete: (benefitId: number, name: string) => void;
  onViewPurchases: (
    benefit: BenefitResponseInterface,
    benefitId: number
  ) => void;
  onAcceptUse: (benefitId: number, name: string) => void;
};

export const getBenefitIds = (
  benefit: TeacherBenefitType
): {
  benefitId: number;
  actualBenefitId: number;
} => {
  const isUseRequest = isBenefitUseRequested(benefit);
  const benefitId = benefit.id;
  const actualBenefitId = isUseRequest ? benefit.benefitId : benefit.id;
  return { benefitId, actualBenefitId };
};

export const getBenefitName = (benefit: TeacherBenefitType): string => {
  return getBenefitDisplayName(benefit);
};

export const hasUseRequests = (benefits: TeacherBenefitType[]): boolean => {
  return benefits.some(isBenefitUseRequested);
};
