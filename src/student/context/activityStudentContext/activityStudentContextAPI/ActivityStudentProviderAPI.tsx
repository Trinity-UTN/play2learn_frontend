import { useState, type ReactNode, useCallback } from "react";
import { ActivityStudentContext } from "./ActivityStudentContextAPI";
import type { ActivityStudentContextType } from "./ActivityStudentContextAPI.type";
import type { ActivityNotApprovedResponseInterface } from "../../../types/Activity.type";
import { ActivityStudentService } from "../../../services/activity/ActivityService";
import { useToaster } from "../../../../shared/hooks/useToaster";
// import type {
//   GetPaginated,
//   PaginatedData,
// } from "../../../shared/types/PaginacionType";

export const ActivityStudentProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activityNotApproved, setPaginatedActivitiesNotApproved] = useState<
    ActivityNotApprovedResponseInterface[]
  >([]);
  const { showToast } = useToaster();

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
      setPaginatedActivitiesNotApproved(response.data);
    } catch (error) {
      showToast({
        title: "Error al obtener las actividades",
        message:
          "Se produjo un problema al obtener las actividades, intente luego.",
        type: "error",
        position: "bottom-right",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: ActivityStudentContextType = {
    activityNotApproved,
    getActivityNotApproved,
    loading,
  };

  return (
    <ActivityStudentContext.Provider value={contextValue}>
      {children}
    </ActivityStudentContext.Provider>
  );
};
