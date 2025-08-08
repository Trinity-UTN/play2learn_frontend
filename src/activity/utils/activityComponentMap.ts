import CreateAhorcado from "../views/createAhorcadoView/CreateAhorcado";
import CreateCompletarOracion from "../views/createCompletarOracionView/CreateCompletarOracion";
import CreateMemorama from "../views/createMemoramaView/CreateMemorama";
import CreateNoLudica from "../views/createNoLudicaView/CreateNoLudica";
import CreatePreguntados from "../views/createPreguntadosView/CreatePreguntados";
import CreateSequenceView from "../views/createSequenceView/CreateSequenceView";
import CreateDesafioClasificacionView from "../views/createDesafioClasificacion/CreateDesafioClasificacion";
export const activityComponentMap: Record<string, React.ComponentType> = {
  ahorcado_educativo: CreateAhorcado,
  completar_oraciones: CreateCompletarOracion,
  memorama: CreateMemorama,
  no_ludica: CreateNoLudica,
  preguntados: CreatePreguntados,
  ordenar_secuencia: CreateSequenceView,
  desafio_clasificacion: CreateDesafioClasificacionView,
};
