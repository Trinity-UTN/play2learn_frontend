export interface AhorcadoInterface {
  word: string;
  errorsPermited: string;
  attempts: number;
}

export type AhorcadoErrors = {
  word?: string;
  errorsPermited?: string;
  attempts?: string;
};