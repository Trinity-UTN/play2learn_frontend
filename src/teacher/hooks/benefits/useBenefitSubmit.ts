import { useCallback } from "react";
import { useToaster } from "@/shared";
import { useBenefitAPI } from "../useBenefitAPI";
import type { useBenefitForm } from "./useBenefitForm";

export const useBenefitSubmit = (
  formData: ReturnType<typeof useBenefitForm>["formData"],
  validateForm: ReturnType<typeof useBenefitForm>["validateForm"],
  resetForm: ReturnType<typeof useBenefitForm>["resetForm"],
) => {
  const { registerBenefit, loading } = useBenefitAPI();
  const { showToast } = useToaster();
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }
      await registerBenefit(formData);
      showToast({
        title: "Beneficio creado exitosamente",
        message: "El beneficio ha sido creado exitosamente.",
        type: "success",
        position: "bottom-right",
      });
      resetForm();
    },
    [formData, validateForm, registerBenefit, resetForm],
  );

  return { handleSubmit, loading };
};
