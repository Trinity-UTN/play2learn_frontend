export interface ConfigurationActivity {
  description: string;
  startDate: string;
  endDate: string;
  dificulty: string;
  maxTime: number;
  subjectId: number;
  attempts: number;
  initialBalance: number;
}

export type ConfigurationErrors = {
  description?: string;
  startDate?: string;
  endDate?: string;
  dificulty?: string;
  maxTime?: string;
  subjectId?: string;
  attempts?: string;
  initialBalance?: string;
};
