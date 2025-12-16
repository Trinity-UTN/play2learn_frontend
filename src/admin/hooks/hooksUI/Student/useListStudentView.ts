import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent, type StudentResponseDto } from "@/admin";
import { useConfirmation, usePaginationParams, useToaster } from "@/shared";
import { usePassword } from "@/user";

export const useListStudentView = () => {
  const {
    loading,
    paginatedStudents,
    getPaginatedStudent,
    deleteStudent,
    restoreStudent,
    setSelectedStudent,
  } = useStudent();

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

  // ============================
  //   LOAD PAGINATED STUDENTS
  // ============================
  useEffect(() => {
    const load = async () => {
      await getPaginatedStudent(paginationParams);
    };
    load();
  }, [paginationParams]);

  // ============================
  //   ACTION: EDIT
  // ============================
  const handleEdit = useCallback(
    (student: StudentResponseDto) => {
      showConfirmation({
        title: "Modificar Estudiante",
        message: `¿Está seguro que desea modificar el estudiante "${student.name} ${student.lastname}"?`,
        type: "warning",
        onConfirm: () => {
          setSelectedStudent(student);
          navigate(`/dashboard/students/edit/${student.id}`);
        },
      });
    },
    [navigate]
  );

  // ============================
  //   ACTION: DELETE
  // ============================
  const handleDelete = useCallback(
    (student: StudentResponseDto) => {
      showConfirmation({
        title: "Eliminar Estudiante",
        message: `¿Está seguro que desea eliminar el estudiante "${student.name} ${student.lastname}"?`,
        type: "danger",
        showDoubleConfirmation: true,
        onConfirm: async () => {
          await deleteStudent(student.id);
          await getPaginatedStudent(paginationParams);
          showToast({
            title: "Estudiante eliminado exitosamente",
            message: "El estudiante ha sido eliminado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        },
      });
    },
    [paginationParams]
  );

  // ============================
  //   ACTION: RESTORE
  // ============================
  const handleRestore = useCallback(
    (student: StudentResponseDto) => {
      showConfirmation({
        title: "Restaurar Estudiante",
        message: `¿Está seguro que desea restaurar el estudiante "${student.name} ${student.lastname}"?`,
        type: "warning",
        onConfirm: async () => {
          await restoreStudent(student.id);
          await getPaginatedStudent(paginationParams);
          showToast({
            title: "Estudiante restaurado exitosamente",
            message: "El estudiante ha sido restaurado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        },
      });
    },
    [paginationParams]
  );

  // ============================
  //   ACTION: RESET PASSWORD
  // ============================
  const handleRestorePassword = useCallback((student: StudentResponseDto) => {
    showConfirmation({
      title: "Restaurar Contraseña del Estudiante",
      message: `¿Está seguro que desea restaurar la contraseña del estudiante "${student.name} ${student.lastname}"?`,
      type: "warning",
      onConfirm: async () => {
        await restorePassword("student", student.id);
      },
    });
  }, []);

  return {
    loading,
    paginatedStudents,

    // pagination states/actions
    paginationParams,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,

    // student actions
    handleEdit,
    handleDelete,
    handleRestore,
    handleRestorePassword,
    navigate,
  };
};
