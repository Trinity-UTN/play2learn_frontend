export const STORAGE_PREFIX = "p2l:";

const withPrefix = (key: string): string => `${STORAGE_PREFIX}${key}`;

export const activityDraftKey = (code: string): string =>
  withPrefix(`configuration_activity_draft_${code}`);

export const StorageKeys = {
  attemptReview: withPrefix("attempt_review_data"),
  selectedActivity: withPrefix("teacher_selected_activity"),
  selectedBenefit: withPrefix("teacher_selected_benefit"),
  currentActivityId: withPrefix("current_activity_id"),
} as const;
