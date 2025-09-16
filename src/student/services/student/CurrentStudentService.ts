import { StudentService } from "../../../admin/services/student/StudentService";
import type { StudentResponseDto } from "../../../admin/services/student/StudentService";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

const getCurrentStudentApi = StudentService.getStudentByIdApi;

const getCurrentStudentByTokenApi = async (): Promise<StudentResponseDto> => {
  const response = await api.get(urls.StudentByToken);
  return response.data.data;
};

const updateCurrentStudentProfileApi = async (
  aspectUpdates: Array<{ aspectId: number | null; profileId: number }>
): Promise<void> => {
  const updatePromises = aspectUpdates.map((update) =>
    api.patch(urls.ProfileEditAspect, update)
  );

  await Promise.all(updatePromises);
};

const unselectAspectApi = async (
  profileId: number,
  typeAspect: "REMERA" | "SOMBRERO"
): Promise<void> => {
  await api.patch(urls.ProfileUnselectAspect, { profileId, typeAspect });
};

export const CurrentStudentService = {
  getCurrentStudentApi,
  getCurrentStudentByTokenApi,
  updateCurrentStudentProfileApi,
  unselectAspectApi,
};
