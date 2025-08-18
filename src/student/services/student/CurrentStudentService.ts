import { StudentService } from "../../../admin/services/student/StudentService";
import type { UpdateProfilePayload } from "../../types/CurrentStudent.type";
import api from "../../../shared/utils/api";
import { urls } from "../../../admin/services/urls";

const getCurrentStudentApi = StudentService.getStudentByIdApi;

const updateCurrentStudentProfileApi = async (
  studentId: number,
  profileData: UpdateProfilePayload
): Promise<void> => {
  try {
    await api.put(`${urls.Students}/${studentId}/profile`, profileData);
  } catch (error) {
    console.error("Error al actualizar el perfil del estudiante:", error);
    throw error;
  }
};

export const CurrentStudentService = {
  getCurrentStudentApi,
  updateCurrentStudentProfileApi,
};
