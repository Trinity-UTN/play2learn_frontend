import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTeacher } from "@/admin";
import { useHandleApiError } from "@/shared";

export const useCreateTeacherView = () => {
  const { loading, selectedTeacher, registerTeacher, updateTeacher } =
    useTeacher();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { handleApiError } = useHandleApiError();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    const loadTeacherData = async () => {
      if (!isEditMode || !id) return;

      try {
        setFormData({
          name: selectedTeacher?.name || "",
          lastname: selectedTeacher?.lastname || "",
          dni: selectedTeacher?.dni || "",
          email: selectedTeacher?.user.email || "",
        });
      } catch (error) {
        handleApiError(error, "Error al cargar el docente");
        navigate("/dashboard/teachers/list");
      }
    };

    loadTeacherData();
  }, [id, isEditMode, selectedTeacher, navigate, handleApiError]);

  const resetFormData = () => {
    setFormData({
      name: "",
      lastname: "",
      dni: "",
      email: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && id) {
      const teacherId = Number(id);
      const payload = { id: teacherId, ...formData };

      await updateTeacher(payload);
      navigate("/dashboard/teachers/list");
      return;
    }

    await registerTeacher(formData);
    resetFormData();
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/dashboard/teachers/list");
  };

  return {
    loading,
    formData,
    isEditMode,

    handleSubmit,
    handleChange,
    handleCancel,
  };
};
