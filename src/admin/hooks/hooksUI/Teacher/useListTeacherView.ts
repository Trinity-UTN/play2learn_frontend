import { useTeacher, type TeacherResponseDto } from "@/admin";
import { useConfirmation, usePaginationParams, useToaster } from "@/shared";
import { usePassword } from "@/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useListTeacherView = () => {
  const {
    loading,
    paginatedTeacher,
    getPaginatedTeacher,
    deleteTeacher,
    restoreTeacher,
    setSelectedTeacher,
  } = useTeacher();

  const {
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  } = usePaginationParams();

  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();
  const { restorePassword } = usePassword();
  const navigate = useNavigate();

  // --- LOAD PAGINATED TEACHERS ---
  useEffect(() => {
    getPaginatedTeacher(paginationParams);
  }, [paginationParams]);

  // --- HANDLERS ---
  const handleEdit = (teacher: TeacherResponseDto) => {
    showConfirmation({
      title: "Modificar Docente",
      message: `¿Está seguro que desea modificar el docente "${teacher.name}"?`,
      type: "warning",
      onConfirm: () => {
        setSelectedTeacher(teacher);
        navigate(`/dashboard/teachers/edit/${teacher.id}`);
      },
    });
  };

  const handleDelete = (teacher: TeacherResponseDto) => {
    showConfirmation({
      title: "Eliminar Docente",
      message: `¿Está seguro que desea eliminar el docente "${teacher.name}"?`,
      type: "danger",
      showDoubleConfirmation: true,
      onConfirm: async () => {
        await deleteTeacher(teacher.id);
        await getPaginatedTeacher(paginationParams);
        showToast({
          title: "Docente eliminado exitosamente",
          message: "El docente ha sido eliminado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  };

  const handleRestore = (teacher: TeacherResponseDto) => {
    showConfirmation({
      title: "Restaurar Docente",
      message: `¿Está seguro que desea restaurar el docente "${teacher.name}"?`,
      type: "warning",
      onConfirm: async () => {
        await restoreTeacher(teacher.id);
        await getPaginatedTeacher(paginationParams);
        showToast({
          title: "Docente restaurado exitosamente",
          message: "El docente ha sido restaurado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  };

  const handleRestorePassword = (teacher: TeacherResponseDto) => {
    showConfirmation({
      title: "Restaurar Contraseña del Docente",
      message: `¿Está seguro que desea restaurar la contraseña del docente "${teacher.name} ${teacher.lastname}"?`,
      type: "warning",
      onConfirm: async () => {
        await restorePassword("teacher", teacher.id);
      },
    });
  };

  // --- PUBLIC API DEL HOOK ---
  return {
    loading,
    paginatedTeacher,

    // pagination
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,

    // actions
    handleEdit,
    handleDelete,
    handleRestore,
    handleRestorePassword,
    navigate,
  };
};
