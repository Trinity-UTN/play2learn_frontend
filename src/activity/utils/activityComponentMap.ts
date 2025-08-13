import CreateAhorcado from "../views/createAhorcadoView/CreateAhorcado";
import CreateArbolDecision from "../views/createArbolDecisionView/CreateArbolDecision";
import CreateCompletarOracion from "../views/createCompletarOracionView/CreateCompletarOracion";
import CreateDesafioClasificacionView from "../views/createDesafioClasificacion/CreateDesafioClasificacion";
import CreateMemorama from "../views/createMemoramaView/CreateMemorama";
import CreateNoLudica from "../views/createNoLudicaView/CreateNoLudica";
import CreatePreguntados from "../views/createPreguntadosView/CreatePreguntados";
import CreateSequenceView from "../views/createSequenceView/CreateSequenceView";

export const activityComponentMap: Record<string, React.ComponentType> = {
  ahorcado_educativo: CreateAhorcado,
  arbol_decision: CreateArbolDecision,
  completar_oraciones: CreateCompletarOracion,
  desafio_clasificacion: CreateDesafioClasificacionView,
  memorama: CreateMemorama,
  no_ludica: CreateNoLudica,
  ordenar_secuencia: CreateSequenceView,
  preguntados: CreatePreguntados,
};
