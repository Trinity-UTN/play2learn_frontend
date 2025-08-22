import { StudentService } from "../../../admin/services/student/StudentService";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

const getCurrentStudentApi = StudentService.getStudentByIdApi;

const updateCurrentStudentProfileApi = async (
  aspectUpdates: Array<{ aspectId: number | null; profileId: number }>
): Promise<void> => {
  try {
    const updatePromises = aspectUpdates.map((update) =>
      api.patch(urls.ProfileEditAspect, update)
    );

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error al actualizar el perfil del estudiante:", error);
    throw error;
  }
};

const unselectAspectApi = async (
  profileId: number,
  typeAspect: "REMERA" | "SOMBRERO"
): Promise<void> => {
  try {
    await api.patch(urls.ProfileUnselectAspect, {
      profileId,
      typeAspect,
    });
  } catch (error) {
    console.error("Error al deseleccionar aspecto:", error);
    throw error;
  }
};

export const CurrentStudentService = {
  getCurrentStudentApi,
  updateCurrentStudentProfileApi,
  unselectAspectApi,
};
