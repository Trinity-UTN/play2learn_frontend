import { useYear, useCourse, useTeacher, useSubject } from "@/admin";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useCreateSubjectView = () => {
  const { years, getYear } = useYear();
  const { courses, getCourse } = useCourse();
  const { teacher, getTeacher } = useTeacher();
  const { loading, selectedSubject, registerSubject, updateSubject } =
    useSubject();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    yearId: 0,
    courseId: 0,
    teacherId: 0,
    optional: false,
  });

  const isEditMode = Boolean(id);

  // 👉 Cursos filtrados según el año elegido
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => course.year.id === formData.yearId);
  }, [courses, formData.yearId]);

  // 👉 Reset
  const resetFormData = () => {
    setFormData({
      name: "",
      yearId: 0,
      courseId: 0,
      teacherId: 0,
      optional: false,
    });
  };

  // 👉 Cargar info inicial
  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([getYear(), getCourse(), getTeacher()]);
    };
    loadInitialData();
  }, []);

  // 👉 Cargar datos si es edición
  useEffect(() => {
    if (isEditMode && selectedSubject) {
      setFormData({
        name: selectedSubject.name || "",
        yearId: selectedSubject.course?.year?.id || 0,
        courseId: selectedSubject.course?.id || 0,
        teacherId: selectedSubject.teacher?.id || 0,
        optional: selectedSubject.optional || false,
      });
    }
  }, [isEditMode, selectedSubject]);

  // 👉 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      courseId: formData.courseId,
      teacherId: formData.teacherId === 0 ? null : formData.teacherId,
      optional: formData.optional,
    };

    if (isEditMode && id) {
      await updateSubject({ id: Number(id), ...payload });
      navigate("/dashboard/subjects/list");
    } else {
      await registerSubject(payload);
      resetFormData();
    }
  };

  // 👉 Inputs
  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 👉 Cancel
  const handleCancel = () => {
    if (isEditMode) navigate("/dashboard/subjects/list");
  };

  return {
    loading,
    years,
    teacher,
    isEditMode,
    formData,
    filteredCourses,
    setFormData,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};
