export type TipoEntrega = "ENTREGA" | "ENLACE" | "TEXTO";

export interface NoLudicaConfig {
  excercise: string;
  tipoEntrega: TipoEntrega;
}

export interface NoLudicaInterface {
  attempts: number;
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
