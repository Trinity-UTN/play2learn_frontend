import { useCallback, useMemo, useState, type ReactNode } from "react";
import { StudentContext } from "./StudentContext";
import type { StudentContextType } from "./StudentContext.type";
import { StudentService } from "../../services/student/StudentService";
import type {
  CreateStudentPayload,
  UpdateStudentPayload,
  StudentResponseDto,
} from "@/admin";

import {
  useHandleApiError,
  useToaster,
  withLoading,
  type GetPaginated,
  type PaginatedData,
} from "@/shared";

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<StudentResponseDto[]>([]);
  const [paginatedStudents, setPaginatedStudents] =
    useState<PaginatedData<StudentResponseDto> | null>(null);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentResponseDto | null>(null);

  const registerStudent = useCallback(
    async (data: CreateStudentPayload): Promise<void> => {
      await withLoading(async () => {
        try {
          await StudentService.registerStudentApi(data);

          showToast({
            title: "Estudiante creado exitosamente",
            message: "El estudiante ha sido creado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al crear el estudiante");
          throw error;
        }
      }, setLoading);
    },
    [withLoading, showToast, handleApiError],
  );

  const updateStudent = useCallback(
    async (data: UpdateStudentPayload): Promise<void> => {
      await withLoading(async () => {
        try {
          await StudentService.updateStudentApi(data);

          showToast({
            title: "Estudiante actualizado exitosamente",
            message: "El estudiante ha sido actualizado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al actualizar el estudiante");
          throw error;
        }
      }, setLoading);
    },
    [withLoading, showToast, handleApiError],
  );

  const deleteStudent = useCallback(
    async (id: number): Promise<void> => {
      await withLoading(async () => {
        try {
          await StudentService.deleteStudentApi(id);

          showToast({
            title: "Estudiante eliminado exitosamente",
            message: "El estudiante ha sido eliminado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al eliminar el estudiante");
          throw error;
        }
      }, setLoading);
    },
    [withLoading, showToast, handleApiError],
  );
  const restoreStudent = useCallback(
    async (id: number): Promise<void> => {
      await withLoading(async () => {
        try {
          await StudentService.restoreStudentApi(id);
          showToast({
            title: "Estudiante restaurado exitosamente",
            message: "El estudiante ha sido restaurado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al restaurar el estudiante");
          throw error;
        }
      }, setLoading);
    },
    [withLoading, showToast, handleApiError],
  );

  const getStudent = useCallback(async (): Promise<void> => {
    await withLoading(async () => {
      try {
        const response = await StudentService.getStudentApi();
        setStudents(response.data.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los estudiantes");
        throw error;
      }
    }, setLoading);
  }, [withLoading, handleApiError]);

  const getStudentById = useCallback(
    async (id: number): Promise<StudentResponseDto | undefined> => {
      return await withLoading(async () => {
        try {
          return await StudentService.getStudentByIdApi(id);
        } catch (error) {
          handleApiError(error, "Error al obtener el estudiante");
          throw error;
        }
      }, setLoading);
    },
    [withLoading, handleApiError],
  );

  const getPaginatedStudent = useCallback(
    async (params: GetPaginated): Promise<void> => {
      await withLoading(async () => {
        try {
          const response = await StudentService.getPaginatedStudentApi(params);
          setPaginatedStudents(response.data);
        } catch (error) {
          handleApiError(error, "Error al obtener los estudiantes paginados");
          throw error;
        }
      }, setLoading);
    },
    [withLoading, handleApiError],
  );
  const states = useMemo(
    () => ({
      loading,
      students,
      paginatedStudents,
      selectedStudent,
    }),
    [loading, students, paginatedStudents, selectedStudent],
  );

  const actions = useMemo(
    () => ({
      registerStudent,
      updateStudent,
      deleteStudent,
      restoreStudent,
      getStudent,
      getStudentById,
      getPaginatedStudent,
      setSelectedStudent,
    }),
    [
      registerStudent,
      updateStudent,
      deleteStudent,
      restoreStudent,
      getStudent,
      getStudentById,
      getPaginatedStudent,
    ],
  );

  const contextValue: StudentContextType = useMemo(
    () => ({
      ...states,
      ...actions,
    }),
    [states, actions],
  );

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};
