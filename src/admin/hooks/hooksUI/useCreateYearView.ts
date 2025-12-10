import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useYear } from "../useYear";
import { useHandleApiError } from "@/shared";

interface FormData {
  name: string;
}

export const useCreateYearView = () => {
  const { loading, selectedYear, registerYear, updateYear, getYearById } =
    useYear();

  const { id } = useParams<{ id: string }>();
  const { handleApiError } = useHandleApiError();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({ name: "" });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!isEditMode || !id) return;

    const loadYearData = async () => {
      try {
        if (!selectedYear) {
          const year = await getYearById(Number(id));
          setFormData({ name: year?.name || "" });
        } else {
          setFormData({ name: selectedYear.name });
        }
      } catch (error) {
        handleApiError(error, "Error al cargar el año");
        navigate("/dashboard/years/list");
      }
    };

    loadYearData();
  }, [id, isEditMode, selectedYear, getYearById]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && id) {
      await updateYear({
        id: Number(id),
        name: formData.name,
      });
      navigate("/dashboard/years/list");
      return;
    }

    await registerYear(formData);
    setFormData({ name: "" });
  };

  const handleCancel = () => {
    navigate("/dashboard/years/list");
  };

  return {
    formData,
    loading,
    isEditMode,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};
