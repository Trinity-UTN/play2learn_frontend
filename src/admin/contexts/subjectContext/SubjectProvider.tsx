import { useCallback, useMemo, useState, type ReactNode } from "react";
import { SubjectContext } from "./SubjectContext";
import type { SubjectContextType } from "./SubjectContext.type";
import { SubjectService } from "../../services/subject/SubjectService";
import type {
  CreateSubjectPayload,
  SubjectResponseDto,
  UpdateSubjectPayload,
} from "@/admin";
import {
  type GetPaginated,
  type PaginatedData,
  useHandleApiError,
  useToaster,
  withLoading,
} from "@/shared";
import type { StudentAssingmentResponse } from "@/admin/types/subject.types";

interface SubjectProviderProps {
  children: ReactNode;
}

export const SubjectProvider: React.FC<SubjectProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();

  const [loading, setLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<SubjectResponseDto[]>([]);
  const [paginatedSubjects, setPaginatedSubjects] =
    useState<PaginatedData<SubjectResponseDto> | null>(null);
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectResponseDto | null>(null);

  const [studentAssingment, setStudenAssingment] = useState<
    StudentAssingmentResponse[] | null
  >(null);

  const registerSubject = useCallback(
    async (data: CreateSubjectPayload): Promise<void> => {
      await withLoading(async () => {
        try {
          await SubjectService.registerSubjectApi(data);

          showToast({
            title: "Materia creada exitosamente",
            message: "La materia ha sido creada exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al crear la materia");
        }
      }, setLoading);
    },
    [],
  );

  const updateSubject = useCallback(
    async (data: UpdateSubjectPayload): Promise<void> => {
      await withLoading(async () => {
        try {
          await SubjectService.updateSubjectApi(data);

          showToast({
            title: "Materia actualizada exitosamente",
            message: "La materia ha sido actualizada exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al actualizar la materia");
        }
      }, setLoading);
    },
    [],
  );

  const getSubject = useCallback(async () => {
    await withLoading(async () => {
      try {
        const response = await SubjectService.getSubjectApi();
        setSubjects(response.data.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las materias");
      }
    }, setLoading);
  }, []);

  const getSubjectByTeacher = useCallback(async () => {
    await withLoading(async () => {
      try {
        const response = await SubjectService.getSubjectByTeacherApi();
        setSubjects(response.data.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las materias del profesor");
      }
    }, setLoading);
  }, []);

  const getSubjectByStudent = useCallback(async () => {
    await withLoading(async () => {
      try {
        const response = await SubjectService.getSubjectByStudentApi();
        setSubjects(response.data.data);
      } catch (error) {
        handleApiError(error, "Error al obtener las materias del estudiante");
      }
    }, setLoading);
  }, []);

  const getPaginatedSubject = useCallback(
    async (params: GetPaginated): Promise<void> => {
      await withLoading(async () => {
        try {
          const response = await SubjectService.getPaginatedSubjectApi(params);
          setPaginatedSubjects(response.data);
        } catch (error) {
          handleApiError(error, "Error al obtener las materias paginadas");
        }
      }, setLoading);
    },
    [],
  );

  const deleteSubject = useCallback(async (id: number): Promise<void> => {
    await withLoading(async () => {
      try {
        await SubjectService.deleteSubjectApi(id);
      } catch (error) {
        handleApiError(error, "Error al eliminar la materia");
      }
    }, setLoading);
  }, []);

  //Get de estudiantes para asignar o desasignar en materias opcionales
  const getStudentAssingment = useCallback(async (id: number) => {
    await withLoading(async () => {
      try {
        const response = await SubjectService.getStudentAssignmentApi(id);
        setStudenAssingment(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los estudiantes");
      }
    }, setLoading);
  }, []);

  //Asignar estudiante
  const assingmentStudent = useCallback(
    async (idSubject: number, idStudent: number[]) => {
      await withLoading(async () => {
        try {
          await SubjectService.AssingmentStudent(idSubject, idStudent);
        } catch (error) {
          handleApiError(error, "Error al asignar el estudiante");
        }
      }, setLoading);
    },
    [],
  );
  //Desasignar estudiante
  const unassignStudent = useCallback(
    async (idSubject: number, idStudent: number[]) => {
      await withLoading(async () => {
        try {
          await SubjectService.UnassignStudent(idSubject, idStudent);
        } catch (error) {
          handleApiError(error, "Error al desasignar el estudiante");
        }
      }, setLoading);
    },
    [],
  );

  const restoreSubject = useCallback(
    async (id: number): Promise<void> => {
      await withLoading(async () => {
        try {
          await SubjectService.restoreSubjectApi(id);
        } catch (error) {
          handleApiError(error, "Error al restaurar la meteria");
          throw error;
        }
      }, setLoading);
    },
    [withLoading, showToast, handleApiError],
  );
  const states = {
    loading,
    subjects,
    paginatedSubjects,
    selectedSubject,
    studentAssingment,
  };

  const actions = {
    registerSubject,
    updateSubject,
    getSubject,
    getSubjectByTeacher,
    getPaginatedSubject,
    deleteSubject,
    setSelectedSubject,
    getSubjectByStudent,
    getStudentAssingment,
    assingmentStudent,
    unassignStudent,
    restoreSubject,
  };

  const contextValue: SubjectContextType = useMemo(
    () => ({ ...states, ...actions }),
    [states, actions],
  );

  return (
    <SubjectContext.Provider value={contextValue}>
      {children}
    </SubjectContext.Provider>
  );
};
