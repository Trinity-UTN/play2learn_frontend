export enum TipoEntrega {
  ENTREGA = "ENTREGA",
  ENLACE = "ENLACE",
  TEXTO = "TEXTO",
}

export interface NoLudicaConfig {
  excercise: string;
  tipoEntrega: TipoEntrega;
}

export interface NoLudicaInterface {
  excercise: string;
  tipoEntrega: TipoEntrega;
}

export interface TipoEntregaOption {
  value: TipoEntrega;
  label: string;
  description: string;
  icon: string;
  acceptedFormats?: string[];
  placeholder?: string;
}
