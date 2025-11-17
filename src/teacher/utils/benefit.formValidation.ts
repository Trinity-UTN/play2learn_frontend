import { BENEFIT_VALIDATION } from "../../benefit/constants/benefit.constants";
import type { BenefitValidationErrors } from "../../benefit/types/benefit.types";

/**
 * Valida el nombre del beneficio
 */
export const validateName = (name: string): string | undefined => {
  if (!name || name.trim() === "") {
    return "El nombre es requerido";
  }
  if (name.length > BENEFIT_VALIDATION.NAME_MAX_LENGTH) {
    return `El nombre no puede exceder ${BENEFIT_VALIDATION.NAME_MAX_LENGTH} caracteres`;
  }
  return undefined;
};

/**
 * Valida la descripción del beneficio
 */
export const validateDescription = (
  description: string
): string | undefined => {
  if (!description || description.trim() === "") {
    return "La descripción es requerida";
  }
  if (description.length > BENEFIT_VALIDATION.DESCRIPTION_MAX_LENGTH) {
    return `La descripción no puede exceder ${BENEFIT_VALIDATION.DESCRIPTION_MAX_LENGTH} caracteres`;
  }
  return undefined;
};

/**
 * Valida el costo del beneficio
 */
export const validateCost = (cost: number | string): string | undefined => {
  const numericCost = typeof cost === "string" ? Number(cost) : cost;

  if (!cost || cost === "") {
    return "El costo es requerido";
  }

  if (Number.isNaN(numericCost)) {
    return "El costo debe ser un número válido";
  }

  if (numericCost < BENEFIT_VALIDATION.MIN_COST) {
    return `El costo mínimo es ${BENEFIT_VALIDATION.MIN_COST}`;
  }

  return undefined;
};

/**
 * Valida la fecha de finalización del beneficio
 */
export const validateEndAt = (endAt: string): string | undefined => {
  if (!endAt || endAt.trim() === "") {
    return "La fecha de finalización es requerida";
  }

  const endDate = new Date(endAt);
  const now = new Date();

  if (Number.isNaN(endDate.getTime())) {
    return "La fecha de finalización no es válida";
  }

  if (endDate <= now) {
    return "La fecha de finalización debe ser futura";
  }

  return undefined;
};

/**
 * Valida la materia asociada al beneficio
 */
export const validateSubjectId = (subjectId: number): string | undefined => {
  if (!subjectId || subjectId === 0) {
    return "Debe seleccionar una materia";
  }
  return undefined;
};

/**
 * Valida el form entero de beneficio
 */
export const validateBenefitForm = (formData: {
  name: string;
  description: string;
  cost: number | string;
  endAt: string;
  subjectId: number;
  purchaseLimit: number | null;
  purchaseLimitPerStudent: number | null;
}): BenefitValidationErrors => {
  const errors: BenefitValidationErrors = {};

  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;

  const descriptionError = validateDescription(formData.description);
  if (descriptionError) errors.description = descriptionError;

  const costError = validateCost(formData.cost);
  if (costError) errors.cost = costError;

  const endAtError = validateEndAt(formData.endAt);
  if (endAtError) errors.endAt = endAtError;

  const subjectIdError = validateSubjectId(formData.subjectId);
  if (subjectIdError) errors.subjectId = subjectIdError;

  return errors;
};

/**
 * Verifica si hay errores de validación
 */
export const hasValidationErrors = (
  errors: BenefitValidationErrors
): boolean => {
  return Object.keys(errors).length > 0;
};
