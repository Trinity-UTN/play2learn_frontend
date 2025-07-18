import api from "../../../shared/utils/api";
import { urls } from "../urls";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { buildCleanPaginatedParams } from "../../../shared/utils/apiUtils";


export interface CreateTeacherPayload {
  name: string;
  lastname: string;
  dni: string;
  email: string;
}

export interface UpdateTeacherPayload {
  id:number
  name: string;
  lastname: string;
  dni: string;
  email: string;
}

// Despues ver si esta interface es comun en otros response y sacarla de aca
interface User {
  id: number;
  email:string;
}
export interface TeacherResponseDto {
  id: number;
  name: string;
  lastname:string;
  dni:string;
  user:User;  
  active:boolean
}

export interface PaginatedTeacherResponse {
  data: PaginatedData<TeacherResponseDto>;
  message: string;
  errors: any;
  timestamp: string;
}



const registerTeacherApi = async (
  data: CreateTeacherPayload
): Promise<void> => {
  try {
    await api.post(urls.Teacher, data);
  } catch (error) {
    console.error("Error al crear el docente:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const updateTeacherApi = async (data: UpdateTeacherPayload): Promise<void> => {
  try {
    await api.put(`${urls.Teacher}/${data.id}`, data);
  } catch (error) {
    console.error("Error al actualizar el docente:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getTeacherApi = async () => {
  try {
    const response = await api.get(urls.Teacher);
    return response;
  } catch (error) {
    console.error("Error al obtener los docentes:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};
const getTeacherByIdApi = async (id: number): Promise<TeacherResponseDto> => {
  try {
    const response = await api.get(`${urls.Teacher}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el docente (por id):", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const getPaginatedTeacherApi = async (
  params: GetPaginated
): Promise<PaginatedTeacherResponse> => {
  try {
    const cleanParams = buildCleanPaginatedParams(params);

    const response = await api.get(urls.TeacherPaginated, {
      params: cleanParams,
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener docentes paginados:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

const deleteTeacherApi = async (id: number): Promise<void> => {
  try {
    
    await api.delete(`${urls.Teacher}/${id}`);
  } catch (error) {
    console.error("Error al eliminar el docente:", error); // TODO: REMOVE_DEBUG
    throw error;
  }
};

export const TeacherService = {
  registerTeacherApi,
  updateTeacherApi,
  deleteTeacherApi,
  getTeacherApi,
  getPaginatedTeacherApi,
  getTeacherByIdApi
};
