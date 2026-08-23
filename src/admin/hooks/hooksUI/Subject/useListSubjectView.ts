import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type SubjectResponseDto, useSubject } from "@/admin";
import { useConfirmation, useToaster, usePaginationParams } from "@/shared";

export const useListSubjectView = () => {
  const {
    loading,
    paginatedSubjects,
    setSelectedSubject,
    getPaginatedSubject,
    deleteSubject,
    restoreSubject,
  } = useSubject();

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

  useEffect(() => {
    const loadPaginatedSubjects = async () => {
      await getPaginatedSubject(paginationParams);
    };
    loadPaginatedSubjects();
  }, [paginationParams]);

  const handleEdit = (subject: SubjectResponseDto) => {
    showConfirmation({
      title: "Modificar Materia",
      message: `¿Está seguro que desea modificar la materia "${subject.name}"?`,
      type: "warning",
      onConfirm: () => {
        setSelectedSubject(subject);
        navigate(`/dashboard/subjects/edit/${subject.id}`);
      },
    });
  };

  const handleDelete = (subject: SubjectResponseDto) => {
    showConfirmation({
      title: "Eliminar Materia",
      message: `¿Está seguro que desea eliminar la materia "${subject.name}"?`,
      type: "danger",
      showDoubleConfirmation: true,
      onConfirm: async () => {
        await deleteSubject(subject.id);
        await getPaginatedSubject(paginationParams);

        showToast({
          title: "Materia eliminada exitosamente",
          message: "La materia ha sido eliminada exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  };

  // ============================
  //   ACTION: RESTORE
  // ============================
  const handleRestore = useCallback(
    (subject: SubjectResponseDto) => {
      showConfirmation({
        title: "Restaurar Materia",
        message: `¿Está seguro que desea restaurar la materia "${subject.name}"?`,
        type: "warning",
        onConfirm: async () => {
          await restoreSubject(subject.id);
          await getPaginatedSubject(paginationParams);
          showToast({
            title: "Materia restaurada exitosamente",
            message: "La meteria ha sido restaurada exitosamente",
            type: "success",
            position: "bottom-right",
          });
        },
      });
    },
    [paginationParams],
  );
  return {
    // states
    loading,
    paginatedSubjects,

    // pagination
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,

    // actions
    handleEdit,
    handleDelete,
    navigate,
    handleRestore,
  };
};
