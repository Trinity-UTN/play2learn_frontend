import { useMemo } from "react";
import { FaGift } from "react-icons/fa";
import type {
  AnyBenefit,
  BenefitResponseInterface,
  BenefitTeacherState,
  BenefitVariant,
  TeacherBenefitType,
} from "../types/benefit.types";
import { getSubjectColor } from "@/shared";
import {
  getIconByValue,
  getColorByValue,
  getCategoryByValue,
  getCategoryColor,
  getPurchaseLimit,
  getPurchaseLimitPerStudent,
  isTeacherBenefit,
  isStudentBenefit,
  isFullBenefitResponse,
  hasBenefitBasicProperties,
  isBenefitUseRequested,
  isBenefitPurchase,
  isBenefitPurchasedUsed,
  getBenefitSubjectName,
  isCreateBenefit,
} from "../utils/benefit.utils";
import { shouldShowBenefitStats } from "../utils/benefit.validation";

interface UseBenefitCardDataProps {
  benefit: AnyBenefit | TeacherBenefitType;
  variant: BenefitVariant;
  isPreview: boolean;
  isPurchase?: boolean;
}

export const useBenefitCardData = ({
  benefit,
  variant,
  isPreview,
  isPurchase = false,
}: UseBenefitCardDataProps) => {
  const data = useMemo(() => {
    /**
     * CONTEXTO DE VISUALIZACIÓN:
     *
     * isPurchase={true} -> BenefitPurchaseCard (vista de canjes)
     *   - Mostrar como PURCHASE CARD (con nombre de estudiante)
     *   - Incluso si state === "USE_REQUESTED"
     *
     * isPurchase={false} -> BenefitCard (lista principal)
     *   - Si state === "USE_REQUESTED" -> Mostrar como UseRequest
     *   - Si state === "PURCHASED" o "USED" -> Mostrar como beneficio normal
     */

    // CASO 0: Beneficio USADO
    if (isBenefitPurchasedUsed(benefit)) {
      const iconComponent = getIconByValue(benefit.icon);
      const iconColor = getColorByValue(benefit.color) ?? "#94a3b8";
      const category = getCategoryByValue(benefit.category);
      const categoryColor = getCategoryColor(benefit.category);
      const subjectName = benefit.subjectName;
      const subjectColor = getSubjectColor(subjectName);

      return {
        IconComponent: iconComponent,
        iconColor,
        category,
        styleSuffix: "Student",
        purchaseLimit: null,
        purchaseLimitPerStudent: null,
        hasEndDate: false,
        showStats: false,
        benefitName: benefit.benefitName,
        benefitCost: 0,
        descriptionText: benefit.benefitDescription,
        subjectName,
        subjectColor,
        categoryColor,
        hasFullProperties: true,
        hasBasicProperties: false,
        isUseRequest: false,
        isPurchaseCard: false,
        isUsedBenefit: true,
        usedAt: benefit.usedAt,
        studentName: undefined,
        purchaseState: benefit.state,
        purchaseId: benefit.id,
      };
    }

    // CASO 1: Contexto de CANJES (isPurchase=true)
    if (
      isPurchase &&
      (isBenefitPurchase(benefit) || isBenefitUseRequested(benefit))
    ) {
      const iconComponent = getIconByValue(benefit.benefitIcon);
      const iconColor = getColorByValue(benefit.benefitColor) ?? "#94a3b8";
      const category = getCategoryByValue(benefit.benefitCategory);
      const categoryColor = getCategoryColor(benefit.benefitCategory);
      const subjectName = benefit.subjectName;
      const subjectColor = getSubjectColor(subjectName);
      const purchaseNumber = benefit.purchaseNumber;
      return {
        IconComponent: iconComponent,
        iconColor,
        category,
        styleSuffix: "Teacher",
        purchaseLimit: null,
        purchaseLimitPerStudent: null,
        hasEndDate: false,
        showStats: false,
        benefitName: benefit.benefitName,
        benefitCost: 0,
        descriptionText: `Canje #${benefit.id}`,
        subjectName,
        subjectColor,
        categoryColor,
        hasFullProperties: true,
        hasBasicProperties: false,
        isUseRequest: false,
        isPurchaseCard: true,
        isUsedBenefit: false,
        usedAt: undefined,
        studentName: benefit.studentName,
        purchaseState: benefit.state,
        purchaseId: benefit.id,
        purchaseNumber,
      };
    }

    // CASO 2: Contexto de LISTA PRINCIPAL (isPurchase=false)
    const isUseRequestInList = !isPurchase && isBenefitUseRequested(benefit);

    if (isUseRequestInList) {
      const iconComponent = getIconByValue(benefit.benefitIcon);
      const iconColor = getColorByValue(benefit.benefitColor) ?? "#94a3b8";
      const category = getCategoryByValue(benefit.benefitCategory);
      const categoryColor = getCategoryColor(benefit.benefitCategory);
      const subjectName = benefit.subjectName;
      const subjectColor = getSubjectColor(subjectName);

      return {
        IconComponent: iconComponent,
        iconColor,
        category,
        styleSuffix: "Teacher",
        purchaseLimit: null,
        purchaseLimitPerStudent: null,
        hasEndDate: false,
        showStats: false,
        benefitName: benefit.benefitName,
        benefitCost: 0,
        descriptionText: "Solicitud de uso de beneficio",
        subjectName,
        subjectColor,
        categoryColor,
        hasFullProperties: true,
        hasBasicProperties: false,
        isUseRequest: true,
        isPurchaseCard: false,
        isUsedBenefit: false,
        usedAt: undefined,
        studentName: benefit.studentName,
        purchaseState: benefit.state,
        purchaseId: benefit.id,
      };
    }

    // CASO 3: Contexto de RESPONSE BENEFICIO (con Id)
    const benefitResponse = benefit as BenefitResponseInterface;
    const id = benefitResponse.id;
    const isStandarList = id && isFullBenefitResponse(benefit);

    if (isStandarList) {
      const iconComponent = getIconByValue(benefit.icon);
      const iconColor = getColorByValue(benefit.color) ?? "#94a3b8";
      const category = getCategoryByValue(benefit.category);
      const categoryColor = getCategoryColor(benefit.category);
      const styleSuffix = variant === "student" ? "Student" : "Teacher";
      // Límites de compra
      const purchaseLimit = getPurchaseLimit(benefit);
      const purchaseLimitPerStudent = getPurchaseLimitPerStudent(benefit);
      // Flags de visualización
      const hasEndDate = isTeacherBenefit(benefit) || isStudentBenefit(benefit);
      const showStats =
        variant === "teacher" ||
        (isStudentBenefit(benefit) && shouldShowBenefitStats(benefit));
      const subjectName = getBenefitSubjectName(benefit as TeacherBenefitType);
      const subjectColor = getSubjectColor(subjectName);
      // Textos con Type Guards
      const hasBasicProperties = hasBenefitBasicProperties(benefit);
      const benefitName = hasBasicProperties
        ? benefit.name
        : isPreview
          ? "Nombre del Beneficio"
          : "";

      const benefitCost = hasBasicProperties ? benefit.cost : 0;

      const descriptionText = hasBasicProperties
        ? benefit.description
        : isPreview
          ? "Descripción del beneficio aparecerá aquí..."
          : "";
      return {
        IconComponent: iconComponent,
        iconColor,
        category,
        styleSuffix,
        purchaseLimit,
        purchaseLimitPerStudent,
        hasEndDate,
        showStats,
        benefitName,
        benefitCost,
        descriptionText,
        subjectName,
        subjectColor,
        categoryColor,
        hasFullProperties: true,
        hasBasicProperties: false,
        isUseRequest: false,
        isPurchaseCard: false,
        isUsedBenefit: false,
        usedAt: undefined,
        studentName: undefined,
        purchaseState: benefit.state as BenefitTeacherState,
        purchaseId: undefined,
      };
    }

    // CASO 4: Crear beneficio (preview sin Id)
    const hasFullProperties = isCreateBenefit(benefit);
    const hasBasicProperties = hasBenefitBasicProperties(benefit);

    const IconComponent = hasFullProperties
      ? getIconByValue(benefit.icon)
      : FaGift;
    const iconColor = hasFullProperties
      ? getColorByValue(benefit.color)
      : "#94a3b8";
    const category = hasFullProperties
      ? getCategoryByValue(benefit.category)
      : undefined;
    const styleSuffix = variant === "student" ? "Student" : "Teacher";

    // Límites de compra
    const purchaseLimit = getPurchaseLimit(benefit);
    const purchaseLimitPerStudent = getPurchaseLimitPerStudent(benefit);

    // Flags de visualización
    const hasEndDate =
      isTeacherBenefit(benefit) ||
      isStudentBenefit(benefit) ||
      ("endAt" in benefit && !!benefit.endAt);
    const showStats =
      variant === "teacher" ||
      (isStudentBenefit(benefit) && shouldShowBenefitStats(benefit));

    // Textos con Type Guards
    const benefitName = hasBasicProperties
      ? benefit.name
      : isPreview
        ? "Nombre del Beneficio"
        : "";

    const benefitCost = hasBasicProperties ? benefit.cost : 0;

    const descriptionText = hasBasicProperties
      ? benefit.description
      : isPreview
        ? "Descripción del beneficio aparecerá aquí..."
        : "";

    const subjectName = getBenefitSubjectName(benefit as TeacherBenefitType);
    const subjectColor = subjectName ? getSubjectColor(subjectName) : null;
    const categoryColor =
      hasFullProperties && benefit.category
        ? getCategoryColor(benefit.category)
        : { bg: "#f3f4f6", text: "#374151" };

    return {
      IconComponent,
      iconColor,
      category,
      styleSuffix,
      purchaseLimit,
      purchaseLimitPerStudent,
      hasEndDate,
      showStats,
      benefitName,
      benefitCost,
      descriptionText,
      subjectName,
      subjectColor,
      categoryColor,
      hasFullProperties,
      hasBasicProperties,
      isUseRequest: false,
      isPurchaseCard: false,
      isUsedBenefit: false,
      usedAt: undefined,
      studentName: undefined,
      purchaseState: undefined,
      purchaseId: undefined,
    };
  }, [benefit, variant, isPreview, isPurchase]);

  return data;
};
