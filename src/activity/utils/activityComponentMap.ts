import CreateAhorcado from "../views/createAhorcadoView/CreateAhorcado";
import CreateCompletarOracion from "../views/createCompletarOracionView/CreateCompletarOracion";
import CreateNoLudica from "../views/createNoLudicaView/CreateNoLudica";
import CreatePreguntados from "../views/createPreguntadosView/CreatePreguntados";
import CreateSequenceView from "../views/createSequenceView/CreateSequenceView";

export const activityComponentMap: Record<string, React.ComponentType> = {
  ahorcado_educativo: CreateAhorcado,
  completar_oraciones: CreateCompletarOracion,
  no_ludica: CreateNoLudica,
  preguntados: CreatePreguntados,
  ordenar_secuencia: CreateSequenceView,
};
