import type { ActividadCreadaGeneral } from "@/activity/types/ActividadCreada.type";
import type { ConfigurationActivity } from "@/activity/types/Configuration.type";

export const actividadGeneralMapper = (
    data: ActividadCreadaGeneral
): ConfigurationActivity => {
    return {
        description: data.description,
        startDate: new Date().toISOString().slice(0, 16),
        endDate: "",
        difficulty: data.difficulty,
        maxTime: data.maxTime,
        subjectId: data.subject.id,
        attempts: data.attempts,
        initialBalance: 0,
        typeReward: "",
    };
};
