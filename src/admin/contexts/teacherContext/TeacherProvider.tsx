import { useCallback, useState, type ReactNode } from "react";
import { TeacherContext } from "./TeacherContext";
import type { TeacherContextType } from "./TeacherContext.type";
import { TeacherService } from "../../services/teacher/TeacherService";
import type {
  CreateTeacherPayload,
  TeacherResponseDto,
  UpdateTeacherPayload,
} from "../../services/teacher/TeacherService";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";

interface TeacherProviderProps {
  children: ReactNode;
}

export const TeacherProvider: React.FC<TeacherProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [teacher, setTeachers] = useState<TeacherResponseDto[]>([]);
  const [selectedTeacher, setSelectedTeacher] =
    useState<TeacherResponseDto | null>(null);
  const [paginatedTeacher, setPaginatedTeacher] =
    useState<PaginatedData<TeacherResponseDto> | null>(null);

  const registerTeacher = async (data: CreateTeacherPayload): Promise<void> => {
    setLoading(true);
    try {
      await TeacherService.registerTeacherApi(data);
    } catch (error) {
      console.error("Error al crear el docente:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTeacher = async (data: UpdateTeacherPayload): Promise<void> => {
    setLoading(true);
    try {
      await TeacherService.updateTeacherApi(data);
    } catch (error) {
      console.error("Error al actualizar el docente:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTeacher = useCallback(async () => {
    setLoading(true);
    try {
      const response = await TeacherService.getTeacherApi();
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error al obtener los docentes:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeacherById = async (id: number): Promise<TeacherResponseDto> => {
    setLoading(true);
    try {
      const TeacherData = await TeacherService.getTeacherByIdApi(id);
      return TeacherData;
    } catch (error) {
      console.error("Error al obtener el docente:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPaginatedTeacher = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await TeacherService.getPaginatedTeacherApi(params);
        setPaginatedTeacher(response.data);
      } catch (error) {
        console.error("Error al obtener los docentes paginados:", error); // TODO: REMOVE_DEBUG
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteTeacher = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await TeacherService.deleteTeacherApi(id);
    } catch (error) {
      alert(
        `El recurso Docente con id ${id} no puede ser eliminado porque tiene asociaciones con materias.`
      );
      console.error("Error al eliminar el docente:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const restoreTeacher = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await TeacherService.restoreTeacherApi(id);
    } catch (error) {
      console.error("Error al restaurar el docente:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: TeacherContextType = {
    loading,
    registerTeacher,
    updateTeacher,
    deleteTeacher,
    getPaginatedTeacher,
    getTeacher,
    getTeacherById,
    paginatedTeacher,
    teacher,
    selectedTeacher,
    setSelectedTeacher,
    restoreTeacher,
  };

  return (
    <TeacherContext.Provider value={contextValue}>
      {children}
    </TeacherContext.Provider>
  );
};
