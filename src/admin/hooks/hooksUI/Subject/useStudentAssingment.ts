import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSubject } from "../../useSubject";
import { useCallback, useEffect } from "react";
import type {
  StudentAssingmentResponse,
  SubjectResponseDto,
} from "@/admin/types/subject.types";
import { useConfirmation, useToaster } from "@/shared";

export const useStudentAssingment = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const subject: SubjectResponseDto = location.state?.subject;
  const {
    getStudentAssingment,
    studentAssingment,
    loading,
    assingmentStudent,
    unassignStudent,
  } = useSubject();

  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();

  //Get inicial de estudiantes que pueden estar en la materia
  useEffect(() => {
    if (id) {
      getStudentAssingment(Number(id));
    }
  }, [id, assingmentStudent, unassignStudent]);

  //Navegacion
  const navigate = useNavigate();

  //Acciones de asignar y desasignar
  const handleAssign = useCallback((student: StudentAssingmentResponse) => {
    showConfirmation({
      title: "Asignar Estudiante",
      message: `¿Está seguro que desea asignar al estudiante "${student.name} ${student.lastname}"?`,
      type: "danger",
      onConfirm: async () => {
        await assingmentStudent(Number(id), [student.id]);

        showToast({
          title: "Estudiante asginado exitosamente",
          message: "El estudiante ha sido asignado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  }, []);

  const handleUnassign = useCallback((student: StudentAssingmentResponse) => {
    showConfirmation({
      title: "Desasignar Estudiante",
      message: `¿Está seguro que desea desasignar al estudiante "${student.name} ${student.lastname}"?`,
      type: "danger",
      onConfirm: async () => {
        await unassignStudent(Number(id), [student.id]);

        showToast({
          title: "Estudiante desasignado exitosamente",
          message: "El estudiante ha sido desasignado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  }, []);

  return {
    studentAssingment,
    loading,
    subject,
    navigate,
    handleAssign,
    handleUnassign,
  };
};
