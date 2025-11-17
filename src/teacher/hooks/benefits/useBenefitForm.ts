import { useState, useCallback } from "react";
import type {
  CreateBenefitInterface,
  BenefitValidationErrors,
} from "../../../benefit/types/benefit.types";
import {
  validateBenefitForm,
  hasValidationErrors,
} from "../../utils/benefit.formValidation";

const INITIAL_FORM_DATA: CreateBenefitInterface = {
  name: "",
  description: "",
  cost: "",
  purchaseLimit: null,
  purchaseLimitPerStudent: null,
  subjectId: 0,
  endAt: "",
  color: "BLUE",
  category: "EVALUACION",
  icon: "EXAM",
};

export const useBenefitForm = () => {
  const [formData, setFormData] =
    useState<CreateBenefitInterface>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<BenefitValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    (field: keyof CreateBenefitInterface, value: string | boolean | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field as keyof BenefitValidationErrors]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as keyof BenefitValidationErrors];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback((field: keyof CreateBenefitInterface) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const validationErrors = validateBenefitForm(formData);
    setErrors(validationErrors);
    if (hasValidationErrors(validationErrors)) {
      const allTouched = Object.keys(validationErrors).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);
    }
    return !hasValidationErrors(validationErrors);
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setTouched({});
  }, []);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFormData,
  };
};
