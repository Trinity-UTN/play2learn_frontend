import { useYear, useCourse } from "@/admin";
import { useHandleApiError } from "@/shared";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useCreateCourseView = () => {
  const { years, getYear } = useYear();
  const {
    loading,
    selectedCourse,
    registerCourse,
    updateCourse,
    getCourseById,
  } = useCourse();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { handleApiError } = useHandleApiError();

  const [formData, setFormData] = useState({
    name: "",
    year_id: 0,
  });

  const isEditMode = Boolean(id);

  const resetFormData = () => {
    setFormData({
      name: "",
      year_id: 0,
    });
  };

  const loadCourseData = useCallback(async () => {
    if (!isEditMode || !id) return;

    try {
      await getCourseById(Number(id));

      setFormData({
        name: selectedCourse?.name || "",
        year_id: selectedCourse?.year.id || 0,
      });
    } catch (error) {
      handleApiError(error, "Error al cargar el curso");
      navigate("/dashboard/courses/list");
    }
  }, [id, isEditMode, getCourseById, selectedCourse, navigate, handleApiError]);

  useEffect(() => {
    loadCourseData();
    getYear();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode && id) {
      await updateCourse({
        id: Number(id),
        ...formData,
      });
      navigate("/dashboard/courses/list");
    } else {
      await registerCourse(formData);
      resetFormData();
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    navigate("/dashboard/courses/list");
  };

  return {
    loading,
    years,
    isEditMode,
    formData,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};
