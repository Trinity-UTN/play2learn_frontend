import { useCallback, useState, type ReactNode } from "react";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { SubjectContext } from "./SubjectContext";
import type { SubjectContextType } from "./SubjectContext.type";
import { SubjectService } from "../../services/subject/SubjectService";
import type {
  CreateSubjectPayload,
  SubjectResponseDto,
  UpdateSubjectPayload,
} from "../../services/subject/SubjectService";

interface SubjectProviderProps {
  children: ReactNode;
}

export const SubjectProvider: React.FC<SubjectProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<SubjectResponseDto[]>([]);
  const [paginatedSubjects, setPaginatedSubjects] =
    useState<PaginatedData<SubjectResponseDto> | null>(null);
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectResponseDto | null>(null);

  const registerSubject = async (data: CreateSubjectPayload): Promise<void> => {
    setLoading(true);
    try {
      await SubjectService.registerSubjectApi(data);
    } catch (error) {
      console.error("Error al crear la materia:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateSubject = async (data: UpdateSubjectPayload): Promise<void> => {
    setLoading(true);
    try {
      await SubjectService.updateSubjectApi(data);
    } catch (error) {
      console.error("Error al actualizar la materia:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getSubject = useCallback(async () => {
    setLoading(true);
    try {
      const response = await SubjectService.getSubjectApi();
      setSubjects(response.data.data);
    } catch (error) {
      console.error("Error al obtener las materias:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubjectByTeacher = useCallback(async () => {
    setLoading(true);
    try {
      const response = await SubjectService.getSubjectByTeacherApi();
      console.log(response.data.data);
      setSubjects(response.data.data);
    } catch (error) {
      console.error("Error al obtener las materias:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPaginatedSubject = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await SubjectService.getPaginatedSubjectApi(params);
        setPaginatedSubjects(response.data);
      } catch (error) {
        console.error("Error al obtener las materias paginadas:", error); // TODO: REMOVE_DEBUG
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteSubject = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await SubjectService.deleteSubjectApi(id);
    } catch (error) {
      console.error("Error al eliminar la materia:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: SubjectContextType = {
    loading,
    registerSubject,
    updateSubject,
    getSubject,
    getSubjectByTeacher,
    getPaginatedSubject,
    deleteSubject,
    subjects,
    paginatedSubjects,
    selectedSubject,
    setSelectedSubject,
  };

  return (
    <SubjectContext.Provider value={contextValue}>
      {children}
    </SubjectContext.Provider>
  );
};
