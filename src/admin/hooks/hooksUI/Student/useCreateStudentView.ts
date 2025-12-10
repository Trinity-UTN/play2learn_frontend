import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourse, useStudent, useYear } from "@/admin";
import { useHandleApiError } from "@/shared";

export const useCreateStudentView = () => {
  const { years, getYear } = useYear();
  const { courses, getCourse } = useCourse();

  const { loading, selectedStudent, registerStudent, updateStudent } =
    useStudent();

  const { id } = useParams<{ id: string }>();
  const { handleApiError } = useHandleApiError();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    year_id: 0,
    course_id: 0,
    emailTutor: "",
    birthdate: "",
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    getYear();
    getCourse();
  }, []);

  useEffect(() => {
    if (!isEditMode || !id) return;

    const loadStudent = async () => {
      try {
        if (!selectedStudent) return;

        setFormData({
          name: selectedStudent.name || "",
          lastname: selectedStudent.lastname || "",
          dni: selectedStudent.dni || "",
          email: selectedStudent.user.email || "",
          year_id: selectedStudent.course.year.id || 0,
          course_id: selectedStudent.course.id || 0,
          emailTutor: selectedStudent.emailTutor || "",
          birthdate: selectedStudent.birthdate || "",
        });
      } catch (error) {
        handleApiError(error, "Error al cargar el estudiante");
        navigate("/dashboard/students/list");
      }
    };

    loadStudent();
  }, [selectedStudent, id, isEditMode]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => c.year.id === formData.year_id);
  }, [courses, formData.year_id]);

  const resetFormData = useCallback(() => {
    setFormData({
      name: "",
      lastname: "",
      dni: "",
      email: "",
      year_id: 0,
      course_id: 0,
      emailTutor: "",
      birthdate: "",
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const payload = {
        name: formData.name.trim(),
        lastname: formData.lastname.trim(),
        dni: formData.dni.trim(),
        email: formData.email.trim(),
        course_id: formData.course_id,
        emailTutor: formData.emailTutor.trim(),
        birthdate: formData.birthdate.trim(),
      };

      if (isEditMode && id) {
        const data = { id: Number(id), ...payload };
        await updateStudent(data);
        navigate("/dashboard/students/list");
        return;
      }

      await registerStudent(formData);
      resetFormData();
    },
    [formData, isEditMode, id]
  );

  const handleChange = useCallback((field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCancel = useCallback(() => {
    navigate("/dashboard/students/list");
  }, []);

  return {
    loading,
    years,
    courses: filteredCourses,

    formData,
    handleChange,
    handleSubmit,
    handleCancel,

    isEditMode,
    setFormData,
  };
};
