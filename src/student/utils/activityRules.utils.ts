import {
  ACTIVITY_RULES,
  DEFAULT_ACTIVITY_RULES,
} from "@/student/constants/activityRules.constants";

export const getActivityRules = (activityName?: string): string[] => {
  if (!activityName) return DEFAULT_ACTIVITY_RULES;

  return ACTIVITY_RULES[activityName] ?? DEFAULT_ACTIVITY_RULES;
};
