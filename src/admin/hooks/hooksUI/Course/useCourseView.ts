import { useCourse, type CourseResponseDto } from "@/admin";
import { useConfirmation, usePaginationParams, useToaster } from "@/shared";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCourseView = () => {
  const {
    loading,
    paginatedCourse,
    getPaginatedCourse,
    deleteCourse,
    setSelectedCourse,
  } = useCourse();

  const {
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  } = usePaginationParams();

  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  const loadPaginated = useCallback(async () => {
    await getPaginatedCourse(paginationParams);
  }, [paginationParams]);

  useEffect(() => {
    loadPaginated();
  }, [loadPaginated]);

  const handleEdit = (course: CourseResponseDto) => {
    showConfirmation({
      title: "Modificar Curso",
      message: `¿Está seguro que desea modificar el curso "${course.name}"?`,
      type: "warning",
      onConfirm: () => {
        setSelectedCourse(course);
        navigate(`/dashboard/courses/edit/${course.id}`);
      },
    });
  };
  const handleDelete = (course: CourseResponseDto) => {
    showConfirmation({
      title: "Eliminar Curso",
      message: `¿Está seguro que desea eliminar el curso "${course.name}"?`,
      type: "danger",
      showDoubleConfirmation: true,
      onConfirm: async () => {
        await deleteCourse(course.id);
        await loadPaginated();

        showToast({
          title: "Curso eliminado exitosamente",
          message: "El curso ha sido eliminado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  };
  return {
    loading,
    paginatedCourse,

    // paginación
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    navigate,

    // acciones
    handleEdit,
    handleDelete,
  };
};
