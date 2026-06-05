export interface ConfigurationActivity {
  description: string;
  startDate?: string;
  publishNow?: boolean;
  endDate: string;
  difficulty: string;
  maxTime: number;
  subjectId: number;
  attempts: number;
  initialBalance: number;
  typeReward: string;
}
export interface NewActivityConfiguration extends Omit<
  ConfigurationActivity,
  "maxTime"
> {}
export type ConfigurationErrors = {
  description?: string;
  startDate?: string;
  publishNow?: boolean;
  endDate?: string;
  difficulty?: string;
  maxTime?: string;
  subjectId?: string;
  attempts?: string;
  initialBalance?: string;
  typeReward?: string;
};
