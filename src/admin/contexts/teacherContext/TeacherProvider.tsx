import { useCallback, useMemo, useState, type ReactNode } from "react";
import { TeacherContext } from "./TeacherContext";
import type { TeacherContextType } from "./TeacherContext.type";
import { TeacherService } from "../../services/teacher/TeacherService";
import type {
  CreateTeacherPayload,
  TeacherResponseDto,
  UpdateTeacherPayload,
} from "@/admin";
import {
  useHandleApiError,
  type GetPaginated,
  type PaginatedData,
  useToaster,
  withLoading,
} from "@/shared";

interface TeacherProviderProps {
  children: ReactNode;
}

export const TeacherProvider: React.FC<TeacherProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);
  const [teacher, setTeachers] = useState<TeacherResponseDto[]>([]);
  const [selectedTeacher, setSelectedTeacher] =
    useState<TeacherResponseDto | null>(null);
  const [paginatedTeacher, setPaginatedTeacher] =
    useState<PaginatedData<TeacherResponseDto> | null>(null);

  const registerTeacher = async (data: CreateTeacherPayload): Promise<void> => {
    await withLoading(async () => {
      try {
        await TeacherService.registerTeacherApi(data);

        showToast({
          title: "Docente creado exitosamente",
          message: "El docente ha sido creado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      } catch (error) {
        handleApiError(error, "Error al crear el docente");
      }
    }, setLoading);
  };

  const updateTeacher = async (data: UpdateTeacherPayload): Promise<void> => {
    await withLoading(async () => {
      try {
        await TeacherService.updateTeacherApi(data);

        showToast({
          title: "Docente actualizado exitosamente",
          message: "El docente ha sido actualizado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      } catch (error) {
        handleApiError(error, "Error al actualizar el docente");
      }
    }, setLoading);
  };

  const deleteTeacher = async (id: number): Promise<void> => {
    await withLoading(async () => {
      try {
        await TeacherService.deleteTeacherApi(id);

        showToast({
          title: "Docente eliminado exitosamente",
          message: "El docente ha sido eliminado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      } catch (error) {
        handleApiError(error, "Error al eliminar el docente");
      }
    }, setLoading);
  };

  const restoreTeacher = async (id: number): Promise<void> => {
    await withLoading(async () => {
      try {
        await TeacherService.restoreTeacherApi(id);

        showToast({
          title: "Docente restaurado exitosamente",
          message: "El docente ha sido restaurado exitosamente",
          type: "success",
          position: "bottom-right",
        });
      } catch (error) {
        handleApiError(error, "Error al restaurar el docente");
      }
    }, setLoading);
  };

  const getTeacher = useCallback(async () => {
    await withLoading(async () => {
      try {
        const response = await TeacherService.getTeacherApi();
        setTeachers(response.data.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los docentes");
      }
    }, setLoading);
  }, []);

  const getTeacherById = async (
    id: number
  ): Promise<TeacherResponseDto | undefined> => {
    return await withLoading(async () => {
      try {
        return await TeacherService.getTeacherByIdApi(id);
      } catch (error) {
        handleApiError(error, "Error al obtener el docente");
      }
    }, setLoading);
  };

  const getPaginatedTeacher = useCallback(
    async (params: GetPaginated): Promise<void> => {
      await withLoading(async () => {
        try {
          const response = await TeacherService.getPaginatedTeacherApi(params);
          setPaginatedTeacher(response.data);
        } catch (error) {
          handleApiError(error, "Error al obtener los docentes paginados");
        }
      }, setLoading);
    },
    []
  );

  const actions = useMemo(
    () => ({
      registerTeacher,
      updateTeacher,
      deleteTeacher,
      restoreTeacher,
      getTeacher,
      getTeacherById,
      getPaginatedTeacher,
      setSelectedTeacher,
    }),
    [
      registerTeacher,
      updateTeacher,
      deleteTeacher,
      restoreTeacher,
      getTeacher,
      getTeacherById,
      getPaginatedTeacher,
      setSelectedTeacher,
    ]
  );
  // Memorizamos los estados que cambian en ejecución
  const state = useMemo(
    () => ({
      loading,
      teacher,
      paginatedTeacher,
      selectedTeacher,
    }),
    [loading, teacher, paginatedTeacher, selectedTeacher]
  );
  const contextValue: TeacherContextType = useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions]
  );

  return (
    <TeacherContext.Provider value={contextValue}>
      {children}
    </TeacherContext.Provider>
  );
};
