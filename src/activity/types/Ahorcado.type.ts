export interface AhorcadoConfig {
  word: string;
  errorsPermited: string;
}

export interface AhorcadoInterface {
  word: string;
  errorsPermited: string;
}

export type AhorcadoErrors = {
  word?: string;
  errorsPermited?: string;
};
