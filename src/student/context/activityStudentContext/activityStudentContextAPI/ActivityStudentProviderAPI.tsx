import { useState, type ReactNode, useCallback } from "react";
import { ActivityStudentContext } from "./ActivityStudentContextAPI";
import type { ActivityStudentContextType } from "./ActivityStudentContextAPI.type";
import type {
  ActivityNotApprovedResponseInterface,
  ActivityApprovedResponseInterface,
  CurrentActivityInterface,
} from "../../../types/Activity.type";
import { ActivityStudentService } from "../../../services/activity/ActivityService";
import { useHandleApiError } from "../../../../shared/hooks/useHandleApiError";
// import type {
//   GetPaginated,
//   PaginatedData,
// } from "../../../shared/types/PaginacionType";

export const ActivityStudentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState<boolean>(false);
  const [activityNotApproved, setActivitiesNotApproved] = useState<
    ActivityNotApprovedResponseInterface[]
  >([]);
  const [activityApproved, setActivitiesApproved] = useState<
    ActivityApprovedResponseInterface[]
  >([]);
  const [currentActivity, setCurrentActivity] =
    useState<CurrentActivityInterface | null>(null);
  // useState<PaginatedData<ActivityNotApprovedResponseInterface> | null>(null);

  // const getPaginatedActivityNotApproved= useCallback(
  //   async (params: GetPaginated): Promise<void> => {
  //     setLoading(true);

  //     try {
  //       const response = await ActivityStudentService.getActivityNotApprovedApi() ;

  //       setPaginatedActivitiesNotApproved(response.data);
  //     } catch (error) {
  //       showToast({
  //           title: "Error al obtener las actividades",
  //           message: "Se produjo un problema al obtener las actividades, intente luego.",
  //           type: "error",
  //           position: "bottom-right",
  //         });
  //       throw error;
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   []
  // );

  const getActivityNotApproved = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await ActivityStudentService.getActivityNotApprovedApi();
      setActivitiesNotApproved(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las actividades");
    } finally {
      setLoading(false);
    }
  }, []);

  const getActivityApproved = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await ActivityStudentService.getActivityApprovedApi();
      setActivitiesApproved(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las actividades aprobadas");
    } finally {
      setLoading(false);
    }
  }, []);

  const getActivityById = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    try {
      const response = await ActivityStudentService.getActivityByIdApi(id);
      setCurrentActivity(response.data);
      console.log(response.data);
    } catch (error) {
      handleApiError(error, "Error al obtener la actividad");
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: ActivityStudentContextType = {
    loading,
    activityNotApproved,
    activityApproved,
    currentActivity,
    getActivityNotApproved,
    getActivityApproved,
    getActivityById,
  };

  return (
    <ActivityStudentContext.Provider value={contextValue}>
      {children}
    </ActivityStudentContext.Provider>
  );
};
