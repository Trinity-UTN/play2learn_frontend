export interface ConfigurationActivity  {
    description: string;
    startDate: string;
    endDate: string;
    dificulty: string;
    maxTime: number;
    subjectId: number;
}

export type ConfigurationErrors = {
  description?: string;
  startDate?: string;
  endDate?: string;
  dificulty?: string;
  maxTime?: string;
  subjectId?: string;
};