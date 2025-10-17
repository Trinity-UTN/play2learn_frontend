import { useCallback } from "react";
import { useBenefitAPI } from "../useBenefitAPI";
import type { useBenefitForm } from "./useBenefitForm";

export const useBenefitSubmit = (
  formData: ReturnType<typeof useBenefitForm>["formData"],
  validateForm: ReturnType<typeof useBenefitForm>["validateForm"],
  resetForm: ReturnType<typeof useBenefitForm>["resetForm"]
) => {
  const { registerBenefit } = useBenefitAPI();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      await registerBenefit(formData);
      resetForm();
    },
    [formData, validateForm, registerBenefit, resetForm]
  );

  return { handleSubmit };
};
