import { StudentService } from "../../../admin/services/student/StudentService";
import api from "../../../shared/utils/api";
import { urls } from "../urls";

const getCurrentStudentApi = StudentService.getStudentByIdApi;

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
  await api.patch(urls.ProfileUnselectAspect, {
    profileId,
    typeAspect,
  });
};

const walletByStudentApi = async () => {
  const response = await api.get(urls.Wallet);
  return response.data;
};

export const CurrentStudentService = {
  getCurrentStudentApi,
  updateCurrentStudentProfileApi,
  unselectAspectApi,
  walletByStudentApi,
};
